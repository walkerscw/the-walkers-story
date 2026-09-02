import { readFile, mkdir, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
let html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');
const script = await readFile(new URL('script.js', root), 'utf8');

for (const name of ['portrait-stairs.jpeg', 'portrait-laughing.jpeg', 'portrait-arches.jpeg', 'ws-monogram-sage-champagne-transparent-v2.png']) {
  const bytes = await readFile(new URL(`assets/${name}`, root));
  const mime = name.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const dataUrl = `data:${mime};base64,${bytes.toString('base64')}`;
  html = html.replaceAll(`assets/${name}`, dataUrl);
}

html = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="script.js"></script>', `<script>${script}</script>`);

const worker = `const page = ${JSON.stringify(html)};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return new Response('Not found', { status: 404 });
    }
    return new Response(page, {
      headers: {
        'content-type': 'text/html; charset=UTF-8',
        'cache-control': 'public, max-age=300',
        'x-content-type-options': 'nosniff'
      }
    });
  }
};
`;

await mkdir(new URL('dist/server/', root), { recursive: true });
await writeFile(new URL('dist/server/index.js', root), worker);
console.log('Wedding preview build complete.');
