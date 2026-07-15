import http from 'http';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
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

const startServer = () =>
  new Promise((resolve) => {
    const server = http.createServer((request, response) =>
      handler(request, response, {
        public: distDir,
        rewrites: [{ source: '**', destination: '/index.html' }],
      })
    );
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

  const server = await startServer();
  const browser = await launchBrowser();

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 90000,
      });
      await page.waitForFunction(
        () => document.querySelector('#root')?.innerHTML.trim().length > 0,
        { timeout: 45000 }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));

      const html = await page.content();
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
  console.warn('prerender: skipped –', error.message);
  console.warn('prerender: deploy will use SPA shell only. Set SKIP_PRERENDER=1 to silence this.');
  process.exit(0);
});
