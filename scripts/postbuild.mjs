import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found');
  process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log('postbuild: copied dist/index.html → dist/404.html');
