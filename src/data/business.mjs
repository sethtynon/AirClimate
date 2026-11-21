// Core business facts. Everything that appears site-wide comes from here.
export const business = {
  name: 'Air Climate Heating & Cooling',
  shortName: 'Air Climate',
  gbpName: 'Air Climate Heating & Air of Stockton', // exact Google Business Profile name
  phone: '(209) 642-9021',
  phoneHref: 'tel:+12096429021',
  phoneE164: '+12096429021',
  license: '901237',
  licenseLabel: 'CA Lic. #901237',
  city: 'Stockton',
  region: 'CA',
  regionName: 'California',
  radiusMiles: 40,
  address: { street: '5922 Mitchler Ave', city: 'Stockton', region: 'CA', zip: '95207' },
  addressLine: '5922 Mitchler Ave, Stockton, CA 95207',
  geo: { lat: 37.9577, lng: -121.2908 }, // Stockton city center
  siteUrl: 'https://callairclimate.com', // live domain (used for canonical URLs + sitemap). Must match the primary domain in Netlify.
  // Leads go to Netlify Forms (Netlify → Forms) and are emailed by Netlify's form notifications.
  // Only set this if you later want leads POSTed somewhere else instead (e.g. a CRM webhook).
  formEndpoint: '',
  // Ad tracking. Paste IDs here to turn them on; the thank-you page fires a 'Lead' conversion.
  // Google Search Console verification token (meta-tag method).
  googleSiteVerification: 'lgkr-zFoT11WqOLXIAlhwr9MxIyrtaEsH5MR2kERFNc',
  tracking: {
    metaPixelId: '', // Facebook / Meta Pixel ID (numbers only)
    ga4Id: '', // Google Analytics 4, e.g. 'G-XXXXXXX'
    googleAdsId: '', // Google Ads, e.g. 'AW-123456789'
    googleAdsLeadLabel: '', // Google Ads conversion label for leads
  },
  email: '', // optional; leave blank to hide
  social: { facebook: '', instagram: '', google: '', yelp: '' }, // fill in when profiles exist
  // Google map shown in the service-area section. Once your Google Business Profile is live,
  // change this to your business name (e.g. 'Air Climate Heating & Cooling, Stockton, CA') so the map shows your listing + reviews.
  mapQuery: 'Air Climate Heating & Air of Stockton, 5922 Mitchler Ave, Stockton, CA 95207',
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
