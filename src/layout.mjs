// Shared layout: <head>, header, footer, and reusable blocks.
import { business as B } from './data/business.mjs';
import { categories, services } from './data/services.mjs';
import { photo, servicePhotoKey } from './data/photos.mjs';
import { icon } from './icons.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const url = (path) => B.siteUrl.replace(/\/$/, '') + path;
export const svcLink = (s) => `/services/${s.slug}/`;
export const cityLink = (c) => `/service-areas/${c.slug}/`;
export const svcPhoto = (s, w = 800, h = 560) => photo(servicePhotoKey(s), w, h);

const navCats = categories.map((c) => ({ ...c, items: services.filter((s) => s.category === c.key) }));

// ───────────── HEAD ─────────────
export function head({ title, description, path, noindex = false, schema = [], ogType = 'website' }) {
  const canonical = url(path);
  const ld = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : { '@context': 'https://schema.org', '@graph': schema.map(({ ['@context']: _, ...rest }) => rest) })}</script>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(B.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${url('/assets/img/og-image.png')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#10253A">
${B.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(B.googleSiteVerification)}">` : ''}
<link rel="icon" href="/assets/img/badge-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/badge-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Rubik:wght@600;700;800&family=Yellowtail&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
${ld}
${trackingTags()}
</head>`;
}

// Meta Pixel + Google Analytics — only output when IDs are set in business.mjs.
function trackingTags() {
  const t = B.tracking || {};
  let out = '';
  if (t.ga4Id) out += `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(t.ga4Id)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(t.ga4Id)}');</script>`;
  if (t.googleAdsId) out += `<script>window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};gtag('config','${esc(t.googleAdsId)}');</script>${t.ga4Id ? '' : `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(t.googleAdsId)}"></script>`}`;
  if (t.metaPixelId) out += `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${esc(t.metaPixelId)}');fbq('track','PageView');</script>`;
  if (t.googleAdsId && t.googleAdsLeadLabel) out += `<meta name="ads-lead" content="${esc(t.googleAdsId)}/${esc(t.googleAdsLeadLabel)}">`;
  return out;
}

// ───────────── HEADER (static — scrolls away with the page) ─────────────
export function header(active = '') {
  const is = (k) => (active === k ? ' is-active' : '');
  const drop = (label, key, items) => `
        <li class="has-drop${is(key)}">
          <button class="drop-btn" type="button" aria-expanded="false">${esc(label)}${icon('chevron', 'ico ico-xs')}</button>
          <ul class="drop">${items.map(([href, text]) => `<li><a href="${href}">${esc(text)}</a></li>`).join('')}</ul>
        </li>`;
  const svcDrops = navCats.map((c) => drop(c.name, c.key, c.items.map((s) => [svcLink(s), s.name]))).join('');
  const aboutDrop = drop('About', 'about', [
    ['/about/', 'About us'], ['/service-areas/', 'Service areas'], ['/comfort-plan/', 'Comfort Plan'],
    ['/services/', 'All services'], ['/services/emergency-hvac/', 'Urgent service'], ['/faq/', 'FAQs'], ['/contact/', 'Contact'],
  ]);
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar-in">
    <p class="topbar-promo">${icon('tag', 'ico ico-xs')}<span>Free in-home estimates on new systems</span></p>
    <ul class="topbar-links">
      <li><a href="/comfort-plan/">${icon('shield', 'ico ico-xs')}Comfort Plan</a></li>
      <li><a href="/service-areas/">${icon('pin', 'ico ico-xs')}Service Areas</a></li>
      <li class="topbar-lic">${B.licenseLabel}</li>
    </ul>
  </div>
</div>
<header class="site-header">
  <div class="wrap header-main">
    <a class="brand" href="/" aria-label="${esc(B.name)} home">
      <img src="/assets/img/logo-navy.png" alt="${esc(B.name)}" width="680" height="226">
    </a>
    <div class="header-actions">
      <a class="header-phone" href="${B.phoneHref}">
        <span class="header-phone-ico">${icon('phone')}</span>
        <span><small>Call or text</small>${B.phone}</span>
      </a>
      <a class="btn btn-book" href="/contact/">${icon('calendar', 'ico ico-sm')}Book Now</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
        <span class="nav-toggle-open">${icon('menu')}</span>
        <span class="nav-toggle-close">${icon('close')}</span>
      </button>
    </div>
  </div>
  <nav id="site-nav" class="site-nav" aria-label="Main">
    <div class="wrap">
      <ul class="nav-list">${svcDrops}${aboutDrop}
      </ul>
    </div>
  </nav>
  <div class="header-stripes" aria-hidden="true"><span></span><span></span></div>
</header>`;
}

// ───────────── DECORATION ─────────────
// Wavy section divider with the navy/orange double stripe from the logo.
export const wave = (from, to, flip = false) => `<div class="wave wave-${from}-${to}${flip ? ' wave-flip' : ''}" aria-hidden="true">
  <svg viewBox="0 0 1440 96" preserveAspectRatio="none"><path class="w-fill" d="M0 52 C 240 92 470 94 720 62 S 1200 8 1440 44 L1440 96 L0 96Z"/><path class="w-l1" d="M0 52 C 240 92 470 94 720 62 S 1200 8 1440 44"/><path class="w-l2" d="M0 38 C 240 78 470 80 720 48 S 1200 -6 1440 30"/></svg>
</div>`;
export const rule = (cls = '') => `<span class="rule ${cls}" aria-hidden="true"><span></span><span></span></span>`;

export function sectionHead({ eyebrow, h, p = '', tag = 'h2', cls = '' }) {
  return `<div class="sec-head ${cls}">
  ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
  <${tag}>${esc(h)}</${tag}>
  ${rule()}
  ${p ? `<p class="sec-lede">${esc(p)}</p>` : ''}
</div>`;
}

export const callBtn = (cls = 'btn-outline') => `<a class="btn ${cls}" href="${B.phoneHref}">${icon('phone', 'ico ico-sm')}${B.phone}</a>`;
export const bookBtn = (text = 'Book Online', href = '/contact/') => `<a class="btn btn-book" href="${href}">${icon('calendar', 'ico ico-sm')}${esc(text)}</a>`;

// ───────────── PHOTO CARD (service) ─────────────
export function serviceCard(s, { label } = {}) {
  return `<a class="svc-card" href="${svcLink(s)}">
  <span class="svc-card-img"><img src="${svcPhoto(s, 640, 440)}" alt="" loading="lazy" width="640" height="440"><span class="tint" aria-hidden="true"></span></span>
  <span class="svc-card-body"><span class="svc-card-ico">${icon(s.icon, 'ico')}</span><span class="svc-card-h">${esc(label || s.name)}</span><span class="svc-card-go">View service ${icon('arrow', 'ico ico-xs')}</span></span>
</a>`;
}

// ───────────── CTA BAND ("Need help?") ─────────────
export function ctaBand({ h = 'Honest comfort for your heating & air', p = `Call, text or book online. We’ll confirm a time that works for you — anywhere within ${B.radiusMiles} miles of Stockton.`, from = 'cream' } = {}) {
  return `${wave(from, 'navy')}
<section class="cta-band">
  <div class="wrap cta-in">
    <p class="eyebrow">Need help?</p>
    <h2>${esc(h)}</h2>
    ${rule('rule-center')}
    <p class="cta-p">${esc(p)}</p>
    <div class="btn-row center">${bookBtn()}${callBtn('btn-outline-light')}</div>
  </div>
</section>`;
}

// Netlify Forms: each form name is registered at deploy time from the HTML below.
// Submissions show up in Netlify → Forms and are emailed via Netlify's form notifications.
const netlifyAttrs = (name) => `name="${name}" action="/thank-you/" method="post" data-netlify="true" netlify-honeypot="company_website"${B.formEndpoint ? ` data-endpoint="${esc(B.formEndpoint)}"` : ''}`;
const netlifyHidden = (name) => `<input type="hidden" name="form-name" value="${name}"><input type="hidden" name="subject" value="New website lead" data-subject>`;

// ───────────── LEAD FORM (simple) ─────────────
let formCount = 0;
export function leadForm({ title = 'Request service', interest = '', cityName = '', note = '', formName = 'service-request' } = {}) {
  const id = `lf${++formCount}`;
  const opts = ['AC repair', 'Heating repair', 'New system estimate', 'Heat pump estimate', 'Tune-up / maintenance', 'Ductwork or air quality', 'Commercial HVAC', 'New construction bid', 'Something else'];
  if (interest && !opts.includes(interest)) opts.unshift(interest);
  return `
<form class="lead-form" ${netlifyAttrs(formName)} data-lead-form novalidate>
  ${netlifyHidden(formName)}
  <p class="form-title">${esc(title)}</p>
  <p class="form-sub">${note || `We’ll call you back to confirm a time.`}</p>
  <div class="field"><label for="${id}-name">Name</label><input id="${id}-name" name="name" autocomplete="name" required></div>
  <div class="field-row">
    <div class="field"><label for="${id}-phone">Phone</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required></div>
    <div class="field"><label for="${id}-zip">ZIP code</label><input id="${id}-zip" name="zip" inputmode="numeric" autocomplete="postal-code" required pattern="[0-9]{5}" maxlength="5"></div>
  </div>
  <div class="field"><label for="${id}-interest">What do you need?</label>
    <select id="${id}-interest" name="interest" required>
      ${opts.map((o) => `<option${o === interest ? ' selected' : ''}>${esc(o)}</option>`).join('')}
    </select>
  </div>
  <input type="hidden" name="city" value="${esc(cityName)}">
  <input type="hidden" name="page" data-page>
  <input type="hidden" name="utm" data-utm>
  <p class="hp" aria-hidden="true"><label>Leave this empty<input name="company_website" tabindex="-1" autocomplete="off"></label></p>
  <button class="btn btn-primary btn-block" type="submit">Request service</button>
  <p class="form-error" role="alert" hidden></p>
  <p class="form-fine">By submitting, you agree that ${esc(B.shortName)} may call or text you about your request. We never sell your information.</p>
</form>`;
}

// ───────────── QUIZ FUNNEL (multi-step qualifier) ─────────────
let quizCount = 0;
export function quiz({ steps, title = 'Get started', interest = '', company = false, sub = 'Takes about 30 seconds.', formName = 'booking' }) {
  const id = `qz${++quizCount}`;
  const total = steps.length + 2; // + ZIP + contact
  const stepHtml = steps.map((st, i) => `
    <fieldset class="qz-step" data-step="${i}"${i ? ' hidden' : ''}>
      <legend class="qz-q">${esc(st.q)}</legend>
      <div class="qz-opts${st.options.length > 4 ? ' qz-opts-grid' : ''}">
        ${st.options.map((o, j) => `<label class="qz-opt"><input type="radio" name="${esc(st.key)}" value="${esc(o.label)}" id="${id}-${i}-${j}"><span>${o.icon ? icon(o.icon, 'ico') : ''}<b>${esc(o.label)}</b></span></label>`).join('')}
      </div>
    </fieldset>`).join('');
  return `
<form class="quiz" ${netlifyAttrs(formName)} data-quiz data-total="${total}" novalidate>
  ${netlifyHidden(formName)}
  <div class="qz-top">
    <p class="qz-title">${esc(title)}</p>
    <p class="qz-sub">${esc(sub)}</p>
    <div class="qz-progress" aria-hidden="true"><span class="qz-bar"></span></div>
    <p class="qz-count" aria-live="polite">Step <span data-qz-n>1</span> of ${total}</p>
  </div>
  ${stepHtml}
  <fieldset class="qz-step" data-step="${steps.length}" hidden>
    <legend class="qz-q">What’s the ZIP code where you need service?</legend>
    <div class="field"><label for="${id}-zip" class="sr-only">ZIP code</label><input id="${id}-zip" name="zip" inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}" maxlength="5" placeholder="e.g. 95207" data-qz-required></div>
    <p class="qz-note" data-zip-note hidden></p>
    <button class="btn btn-primary btn-block" type="button" data-qz-next>Continue ${icon('arrow', 'ico ico-sm')}</button>
  </fieldset>
  <fieldset class="qz-step" data-step="${steps.length + 1}" hidden>
    <legend class="qz-q">Great — where should we reach you?</legend>
    <div class="field"><label for="${id}-name">Name</label><input id="${id}-name" name="name" autocomplete="name" data-qz-required></div>
    ${company ? `<div class="field"><label for="${id}-co">Company</label><input id="${id}-co" name="company" autocomplete="organization"></div>` : ''}
    <div class="field"><label for="${id}-phone">Phone</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" data-qz-required></div>
    <div class="field"><label for="${id}-email">Email <span class="opt">(optional)</span></label><input id="${id}-email" name="email" type="email" autocomplete="email"></div>
    <input type="hidden" name="interest" value="${esc(interest)}">
    <input type="hidden" name="page" data-page>
    <input type="hidden" name="utm" data-utm>
    <p class="hp" aria-hidden="true"><label>Leave this empty<input name="company_website" tabindex="-1" autocomplete="off"></label></p>
    <button class="btn btn-primary btn-block btn-lg" type="submit">Get my call back</button>
    <p class="form-fine">By submitting, you agree that ${esc(B.shortName)} may call or text you about your request. We never sell your information.</p>
  </fieldset>
  <p class="form-error" role="alert" hidden></p>
  <div class="qz-foot">
    <button class="qz-back" type="button" data-qz-back hidden>${icon('back', 'ico ico-xs')}Back</button>
    <a class="qz-call" href="${B.phoneHref}">${icon('phone', 'ico ico-xs')}Rather talk? ${B.phone}</a>
  </div>
</form>`;
}

// General-purpose questionnaire used on the contact page
export const generalSteps = [
  { key: 'need', q: 'What can we help with?', options: [
    { label: 'Repair', icon: 'wrench' }, { label: 'New system', icon: 'unit' }, { label: 'Tune-up', icon: 'check' },
    { label: 'Ducts or air quality', icon: 'duct' }, { label: 'Commercial', icon: 'building' }, { label: 'Something else', icon: 'dial' },
  ] },
  { key: 'system', q: 'What kind of system is it?', options: [
    { label: 'Central AC + furnace', icon: 'unit' }, { label: 'Heat pump', icon: 'cycle' }, { label: 'Ductless mini-split', icon: 'split' },
    { label: 'Package unit', icon: 'house' }, { label: 'Not sure', icon: 'dial' },
  ] },
  { key: 'timing', q: 'How soon do you need us?', options: [
    { label: 'Today — it’s urgent', icon: 'bolt' }, { label: 'In the next few days' }, { label: 'Within a few weeks' }, { label: 'Just planning ahead' },
  ] },
];

// ───────────── FAQ ─────────────
export function faqList(faqs) {
  return `<div class="faq">${faqs.map((f) => `
  <details>
    <summary><span>${esc(f.q)}</span>${icon('chevron', 'ico ico-sm')}</summary>
    <p>${esc(f.a)}</p>
  </details>`).join('')}
</div>`;
}
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

// ───────────── BREADCRUMBS ─────────────
export function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) => i === items.length - 1
    ? `<li aria-current="page">${esc(it.name)}</li>`
    : `<li><a href="${it.path}">${esc(it.name)}</a></li>`).join('')}</ol></nav>`;
}
export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: url(it.path) })),
});

// ───────────── SERVICE AREA BLOCK (Google map + city pills) ─────────────
export const mapEmbed = (q, zoom = 9) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`;
export function mapFrame(q = B.mapQuery, zoom = 9, title = `Map of the Air Climate service area around Stockton, CA`) {
  return `<div class="map-frame"><iframe src="${mapEmbed(q, zoom)}" title="${esc(title)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>`;
}
export function cityPills(cities, limit = cities.length) {
  return `<ul class="city-pills">${cities.slice(0, limit).map((c) => `<li><a href="${cityLink(c)}">${icon('pin', 'ico ico-sm')}<span>${esc(c.name)}, CA</span></a></li>`).join('')}</ul>`;
}

// ───────────── BUSINESS SCHEMA ─────────────
export function businessSchema(cityNames = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': url('/#business'),
    name: B.name,
    alternateName: B.gbpName,
    url: url('/'),
    telephone: B.phoneE164,
    logo: url('/assets/img/logo-navy.png'),
    image: url('/assets/img/og-image.png'),
    description: `Heating and air conditioning repair, installation and maintenance for homes and businesses in Stockton, CA and within ${B.radiusMiles} miles. California contractor license #${B.license}.`,
    address: { '@type': 'PostalAddress', streetAddress: B.address.street, addressLocality: B.address.city, postalCode: B.address.zip, addressRegion: B.region, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng },
    areaServed: [
      { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng }, geoRadius: String(Math.round(B.radiusMiles * 1609.34)) },
      ...cityNames.map((n) => ({ '@type': 'City', name: `${n}, CA` })),
    ],
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: `California Contractors State License Board #${B.license}` },
    knowsAbout: ['Air conditioning', 'Furnaces', 'Heat pumps', 'Ductless mini-splits', 'Ductwork', 'Indoor air quality', 'Commercial HVAC', 'New construction HVAC'],
    sameAs: Object.values(B.social).filter(Boolean),
  };
}

// ───────────── FOOTER ─────────────
export function footer(cities = [], { quoteTab = true } = {}) {
  const year = new Date().getFullYear();
  const col = (c) => `<div><p class="footer-h">${esc(c.name)}</p><ul>${c.items.slice(0, 7).map((s) => `<li><a href="${svcLink(s)}">${esc(s.name)}</a></li>`).join('')}</ul></div>`;
  const socials = Object.entries(B.social).filter(([, v]) => v);
  return `
<footer class="site-footer">
  <div class="header-stripes" aria-hidden="true"><span></span><span></span></div>
  <div class="wrap footer-top">
    <div class="footer-brand">
      <a href="/" aria-label="${esc(B.name)} home"><img src="/assets/img/logo-navy.png" alt="${esc(B.name)}" width="680" height="226" loading="lazy"></a>
      <p>Heating, cooling and indoor air for homes, businesses and builders in Stockton and ${B.radiusMiles} miles around.</p>
      <a class="footer-phone" href="${B.phoneHref}">${icon('phone', 'ico ico-sm')}${B.phone}</a>
      <address class="footer-addr">${esc(B.address.street)}<br>${esc(B.address.city)}, ${B.address.region} ${B.address.zip}</address>
      ${socials.length ? `<ul class="footer-social">${socials.map(([k, v]) => `<li><a href="${esc(v)}" rel="noopener">${esc(k)}</a></li>`).join('')}</ul>` : ''}
    </div>
    <div class="footer-cols">
      ${navCats.filter((c) => ['cooling', 'heating', 'heatpump'].includes(c.key)).map(col).join('')}
      <div><p class="footer-h">Company</p><ul>
        <li><a href="/about/">About us</a></li><li><a href="/service-areas/">Service areas</a></li><li><a href="/comfort-plan/">Comfort Plan</a></li>
        <li><a href="/services/">All services</a></li><li><a href="/faq/">FAQs</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy/">Privacy</a></li></ul></div>
    </div>
  </div>
  <div class="footer-cities wrap">
    <p class="footer-h">Serving</p>
    <p>${cities.map((c) => `<a href="${cityLink(c)}">${esc(c.name)}</a>`).join(' ')}</p>
  </div>
  <div class="footer-base">
    <div class="wrap footer-base-in">
      <p>© ${year} ${esc(B.name)}</p>
      <p>California contractor ${B.licenseLabel}</p>
    </div>
  </div>
</footer>
${quoteTab ? `<a class="quote-tab" href="/contact/">${icon('calendar', 'ico ico-sm')}<span>Get a Quote</span></a>` : ''}
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

export { B, icon, categories, services, photo };
