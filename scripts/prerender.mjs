import http from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';

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

const prerender = async () => {
  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('prerender: dist/index.html missing – run vite build first');
    process.exit(1);
  }

  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });
      await page.waitForFunction(
        () => document.querySelector('#root')?.innerHTML.trim().length > 0,
        { timeout: 30000 }
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
  console.error('prerender failed:', error);
  process.exit(1);
});
