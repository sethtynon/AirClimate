// Page renderers. Each returns a full HTML document string.
import {
  head, header, footer, wave, rule, sectionHead, callBtn, bookBtn, serviceCard, ctaBand, leadForm, quiz, generalSteps,
  faqList, faqSchema, breadcrumbs, breadcrumbSchema, mapFrame, cityPills, businessSchema,
  esc, url, svcLink, cityLink, svcPhoto, B, icon, categories, services, photo,
} from './layout.mjs';
import { serviceBySlug } from './data/services.mjs';
import { zoneCopy } from './data/cities.mjs';
import { categoryPhoto } from './data/photos.mjs';

// lower-case the first letter for mid-sentence use, but keep acronyms like "AC"
const lc = (t) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t);
const body = (cls = '') => `<body class="${cls}">`;
const catLink = (c) => `/services/${c.key === 'heatpump' ? 'heat-pump' : c.key === 'air' ? 'air-quality' : c.key}/`;
export const categoryPath = catLink;

// ───────────── shared blocks ─────────────
function subhero({ crumbs, h1, lead, img, eyebrow = '', actions = true, extra = '' }) {
  return `<section class="subhero">
    <img class="subhero-bg" src="${img}" alt="" width="1600" height="700">
    <span class="subhero-tint" aria-hidden="true"></span>
    <div class="wrap subhero-in">
      ${breadcrumbs(crumbs)}
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h1>${esc(h1)}</h1>
      ${lead ? `<p class="subhero-lead">${esc(lead)}</p>` : ''}
      ${actions ? `<div class="btn-row">${bookBtn()}${callBtn('btn-outline-light')}</div>` : ''}
      ${extra}
    </div>
  </section>
  ${wave('navy', 'cream')}`;
}

const whyItems = [
  { h: 'Priced before we start', p: 'You approve the price after diagnosis — before any work.', img: 'techHands' },
  { h: `Licensed, ${B.licenseLabel}`, p: 'Permits pulled on every install that needs one.', img: 'techAc' },
  { h: 'Local to Stockton', p: `Home base is right here. We work within ${B.radiusMiles} miles.`, img: 'house' },
  { h: 'Clean, careful installs', p: 'Drop cloths down, old equipment hauled away.', img: 'condenser' },
];
function whyTiles() {
  return `<ul class="why-tiles">${whyItems.map((w) => `
    <li class="why-tile">
      <span class="arch"><img src="${photo(w.img, 520, 640)}" alt="" loading="lazy" width="520" height="640"><span class="tint" aria-hidden="true"></span></span>
      <span class="why-label"><b>${esc(w.h)}</b><small>${esc(w.p)}</small></span>
    </li>`).join('')}</ul>`;
}

function specialsBlock() {
  if (!B.specials?.length) return '';
  return `<section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Specials & promotions', h: 'Ways to save on heating & air', cls: 'center' })}
      <ul class="coupons">${B.specials.map((s) => `
        <li class="coupon">
          <img src="/assets/img/logo-navy.png" alt="" width="680" height="226" loading="lazy" class="coupon-logo">
          <p class="coupon-big">${esc(s.big)}</p>
          <p class="coupon-title">${esc(s.title)}</p>
          <p class="coupon-text">${esc(s.text)}</p>
        </li>`).join('')}
      </ul>
      <div class="btn-row center">${bookBtn('Claim an offer')}${callBtn()}</div>
    </div>
  </section>`;
}

function reviewsBlock() {
  if (!B.reviews?.length) return '';
  return `<section class="section section-cream">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Customer reviews', h: 'What our neighbors say', cls: 'center' })}
      <ul class="reviews">${B.reviews.map((r) => `
        <li class="review"><span class="review-stars" aria-label="5 stars">${icon('star', 'ico ico-sm').repeat(5)}</span><p>${esc(r.text)}</p><p class="review-by">${esc(r.name)}${r.city ? `, ${esc(r.city)}` : ''}</p></li>`).join('')}
      </ul>
    </div>
  </section>`;
}

function areasSection(cities, { from = 'paper', limit = 16 } = {}) {
  return `<section class="section section-${from} areas">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Areas we service', h: `Proudly serving Stockton & ${B.radiusMiles} miles around`, p: `From Galt and Elk Grove to Patterson, and from Brentwood out to the Calaveras foothills — if you’re within ${B.radiusMiles} miles of Stockton, we’ll be there.`, cls: 'center' })}
      <div class="areas-grid">
        ${mapFrame()}
        <div>
          ${cityPills(cities.slice(0, limit))}
          <div class="btn-row">${bookBtn('View all areas', '/service-areas/')}${callBtn()}</div>
        </div>
      </div>
    </div>
  </section>`;
}

const homeFaqs = [
  { q: 'What areas does Air Climate serve?', a: `We’re based in Stockton and serve homes and businesses within about ${B.radiusMiles} miles — including Lodi, Manteca, Tracy, Lathrop, Modesto, Galt, Elk Grove, Brentwood and the foothills out to Jackson and San Andreas.` },
  { q: 'Are you licensed?', a: `Yes. Air Climate Heating & Cooling is a licensed California contractor, license #${B.license}. You can verify any contractor license on the CSLB website.` },
  { q: 'Do you work on all brands?', a: 'Yes — Carrier, Trane, Lennox, Goodman, Rheem, Ruud, Bryant, American Standard, Daikin, Mitsubishi and most others.' },
  { q: 'Do you do refrigeration?', a: 'No. We’re strictly heating, ventilation and air conditioning. That focus is why we’re good at it.' },
  { q: 'Do you charge for estimates on new systems?', a: 'In-home estimates for new heating and cooling systems are free. Repair visits include a diagnostic to find the actual problem before we quote.' },
];

// ═════════════ HOME ═════════════
export function homePage(cities) {
  const schema = [businessSchema(cities.map((c) => c.name)), faqSchema(homeFaqs),
    { '@context': 'https://schema.org', '@type': 'WebSite', name: B.name, url: url('/') }];
  const catCards = categories.map((c) => {
    const first = services.find((s) => s.category === c.key);
    return `<a class="svc-card" href="${catLink(c)}">
      <span class="svc-card-img"><img src="${photo(categoryPhoto[c.key], 640, 440)}" alt="" loading="lazy" width="640" height="440"><span class="tint" aria-hidden="true"></span></span>
      <span class="svc-card-body"><span class="svc-card-ico">${icon(first?.icon || 'unit', 'ico')}</span><span class="svc-card-h">${esc(c.name)}</span><span class="svc-card-p">${esc(c.blurb)}</span><span class="svc-card-go">View service ${icon('arrow', 'ico ico-xs')}</span></span>
    </a>`;
  }).join('');
  return `${head({
    title: 'Stockton HVAC | Heating & AC Repair, Installation | Air Climate',
    description: `Air Climate Heating & Cooling: AC and furnace repair, new systems, heat pumps and ductwork for Stockton and ${B.radiusMiles} miles around. ${B.licenseLabel}. Call ${B.phone}.`,
    path: '/', schema,
  })}
${body('page-home')}
${header()}
<main id="main">
  <section class="hero">
    <div class="wrap hero-in">
      <div class="hero-copy">
        <p class="hero-chip">${icon('shield', 'ico ico-sm')}<span>Licensed California HVAC contractor <b>#${B.license}</b></span></p>
        <h1><span class="h1-small">Honest comfort for your</span> <span class="h1-big">Heating &amp; Air</span></h1>
        ${rule()}
        <p class="hero-lead">Stockton’s heating and cooling team for homes, businesses and builders — repairs, new systems and tune-ups within ${B.radiusMiles} miles.</p>
        <div class="btn-row">${bookBtn()}<a class="hero-call" href="${B.phoneHref}"><span class="hero-call-ico">${icon('phone')}</span><span>Call ${B.phone}</span></a></div>
      </div>
      <div class="hero-media">
        <span class="hero-photo"><img src="${photo('techAc', 1000, 1100)}" alt="Technician servicing an outdoor air conditioning unit" width="1000" height="1100"><span class="tint" aria-hidden="true"></span></span>
        <span class="hero-sticker" aria-hidden="true"><b>${B.radiusMiles}</b><small>mile service area</small></span>
      </div>
    </div>
  </section>
  ${wave('cream', 'navy')}

  <section class="section section-navy">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Our services', h: 'Heating & air services in Stockton, CA', p: 'Repair, replacement, maintenance and new installs. Heating, cooling and indoor air are all we do — no plumbing, no electrical, no refrigeration.', cls: 'center on-dark' })}
      <div class="svc-cards">${catCards}</div>
      <div class="btn-row center">${bookBtn('Book Now')}<a class="btn btn-outline-light" href="/services/">All ${services.length} services</a></div>
    </div>
  </section>
  ${wave('navy', 'cream')}

  <section class="section section-cream">
    <div class="wrap about-split">
      <div class="about-photo">
        <span class="framed"><img src="${photo('techHands', 900, 1000)}" alt="Technician checking refrigerant pressures on an AC unit" loading="lazy" width="900" height="1000"><span class="tint" aria-hidden="true"></span></span>
      </div>
      <div class="about-copy">
        ${sectionHead({ eyebrow: 'About us', h: 'Comfort you can count on, from people who tell you the truth' })}
        <p>Air Climate is a Stockton heating and cooling company. We’d rather fix a ten-year-old AC for a fair price than talk you into a system you don’t need — and when replacement does make sense, we’ll show you why with real numbers.</p>
        <p>From furnace repairs on a foggy January morning to a full heat pump conversion, every job gets the same thing: a real diagnosis, a price you approve before we start, and a clean job site when we leave.</p>
        <div class="btn-row">${bookBtn('About us', '/about/')}${callBtn()}</div>
      </div>
    </div>
  </section>

  <section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Why Air Climate', h: 'Why Stockton calls us', cls: 'center' })}
      ${whyTiles()}
    </div>
  </section>

  ${reviewsBlock()}

  <section class="section section-cream plan-sec">
    <div class="wrap plan-split">
      <div class="plan-card">
        <p class="plan-script">The Comfort Plan</p>
        <ul>
          <li>${icon('check', 'ico ico-sm')}Spring AC tune-up</li>
          <li>${icon('check', 'ico ico-sm')}Fall heating tune-up</li>
          <li>${icon('check', 'ico ico-sm')}Priority scheduling</li>
          <li>${icon('check', 'ico ico-sm')}Member savings on repairs</li>
        </ul>
        <a class="btn btn-primary btn-block" href="/comfort-plan/">See plan details</a>
      </div>
      <div>
        ${sectionHead({ eyebrow: 'Maintenance plan', h: 'Two tune-ups a year. Zero surprises in July.' })}
        <p>Most breakdowns we see in summer started months earlier as a weak capacitor, a clogged drain or a dirty coil. Comfort Plan members get both seasonal tune-ups scheduled for them — plus priority when something does go wrong.</p>
        <div class="btn-row">${bookBtn('Join the plan', '/comfort-plan/')}${callBtn()}</div>
      </div>
    </div>
  </section>

  ${specialsBlock()}

  ${areasSection(cities, { from: 'cream' })}

  <section class="section section-paper">
    <div class="wrap narrow">
      ${sectionHead({ eyebrow: 'FAQs', h: 'Common questions', cls: 'center' })}
      ${faqList(homeFaqs)}
      <p class="center more-link"><a class="text-link" href="/faq/">More HVAC questions ${icon('arrow', 'ico ico-xs')}</a></p>
    </div>
  </section>
</main>
${ctaBand({ from: 'paper' })}
${footer(cities)}`;
}

// ═════════════ SERVICES HUB ═════════════
export function servicesHub(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }];
  return `${head({
    title: 'HVAC Services in Stockton CA | Heating, Cooling & Ductwork | Air Climate',
    description: `Every heating and air conditioning service for homes and businesses in Stockton and ${B.radiusMiles} miles around: repair, replacement, heat pumps, mini-splits, ductwork, air quality and more.`,
    path: '/services/', schema: [breadcrumbSchema(crumbs)],
  })}
${body()}
${header()}
<main id="main">
  ${subhero({ crumbs, h1: 'Heating & air conditioning services', lead: `Repair, replacement, maintenance and new installs — for homes, businesses and new construction across Stockton and ${B.radiusMiles} miles around.`, img: photo('techAc', 1600, 700), eyebrow: 'Our services' })}
  ${categories.map((c, i) => `
  <section class="section ${i % 2 ? 'section-paper' : 'section-cream'}" id="${c.key}">
    <div class="wrap">
      <div class="cat-head"><div>${sectionHead({ eyebrow: c.name, h: `${c.name} services`, p: c.blurb })}</div><a class="text-link" href="${catLink(c)}">All ${esc(lc(c.name))} services ${icon('arrow', 'ico ico-xs')}</a></div>
      <div class="svc-cards svc-cards-4">${services.filter((s) => s.category === c.key).map((s) => serviceCard(s)).join('')}</div>
    </div>
  </section>`).join('')}
  <section class="section section-paper">
    <div class="wrap">
      <a class="urgent-strip" href="/services/emergency-hvac/">${icon('bolt')}<span><b>No heat or no AC?</b> Call ${B.phone} — urgent calls for seniors, infants and medical needs get priority.</span>${icon('arrow', 'ico ico-sm')}</a>
    </div>
  </section>
</main>
${ctaBand({ from: 'paper' })}
${footer(cities)}`;
}

// ═════════════ CATEGORY PAGE (/services/cooling/ etc.) ═════════════
const catCopy = {
  cooling: { h1: 'Air conditioning services in Stockton', title: 'AC Services Stockton CA | Repair, Install & Tune-Ups | Air Climate', lead: 'When it’s 105° in the Valley, your AC is not optional. Repair, replacement, tune-ups and whole-house fans for homes across Stockton and 40 miles out.' },
  heating: { h1: 'Heating services in Stockton', title: 'Heating Services Stockton CA | Furnace Repair & Install | Air Climate', lead: 'Foggy Valley winters and colder foothill nights call for heat you can trust. Furnace and heater repair, replacement and tune-ups.' },
  heatpump: { h1: 'Heat pump services in Stockton', title: 'Heat Pump Services Stockton CA | Repair & Installation | Air Climate', lead: 'Efficient all-electric heating and cooling in one system. Installation, repair, replacement and maintenance for every major brand.' },
  ductless: { h1: 'Ductless mini-split services', title: 'Ductless Mini-Split Services Stockton CA | Air Climate', lead: 'Heat and cool individual rooms without ductwork — perfect for additions, garages, ADUs and the room that’s never comfortable.' },
  air: { h1: 'Indoor air quality & duct services', title: 'Indoor Air Quality & Duct Services Stockton CA | Air Climate', lead: 'Cleaner air and ducts that deliver what you pay for. Filtration, duct cleaning, sealing, repair and replacement, ventilation, zoning and thermostats.' },
  build: { h1: 'Commercial & construction HVAC', title: 'Commercial HVAC & New Construction Stockton CA | Air Climate', lead: 'Rooftop units, light commercial service and maintenance, plus HVAC for new homes, ADUs, remodels and additions.' },
};
export function categoryPage(c, cities) {
  const cc = catCopy[c.key];
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: c.name, path: catLink(c) }];
  const list = services.filter((s) => s.category === c.key);
  return `${head({ title: cc.title, description: `${cc.lead.slice(0, 150)}`, path: catLink(c), schema: [breadcrumbSchema(crumbs), businessSchema([])] })}
${body()}
${header(c.key)}
<main id="main">
  ${subhero({ crumbs, h1: cc.h1, lead: cc.lead, img: photo(categoryPhoto[c.key], 1600, 700), eyebrow: c.name })}
  <section class="section section-cream">
    <div class="wrap">
      <div class="svc-cards svc-cards-3">${list.map((s) => serviceCard(s)).join('')}</div>
    </div>
  </section>
  ${areasSection(cities, { from: 'paper', limit: 12 })}
</main>
${ctaBand({ from: 'paper' })}
${footer(cities)}`;
}

// ═════════════ SERVICE DETAIL ═════════════
export function servicePage(s, cities) {
  const cat = categories.find((c) => c.key === s.category);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, ...(cat ? [{ name: cat.name, path: catLink(cat) }] : []), { name: s.name, path: svcLink(s) }];
  const related = s.related.map((r) => serviceBySlug[r]).filter(Boolean);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.metaDesc,
      provider: { '@id': url('/#business') }, areaServed: cities.map((c) => ({ '@type': 'City', name: `${c.name}, CA` })), url: url(svcLink(s)) },
    businessSchema([]), breadcrumbSchema(crumbs), faqSchema(s.faqs),
  ];
  return `${head({ title: s.metaTitle, description: s.metaDesc, path: svcLink(s), schema })}
${body()}
${header(s.category)}
<main id="main">
  ${subhero({ crumbs, h1: s.h1, lead: s.lead, img: svcPhoto(s, 1600, 700), eyebrow: cat ? cat.name : 'Urgent service' })}
  <section class="section section-cream">
    <div class="wrap content-grid">
      <article class="prose">
        <h2>${esc(s.signsTitle)}</h2>
        <ul class="checks">${s.signs.map((x) => `<li>${icon('check', 'ico ico-sm')}${esc(x)}</li>`).join('')}</ul>
        ${s.sections.map((sec) => `<h2>${esc(sec.h)}</h2><p>${esc(sec.p)}</p>`).join('')}
        <div class="includes">
          <h2>${esc(s.includesTitle)}</h2>
          <ul class="checks">${s.includes.map((x) => `<li>${icon('check', 'ico ico-sm')}${esc(x)}</li>`).join('')}</ul>
        </div>
        <h2>Questions about ${esc(lc(s.name))}</h2>
        ${faqList(s.faqs)}
      </article>
      <aside class="side" id="request">
        ${leadForm({ title: `Schedule ${lc(s.name)}`, interest: guessInterest(s) })}
        <a class="side-call" href="${B.phoneHref}">${icon('phone')}<span><small>Prefer to talk?</small>${B.phone}</span></a>
      </aside>
    </div>
  </section>
  ${related.length ? `<section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Related services', h: 'You might also need', cls: 'center' })}
      <div class="svc-cards svc-cards-4">${related.map((r) => serviceCard(r)).join('')}</div>
    </div>
  </section>` : ''}
  <section class="section section-cream section-tight">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Near you', h: `${s.name} across the Stockton area`, cls: 'center' })}
      ${cityPills(cities, 16)}
      <p class="center more-link"><a class="text-link" href="/service-areas/">All ${cities.length} service areas ${icon('arrow', 'ico ico-xs')}</a></p>
    </div>
  </section>
</main>
${ctaBand({ from: 'cream' })}
${footer(cities)}`;
}

function guessInterest(s) {
  const map = { cooling: 'AC repair', heating: 'Heating repair', heatpump: 'Heat pump estimate', ductless: 'Heat pump estimate', air: 'Ductwork or air quality', build: 'Commercial HVAC', urgent: 'AC repair' };
  if (/installation|replacement/.test(s.slug)) return 'New system estimate';
  if (/maintenance|tune-up/.test(s.slug)) return 'Tune-up / maintenance';
  if (s.slug === 'new-construction' || s.slug === 'remodels-additions') return 'New construction bid';
  return map[s.category] || 'Something else';
}

// ═════════════ SERVICE AREAS HUB ═════════════
export function areasHub(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Service areas', path: '/service-areas/' }];
  const byCounty = {};
  cities.forEach((c) => (byCounty[c.county] ||= []).push(c));
  const counties = Object.keys(byCounty);
  return `${head({
    title: `HVAC Service Areas | Stockton + ${B.radiusMiles} Miles | Air Climate Heating & Cooling`,
    description: `Air Climate provides heating and air conditioning service in Stockton and ${cities.length - 1} more cities within ${B.radiusMiles} miles, across ${counties.slice(0, -1).join(', ')} and ${counties.at(-1)} counties.`,
    path: '/service-areas/', schema: [businessSchema(cities.map((c) => c.name)), breadcrumbSchema(crumbs)],
  })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: 'Areas we service', lead: `Based in Stockton, serving homes and businesses within ${B.radiusMiles} miles — ${cities.length} cities and towns across ${counties.length} counties.`, img: photo('house', 1600, 700), eyebrow: `Stockton + ${B.radiusMiles} miles` })}
  <section class="section section-cream">
    <div class="wrap">
      ${mapFrame(B.mapQuery, 9)}
      <div class="county-grid">
        ${Object.entries(byCounty).map(([county, list]) => `
        <div class="county">
          <h2>${esc(county)} County</h2>
          <ul>${list.map((c) => `<li><a href="${cityLink(c)}">${icon('pin', 'ico ico-sm')}<span>${esc(c.name)}</span><small>${c.home ? 'Home base' : `${c.distance} mi`}</small></a></li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <p class="note center">Not sure if you’re in range? Call <a href="${B.phoneHref}">${B.phone}</a> — if you’re close to the line, we’ll let you know.</p>
    </div>
  </section>
</main>
${ctaBand({ from: 'cream' })}
${footer(cities)}`;
}

// ═════════════ CITY PAGE ═════════════
export function cityPage(c, cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Service areas', path: '/service-areas/' }, { name: `${c.name}, CA`, path: cityLink(c) }];
  const zc = zoneCopy[c.zone];
  const nearby = cities.filter((x) => x.slug !== c.slug)
    .map((x) => ({ ...x, d: Math.hypot((x.lat - c.lat) * 69, (x.lng - c.lng) * 54.6) }))
    .sort((a, b) => a.d - b.d).slice(0, 8);
  const faqs = [
    { q: `Do you offer HVAC service in ${c.name}?`, a: `Yes. ${c.home ? `${c.name} is our home base` : `${c.name} is about ${c.distance} miles from our Stockton base`}, well inside our ${B.radiusMiles}-mile service area. Call ${B.phone} to schedule.` },
    { q: `Do you install new AC and heating systems in ${c.name}?`, a: `Yes. We provide free in-home estimates for new air conditioners, furnaces, heat pumps and ductless systems in ${c.name} and handle the permit with ${c.home ? 'the city' : 'the local building department'}.` },
    { q: `What HVAC brands do you service in ${c.name}?`, a: 'All major brands, including Carrier, Trane, Lennox, Goodman, Rheem, Bryant, Daikin and Mitsubishi.' },
  ];
  const featured = ['ac-repair', 'ac-installation', 'furnace-repair', 'heat-pump-installation', 'mini-split-installation', 'ac-tune-up', 'duct-cleaning', 'commercial-hvac'].map((x) => serviceBySlug[x]).filter(Boolean);
  const title = `HVAC ${c.name} CA | AC & Heating Repair | Air Climate`;
  const desc = `Heating and air conditioning repair, replacement and maintenance in ${c.name}, CA. ${c.home ? 'Locally based in Stockton.' : `${c.distance} miles from our Stockton base.`} ${B.licenseLabel}. Call ${B.phone}.`;
  const schema = [
    { ...businessSchema([c.name]), '@id': url(`${cityLink(c)}#business`) },
    breadcrumbSchema(crumbs), faqSchema(faqs),
  ];
  return `${head({ title, description: desc, path: cityLink(c), schema })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: `Heating & air conditioning in ${c.name}, CA`, lead: `AC repair, furnace repair, new systems and tune-ups for ${c.name} homes and businesses${c.home ? ' — from our home base right here in Stockton.' : `, ${c.distance} miles from our Stockton base.`}`, img: photo(c.zone === 'foothill' ? 'cozy' : 'house', 1600, 700), eyebrow: `${c.county} County` })}
  <section class="section section-cream">
    <div class="wrap content-grid">
      <article class="prose">
        <h2>Your local HVAC team for ${esc(c.name)}</h2>
        <p>${esc(c.note)}</p>
        <p>${esc(zc.climate)}</p>
        ${mapFrame(`${c.name}, CA`, 12, `Map of ${c.name}, CA`)}
        <div class="tip"><p class="tip-h">${icon('leaf', 'ico ico-sm')}Local tip</p><p>${esc(zc.tip)}</p></div>
        <h2>Why ${esc(c.name)} calls Air Climate</h2>
        <ul class="checks">
          <li>${icon('check', 'ico ico-sm')}Licensed California contractor — ${B.licenseLabel}</li>
          <li>${icon('check', 'ico ico-sm')}Upfront pricing approved by you before work starts</li>
          <li>${icon('check', 'ico ico-sm')}Residential, commercial and new construction HVAC</li>
          <li>${icon('check', 'ico ico-sm')}Repairs on all major brands</li>
        </ul>
        <h2>${esc(c.name)} HVAC questions</h2>
        ${faqList(faqs)}
      </article>
      <aside class="side" id="request">
        ${leadForm({ title: `Request service in ${c.name}`, cityName: c.name })}
        <a class="side-call" href="${B.phoneHref}">${icon('phone')}<span><small>Prefer to talk?</small>${B.phone}</span></a>
        <div class="side-box">
          <p class="side-h">Nearby areas we serve</p>
          <ul>${nearby.map((n) => `<li><a href="${cityLink(n)}">${icon('pin', 'ico ico-sm')}${esc(n.name)}</a></li>`).join('')}</ul>
        </div>
      </aside>
    </div>
  </section>
  <section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: `Services in ${c.name}`, h: `HVAC services in ${c.name}`, cls: 'center' })}
      <div class="svc-cards svc-cards-4">${featured.map((s) => serviceCard(s)).join('')}</div>
      <p class="center more-link"><a class="text-link" href="/services/">See every service ${icon('arrow', 'ico ico-xs')}</a></p>
    </div>
  </section>
</main>
${ctaBand({ h: `Need heating or AC service in ${c.name}?`, from: 'paper' })}
${footer(cities)}`;
}

// ═════════════ ABOUT ═════════════
export function aboutPage(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }];
  return `${head({
    title: 'About Air Climate Heating & Cooling | Stockton HVAC Contractor',
    description: `Air Climate Heating & Cooling is a Stockton-based HVAC contractor (${B.licenseLabel}) serving homes, businesses and builders within ${B.radiusMiles} miles.`,
    path: '/about/', schema: [businessSchema([]), breadcrumbSchema(crumbs)],
  })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: 'About Air Climate', lead: 'A Stockton heating and cooling company built on a simple idea: tell people the truth about their system, then do the work right.', img: photo('techHands', 1600, 700), eyebrow: 'Who we are' })}
  <section class="section section-cream">
    <div class="wrap about-split">
      <div class="about-photo"><span class="framed"><img src="${photo('techAc', 900, 1000)}" alt="Air Climate technician at work" loading="lazy" width="900" height="1000"><span class="tint" aria-hidden="true"></span></span></div>
      <div class="about-copy prose">
        ${sectionHead({ eyebrow: 'HVAC is all we do', h: 'Heating, cooling and indoor air. Nothing else.' })}
        <p>Air Climate Heating & Cooling handles heating, ventilation and air conditioning for homeowners, businesses and builders across the Stockton area. We don’t do plumbing, electrical or refrigeration — keeping our focus narrow is how we stay good at what we do.</p>
        <p>That means repairs on every major brand, new air conditioners, furnaces and heat pumps sized to your home, ductwork and indoor air quality, light commercial rooftop units and HVAC for new construction and remodels.</p>
        <dl class="facts">
          <div><dt>Based in</dt><dd>Stockton, California</dd></div>
          <div><dt>Service area</dt><dd>${B.radiusMiles} miles around Stockton</dd></div>
          <div><dt>License</dt><dd>CSLB #${B.license}</dd></div>
          <div><dt>Phone</dt><dd><a href="${B.phoneHref}">${B.phone}</a></dd></div>
        </dl>
      </div>
    </div>
  </section>
  <section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'How we work', h: 'What you can expect from us', cls: 'center' })}
      ${whyTiles()}
    </div>
  </section>
</main>
${ctaBand({ from: 'paper' })}
${footer(cities)}`;
}

// ═════════════ CONTACT ═════════════
export function contactPage(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  return `${head({
    title: 'Book HVAC Service | Contact Air Climate Heating & Cooling',
    description: `Book heating or air conditioning service in Stockton and ${B.radiusMiles} miles around. Call ${B.phone} or book online in about 30 seconds.`,
    path: '/contact/', schema: [businessSchema([]), breadcrumbSchema(crumbs)],
  })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: 'Book service', lead: 'Answer a few quick questions and we’ll call you back to confirm a time. Or call — it’s the fastest way to reach us.', img: photo('condenser', 1600, 700), eyebrow: 'Contact', actions: false })}
  <section class="section section-cream">
    <div class="wrap contact-grid">
      <div class="contact-quiz">${quiz({ steps: generalSteps, title: 'Book online', interest: 'Website booking' })}</div>
      <div class="contact-info">
        <a class="big-phone" href="${B.phoneHref}">${icon('phone')}<span><small>Call or text</small>${B.phone}</span></a>
        <dl class="facts">
          <div><dt>Address</dt><dd>${esc(B.address.street)}<br>${esc(B.address.city)}, ${B.address.region} ${B.address.zip} <a class="dir-link" href="https://www.google.com/maps/dir/?api=1&amp;destination=${encodeURIComponent(B.addressLine)}" rel="noopener" target="_blank">Get directions</a></dd></div>
          <div><dt>Service area</dt><dd>Within ${B.radiusMiles} miles of Stockton — <a href="/service-areas/">see all cities</a></dd></div>
          <div><dt>License</dt><dd>${B.licenseLabel}</dd></div>
          ${B.email ? `<div><dt>Email</dt><dd><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></dd></div>` : ''}
        </dl>
        <div class="tip"><p class="tip-h">${icon('bolt', 'ico ico-sm')}If you smell gas</p><p>Leave the home and call your gas utility or 911 from outside. Call us once it’s safe.</p></div>
      </div>
    </div>
  </section>
</main>
${footer(cities, { quoteTab: false })}`;
}

// ═════════════ COMFORT PLAN ═════════════
export function planPage(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Comfort Plan', path: '/comfort-plan/' }];
  const faqs = [
    { q: 'How much does the Comfort Plan cost?', a: `Call ${B.phone} for current plan pricing for your home. Pricing depends on how many systems you have.` },
    { q: 'Can I cancel?', a: 'Yes. Ask us about the plan terms when you sign up.' },
    { q: 'Does it cover heat pumps and mini-splits?', a: 'Yes. Heat pumps and ductless systems get the same twice-yearly service.' },
  ];
  return `${head({
    title: 'Comfort Plan | HVAC Maintenance Plan Stockton CA | Air Climate',
    description: 'Two HVAC tune-ups a year, priority scheduling and member savings on repairs. The Air Climate Comfort Plan keeps your heating and AC running.',
    path: '/comfort-plan/', schema: [breadcrumbSchema(crumbs), faqSchema(faqs)],
  })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: 'The Comfort Plan', lead: 'Two tune-ups a year, priority scheduling and member savings. Set it once and stop worrying about your heating and air.', img: photo('family', 1600, 700), eyebrow: 'Maintenance plan' })}
  <section class="section section-cream">
    <div class="wrap content-grid">
      <article class="prose">
        <h2>What members get</h2>
        <ul class="perks">
          <li>${icon('snow')}<b>Spring AC tune-up</b><span>Coil cleaning, electrical tests and refrigerant check before the heat.</span></li>
          <li>${icon('flame')}<b>Fall heating tune-up</b><span>Furnace or heat pump cleaned and safety-checked before winter.</span></li>
          <li>${icon('clock')}<b>Priority scheduling</b><span>Members move to the front of the line on repair calls.</span></li>
          <li>${icon('tag')}<b>Member savings</b><span>Savings on repairs for as long as you’re a member.</span></li>
          <li>${icon('calendar')}<b>We do the remembering</b><span>We call you when it’s time — no reminders to set.</span></li>
          <li>${icon('check')}<b>Written report</b><span>A plain-English report on your system’s condition every visit.</span></li>
        </ul>
        <h2>Why regular maintenance matters</h2>
        <p>Most breakdowns we see in July started months earlier as a weak capacitor, a clogged drain or a dirty coil. Twice-yearly tune-ups catch those early, keep your system running efficiently and help it last longer. Many manufacturers also require regular maintenance to keep warranties valid.</p>
        <h2>Plan questions</h2>
        ${faqList(faqs)}
      </article>
      <aside class="side" id="request">${leadForm({ title: 'Ask about the Comfort Plan', interest: 'Tune-up / maintenance' })}</aside>
    </div>
  </section>
</main>
${ctaBand({ from: 'cream' })}
${footer(cities)}`;
}

// ═════════════ FAQ ═════════════
export function faqPage(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faq/' }];
  const all = [...homeFaqs];
  services.forEach((s) => s.faqs.forEach((f) => { if (!all.find((x) => x.q === f.q)) all.push(f); }));
  return `${head({
    title: 'HVAC Questions & Answers | Air Climate Heating & Cooling',
    description: 'Answers to common heating and air conditioning questions from Stockton-area homeowners: repair vs. replace, tune-ups, heat pumps, ductwork and more.',
    path: '/faq/', schema: [breadcrumbSchema(crumbs), faqSchema(all)],
  })}
${body()}
${header('about')}
<main id="main">
  ${subhero({ crumbs, h1: 'HVAC questions, answered', lead: `Straight answers to the questions we hear most. Don’t see yours? Call ${B.phone}.`, img: photo('thermostat', 1600, 700), eyebrow: 'FAQs' })}
  <section class="section section-cream"><div class="wrap narrow">${faqList(all)}</div></section>
</main>
${ctaBand({ from: 'cream' })}
${footer(cities)}`;
}

// ═════════════ PRIVACY / THANK YOU / 404 ═════════════
export function privacyPage(cities) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy/' }];
  return `${head({ title: 'Privacy Policy | Air Climate Heating & Cooling', description: 'How Air Climate Heating & Cooling collects and uses information submitted through this website.', path: '/privacy/' })}
${body()}
${header()}
<main id="main">
  ${subhero({ crumbs, h1: 'Privacy policy', lead: '', img: photo('house', 1600, 700), actions: false })}
  <section class="section section-cream"><div class="wrap narrow prose">
    <p>When you request service through this website, we collect the information you enter — such as your name, phone number, email, ZIP code, your answers to our booking questions and a description of your request — and use it only to respond to you and provide HVAC service.</p>
    <p>We may also record which page you submitted the form from and any advertising campaign parameters in the link you followed, so we know which ads are working.</p>
    <p>We do not sell your personal information. We may share it with service providers that help us operate (for example, scheduling or customer-management software) only as needed to serve you.</p>
    <p>To ask about or delete the information we hold about you, call ${B.phone}.</p>
  </div></section>
</main>
${footer(cities)}`;
}

export function thanksPage(cities) {
  return `${head({ title: 'Thanks — We’ll Be in Touch | Air Climate Heating & Cooling', description: 'Your service request was received.', path: '/thank-you/', noindex: true })}
${body()}
${header()}
<main id="main">
  <section class="section section-cream thanks">
    <div class="wrap narrow center">
      <span class="thanks-ico">${icon('check')}</span>
      <h1>Request received!</h1>
      ${rule('rule-center')}
      <p class="sec-lede">Thanks — we’ll call you shortly to confirm a time. If it’s urgent, call us now.</p>
      <div class="btn-row center">${callBtn('btn-primary')}<a class="btn btn-outline" href="/">Back to home</a></div>
    </div>
  </section>
</main>
${footer(cities, { quoteTab: false })}`;
}

export function notFoundPage(cities) {
  return `${head({ title: 'Page Not Found | Air Climate Heating & Cooling', description: 'The page you were looking for could not be found.', path: '/404.html', noindex: true })}
${body()}
${header()}
<main id="main">
  <section class="section section-cream thanks">
    <div class="wrap narrow center">
      <h1>That page isn’t here</h1>
      ${rule('rule-center')}
      <p class="sec-lede">It may have moved. Try one of these, or call ${B.phone}.</p>
      <div class="btn-row center"><a class="btn btn-primary" href="/services/">Browse services</a><a class="btn btn-outline" href="/">Go home</a></div>
    </div>
  </section>
</main>
${footer(cities)}`;
}

// ═════════════ LANDING PAGE (ad funnel — noindex, no nav) ═════════════
export function landingPage(lp, cities) {
  const few = cities.filter((c) => !c.home).slice(0, 12);
  const howSteps = [
    { h: 'Answer a few questions', p: 'Takes about 30 seconds. Tells us exactly what you need.', i: 'check' },
    { h: 'We call you back', p: 'A real person from our Stockton office confirms a time.', i: 'phone' },
    { h: 'Fixed and explained', p: 'You approve the price before work starts. We clean up after.', i: 'wrench' },
  ];
  return `${head({ title: `${lp.h1} | Air Climate Heating & Cooling`, description: lp.sub, path: `/lp/${lp.slug}/`, noindex: true })}
${body('page-lp')}
<header class="lp-header">
  <div class="wrap lp-header-in">
    <img src="/assets/img/logo-navy.png" alt="${esc(B.name)}" width="680" height="226" class="lp-logo">
    <a class="header-phone" href="${B.phoneHref}"><span class="header-phone-ico">${icon('phone')}</span><span><small>Call or text</small>${B.phone}</span></a>
  </div>
  <div class="header-stripes" aria-hidden="true"><span></span><span></span></div>
</header>
<main id="main">
  <section class="lp-hero">
    <img class="subhero-bg" src="${photo('techAc', 1600, 900)}" alt="" width="1600" height="900">
    <span class="subhero-tint" aria-hidden="true"></span>
    <div class="wrap lp-hero-in">
      <div class="lp-copy">
        <p class="eyebrow">Stockton + ${B.radiusMiles} miles</p>
        <h1>${esc(lp.h1)}</h1>
        <p class="subhero-lead">${esc(lp.sub)}</p>
        <ul class="lp-points">${lp.points.map((x) => `<li>${icon('check', 'ico ico-sm')}${esc(x)}</li>`).join('')}</ul>
      </div>
      <div class="lp-quiz" id="start">${quiz({ steps: lp.steps, title: lp.quizTitle, interest: lp.interest, company: lp.company })}</div>
    </div>
  </section>
  ${wave('navy', 'cream')}
  <section class="section section-cream">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'How it works', h: 'Three easy steps', cls: 'center' })}
      <ol class="how">${howSteps.map((s, i) => `<li><span class="how-ico">${icon(s.i)}</span><span class="how-n">Step ${i + 1}</span><b>${esc(s.h)}</b><p>${esc(s.p)}</p></li>`).join('')}</ol>
    </div>
  </section>
  <section class="section section-paper">
    <div class="wrap">
      ${sectionHead({ eyebrow: 'Why Air Climate', h: 'Local, licensed and upfront', cls: 'center' })}
      ${whyTiles()}
    </div>
  </section>
  <section class="section section-cream">
    <div class="wrap narrow">
      ${sectionHead({ eyebrow: 'Questions', h: 'Before you book', cls: 'center' })}
      ${faqList(lp.faqs)}
      <p class="lp-areas">Serving Stockton, ${few.map((c) => esc(c.name)).join(', ')} and more.</p>
      <div class="btn-row center"><a class="btn btn-book" href="#start">${icon('calendar', 'ico ico-sm')}Get started</a>${callBtn()}</div>
    </div>
  </section>
</main>
<footer class="lp-footer">
  <div class="header-stripes" aria-hidden="true"><span></span><span></span></div>
  <div class="wrap lp-footer-in">
    <p>${esc(B.name)} — ${esc(B.addressLine)} — ${B.licenseLabel}</p>
    <p><a href="${B.phoneHref}">${B.phone}</a> <a href="/privacy/">Privacy</a></p>
  </div>
</footer>
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}
