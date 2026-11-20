// Static dev server for the built site in ./dist  ->  http://localhost:3000
// Usage: node serve.mjs   (run `node build.mjs` first)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  let p = path.normalize(path.join(root, clean));
  if (!p.startsWith(root)) return null;
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  else if (!path.extname(p) && fs.existsSync(p + '.html')) p += '.html';
  return fs.existsSync(p) ? p : null;
}

http.createServer((req, res) => {
  // Redirect /folder to /folder/ so relative links behave like production hosting
  const raw = req.url.split('?')[0];
  if (!raw.endsWith('/') && !path.extname(raw)) {
    const dir = path.join(root, decodeURIComponent(raw));
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) { res.writeHead(301, { Location: raw + '/' }); return res.end(); }
  }
  const file = resolve(req.url);
  if (!file) {
    const nf = path.join(root, '404.html');
    res.writeHead(404, { 'Content-Type': types['.html'] });
    return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
