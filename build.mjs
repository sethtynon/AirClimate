// Builds the static site into ./dist
// Usage: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { business as B } from './src/data/business.mjs';
import { services, categories } from './src/data/services.mjs';
import { cities as rawCities } from './src/data/cities.mjs';
import { landingPages } from './src/data/landing.mjs';
import * as P from './src/pages.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const miles = (a, b) => {
  const r = (d) => (d * Math.PI) / 180, R = 3958.8;
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const all = rawCities.map((c) => ({ ...c, slug: `${slugify(c.name)}-ca`, distance: Math.round(miles(B.geo, c)) }));
const dropped = all.filter((c) => !c.home && miles(B.geo, c) > B.radiusMiles);
const cities = all.filter((c) => c.home || miles(B.geo, c) <= B.radiusMiles)
  .sort((a, b) => (a.home ? -1 : b.home ? 1 : a.distance - b.distance));

fs.rmSync(dist, { recursive: true, force: true });
const pages = []; // [urlPath, html, inSitemap]
const add = (p, html, sitemap = true) => pages.push([p, html, sitemap]);

add('/', P.homePage(cities));
add('/services/', P.servicesHub(cities));
categories.forEach((c) => add(P.categoryPath(c), P.categoryPage(c, cities)));
services.forEach((s) => add(`/services/${s.slug}/`, P.servicePage(s, cities)));
add('/service-areas/', P.areasHub(cities));
cities.forEach((c) => add(`/service-areas/${c.slug}/`, P.cityPage(c, cities)));
add('/about/', P.aboutPage(cities));
add('/contact/', P.contactPage(cities));
add('/comfort-plan/', P.planPage(cities));
add('/faq/', P.faqPage(cities));
add('/privacy/', P.privacyPage(cities));
add('/thank-you/', P.thanksPage(cities), false);
landingPages.forEach((lp) => add(`/lp/${lp.slug}/`, P.landingPage(lp, cities), false));

for (const [p, html] of pages) {
  const file = path.join(dist, p, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.writeFileSync(path.join(dist, '404.html'), P.notFoundPage(cities));

// static assets
fs.cpSync(path.join(root, 'src', 'static'), path.join(dist, 'assets'), { recursive: true });

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const base = B.siteUrl.replace(/\/$/, '');
const prio = (p) => (p === '/' ? '1.0' : p.split('/').length <= 3 ? '0.8' : '0.7');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((x) => x[2]).map(([p]) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod><priority>${prio(p)}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /thank-you/

Sitemap: ${base}/sitemap.xml
`);

console.log(`Built ${pages.length + 1} pages into dist/`);
console.log(`  ${services.length} service pages, ${categories.length} category pages, ${cities.length} city pages, ${landingPages.length} landing pages (noindex)`);
if (dropped.length) console.log(`  Outside ${B.radiusMiles} mi (skipped): ${dropped.map((c) => `${c.name} ${c.distance}mi`).join(', ')}`);
