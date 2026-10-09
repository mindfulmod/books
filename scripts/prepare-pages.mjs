import { mkdirSync, copyFileSync } from 'node:fs';
// Serve the reading route as a real document as well as supporting legacy SPA links.
mkdirSync('dist/system', { recursive: true });
copyFileSync('dist/index.html', 'dist/system/index.html');
copyFileSync('dist/index.html', 'dist/404.html');
