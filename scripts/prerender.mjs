import http from 'http';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const port = 4173;

const ROUTES = [
  '/',
  '/autofolierung-berlin',
  '/vollfolierung-berlin',
  '/scheibentoenung-berlin',
  '/lackschutzfolie-berlin',
  '/fahrzeugbeschriftung-berlin',
  '/felgenfolierung-berlin',
  '/ratgeber/auto-folieren-kosten',
  '/kontakt',
  '/referenzen',
  '/impressum',
  '/datenschutz',
];

const CHROMIUM_PACK_URL =
  process.env.CHROMIUM_PACK_URL ||
  'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar';

const isCiLinux = process.platform === 'linux';

// Hosts the prerender browser may talk to. Everything else (GTM, GA4/Ads, SociableKIT,
// YouTube, EmailJS, fonts …) is blocked, so third-party scripts never inject tags into
// the saved HTML and prerender visits never show up in analytics.
const ALLOWED_REQUEST_HOSTS = new Set([`127.0.0.1:${port}`, 'files.foliensam.de']);

// Elements that third-party scripts inject at runtime. They must not end up in the
// static HTML: the inline GTM snippet in <head> loads gtm.js itself, and widgets
// re-inject their own assets in the visitor's browser.
const INJECTED_SELECTORS = [
  'script[src*="googletagmanager.com"]',
  'script[src*="google-analytics.com"]',
  'script[src*="googleadservices.com"]',
  'script[src*="doubleclick.net"]',
  'script[src*="sociablekit.com"]',
  'link[href*="SociableKIT_Widgets"]',
  'link[href*="sociablekit.com"]',
  'iframe[src*="youtube.com"]',
];

let shellHtml = '';

const startServer = () =>
  new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      const pathname = new URL(request.url, `http://127.0.0.1:${port}`).pathname;
      const isAsset = /\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith('.html');
      // Always render from the ORIGINAL shell. Previously routes were rewritten to
      // dist/index.html, which by then was the already-prerendered homepage, so injected
      // tags accumulated from page to page (duplicate gtm.js, 127.0.0.1 CSS links).
      if (!isAsset) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(shellHtml);
        return;
      }
      handler(request, response, { public: distDir });
    });
    server.listen(port, () => resolve(server));
  });

const outputPathForRoute = (route) => {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.slice(1), 'index.html');
};

const launchBrowser = async () => {
  if (isCiLinux) {
    const chromium = (await import('@sparticuz/chromium-min')).default;
    const puppeteer = (await import('puppeteer-core')).default;

    chromium.setGraphicsMode = false;

    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: chromium.headless,
    });
  }

  try {
    const puppeteer = (await import('puppeteer')).default;
    return puppeteer.launch({ headless: true });
  } catch {
    const chromium = (await import('@sparticuz/chromium-min')).default;
    const puppeteer = (await import('puppeteer-core')).default;

    chromium.setGraphicsMode = false;

    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
};

const prerender = async () => {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('prerender: skipped (SKIP_PRERENDER=1)');
    return;
  }

  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('prerender: dist/index.html missing – run vite build first');
    process.exit(1);
  }

  shellHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

  const server = await startServer();
  const browser = await launchBrowser();

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        let host = '';
        try {
          host = new URL(request.url()).host;
        } catch {
          // data: / blob: URLs
        }
        if (!host || ALLOWED_REQUEST_HOSTS.has(host)) {
          request.continue();
        } else {
          request.abort();
        }
      });
      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 90000,
      });
      await page.waitForFunction(
        () => document.querySelector('#root')?.innerHTML.trim().length > 0,
        { timeout: 45000 }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));

      await page.evaluate((selectors) => {
        document.querySelectorAll(selectors.join(',')).forEach((el) => el.remove());
      }, INJECTED_SELECTORS);

      const html = (await page.content())
        .replaceAll(`http://127.0.0.1:${port}`, '')
        .replaceAll(`http://localhost:${port}`, '');

      // The inline GTM snippet builds the gtm.js URL in JS; any <script src=".../gtm.js">
      // in the saved HTML would be a second (injected) load.
      const injectedGtm = /<script[^>]+src="[^"]*googletagmanager\.com\/gtm\.js/.test(html);
      if (/127\.0\.0\.1|localhost/.test(html) || injectedGtm) {
        const error = new Error(`${route} still contains a local URL or an injected gtm.js tag`);
        error.fatal = true;
        throw error;
      }
      const outPath = outputPathForRoute(route);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      console.log(`prerender: ${route} → ${outPath.replace(distDir, 'dist')}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
};

prerender().catch((error) => {
  if (error.fatal) {
    console.error('prerender: FAILED –', error.message);
    process.exit(1);
  }
  console.warn('prerender: skipped –', error.message);
  console.warn('prerender: deploy will use SPA shell only. Set SKIP_PRERENDER=1 to silence this.');
  process.exit(0);
});
