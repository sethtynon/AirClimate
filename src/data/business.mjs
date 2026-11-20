// Core business facts. Everything that appears site-wide comes from here.
// TODO before launch: set siteUrl to the real domain and formEndpoint to your form handler.
export const business = {
  name: 'Air Climate Heating & Cooling',
  shortName: 'Air Climate',
  phone: '(209) 642-9021',
  phoneHref: 'tel:+12096429021',
  phoneE164: '+12096429021',
  license: '901237',
  licenseLabel: 'CA Lic. #901237',
  city: 'Stockton',
  region: 'CA',
  regionName: 'California',
  radiusMiles: 40,
  geo: { lat: 37.9577, lng: -121.2908 }, // Stockton city center
  siteUrl: 'https://www.example.com', // TODO: replace with the live domain (used for canonical URLs + sitemap)
  formEndpoint: '', // TODO: e.g. a Formspree / Netlify / CRM webhook URL. Empty = demo mode (redirects to thank-you page).
  email: '', // optional; leave blank to hide
  social: { facebook: '', instagram: '', google: '', yelp: '' }, // fill in when profiles exist
  // Google map shown in the service-area section. Once your Google Business Profile is live,
  // change this to your business name (e.g. 'Air Climate Heating & Cooling, Stockton, CA') so the map shows your listing + reviews.
  mapQuery: 'Stockton, CA',
  // Real customer reviews (copy from Google). The reviews section stays hidden until at least one is added.
  // Example: { name: 'Maria G.', city: 'Lodi', text: 'Came out the same day…' }
  reviews: [],
  // Specials / promotions cards. EXAMPLES — confirm or edit before launch. Delete all to hide the section.
  specials: [
    { big: 'FREE', title: 'In-home estimate', text: 'On any new AC, furnace, heat pump or ductless system.' },
    { big: 'PRIORITY', title: 'Comfort Plan members', text: 'Members move to the front of the line on repair calls.' },
    { big: 'REBATES', title: 'We do the homework', text: 'We check which utility and manufacturer rebates your new system qualifies for.' },
  ],
};
