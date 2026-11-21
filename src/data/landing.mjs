// Ad landing pages -> /lp/<slug>/
// NOT linked anywhere on the site, set to noindex and left out of sitemap.xml.
// Each page is a sales funnel: a short tap-through questionnaire that qualifies the lead,
// then asks for ZIP + contact details. Every answer is sent with the lead (plus UTM / fbclid / gclid).

// ── Reusable questions ──
const systemType = {
  key: 'system', q: 'What kind of system do you have?',
  options: [
    { label: 'Central AC + furnace', icon: 'unit' },
    { label: 'Heat pump', icon: 'cycle' },
    { label: 'Ductless mini-split', icon: 'split' },
    { label: 'Package unit (outside or on roof)', icon: 'house' },
    { label: 'Not sure', icon: 'dial' },
  ],
};
const age = {
  key: 'system_age', q: 'About how old is it?',
  options: [{ label: 'Under 5 years' }, { label: '5–10 years' }, { label: '10–15 years' }, { label: '15+ years' }, { label: 'Not sure' }],
};
const urgency = {
  key: 'timing', q: 'How soon do you need us?',
  options: [
    { label: 'Today — it’s urgent', icon: 'bolt' },
    { label: 'In the next few days' },
    { label: 'Within a few weeks' },
    { label: 'Just planning ahead' },
  ],
};
const installTiming = {
  key: 'timing', q: 'When are you hoping to have it installed?',
  options: [
    { label: 'ASAP — mine is broken', icon: 'bolt' },
    { label: 'Within a month' },
    { label: 'In 1–3 months' },
    { label: 'Just researching' },
  ],
};
const owner = {
  key: 'owner', q: 'Do you own the property?',
  options: [
    { label: 'Yes, I own my home', icon: 'house' },
    { label: 'I rent', icon: 'pin' },
    { label: 'Landlord / property manager', icon: 'building' },
    { label: 'It’s a business', icon: 'building' },
  ],
};
const homeSize = {
  key: 'home_size', q: 'How big is the home?',
  options: [{ label: 'Under 1,200 sq ft' }, { label: '1,200–2,000 sq ft' }, { label: '2,000–3,000 sq ft' }, { label: '3,000+ sq ft' }, { label: 'Not sure' }],
};

export const landingPages = [
  {
    slug: 'ac-repair',
    h1: 'AC not cooling? We’ll get it running again.',
    sub: 'Honest air conditioning repair across Stockton and nearby cities. You see the price before we start.',
    interest: 'AC repair',
    quizTitle: 'Get your AC fixed',
    steps: [
      { key: 'problem', q: 'What’s your AC doing?', options: [
        { label: 'Not cooling at all', icon: 'snow' }, { label: 'Blowing warm air', icon: 'flame' },
        { label: 'Running but can’t keep up', icon: 'dial' }, { label: 'Leaking water or iced up', icon: 'snow' },
        { label: 'Making a strange noise', icon: 'bolt' }, { label: 'Won’t turn on', icon: 'close' },
      ] },
      systemType, age, urgency, owner,
    ],
    points: ['All brands of central AC repaired', 'Upfront pricing — approved by you first', 'Common parts carried on the truck', 'Licensed and insured, CA Lic. #1081315'],
    faqs: [
      { q: 'How fast can you come out?', a: 'Finish the quick questions or call, and we’ll give you the soonest available time. Urgent calls for seniors, infants and medical needs get priority.' },
      { q: 'Do you charge to diagnose?', a: 'There’s a diagnostic visit to find the actual problem. You’ll know the repair price before any work is done.' },
      { q: 'Should I keep running my AC?', a: 'If it’s blowing warm air or iced up, turn it off. Running it can turn a small repair into a big one.' },
    ],
  },
  {
    slug: 'new-ac-system',
    h1: 'Get a free estimate on a new AC or heat pump.',
    sub: 'Sized for your home, installed clean, permit handled. Serving Stockton and nearby cities.',
    interest: 'New system estimate',
    quizTitle: 'Start your free estimate',
    steps: [
      { key: 'project', q: 'What are you looking to replace?', options: [
        { label: 'AC only', icon: 'snow' }, { label: 'Furnace only', icon: 'flame' },
        { label: 'AC and furnace', icon: 'unit' }, { label: 'Switch to a heat pump', icon: 'cycle' },
        { label: 'Not sure — I need advice', icon: 'dial' },
      ] },
      homeSize, age, installTiming, owner,
    ],
    points: ['Free in-home estimate and load calculation', 'Good / better / best options with clear pricing', 'Old equipment hauled away', 'Permit and inspection handled'],
    faqs: [
      { q: 'Is the estimate really free?', a: 'Yes. We come out, measure, run a load calculation and give you options — no charge and no pressure.' },
      { q: 'How long does installation take?', a: 'Most replacements are done in a single day.' },
      { q: 'Are there rebates?', a: 'Often, especially on heat pumps. We’ll check what your new system qualifies for.' },
    ],
  },
  {
    slug: 'furnace-repair',
    h1: 'No heat? Let’s get your furnace back on.',
    sub: 'Safe, honest furnace and heating repair for Stockton and nearby cities.',
    interest: 'Heating repair',
    quizTitle: 'Get your heat back',
    steps: [
      { key: 'problem', q: 'What’s your heater doing?', options: [
        { label: 'No heat at all', icon: 'snow' }, { label: 'Blowing cold air', icon: 'fan' },
        { label: 'Turns on and off', icon: 'cycle' }, { label: 'Strange smell or noise', icon: 'bolt' },
        { label: 'Won’t light / ignite', icon: 'flame' }, { label: 'Something else', icon: 'dial' },
      ] },
      systemType, age, urgency, owner,
    ],
    points: ['Gas furnaces, heat pumps and wall heaters', 'Carbon monoxide and venting check on every call', 'Upfront pricing before work begins', 'CA Lic. #1081315'],
    faqs: [
      { q: 'I smell gas. What should I do?', a: 'Leave the home and call your gas utility or 911 from outside. Then call us once it’s safe.' },
      { q: 'Do you repair all brands?', a: 'Yes — Carrier, Trane, Lennox, Goodman, Rheem, Bryant and most others.' },
    ],
  },
  {
    slug: 'tune-up',
    h1: 'Book your seasonal HVAC tune-up.',
    sub: 'Catch small problems before they turn into breakdowns. AC in spring, furnace in fall.',
    interest: 'Tune-up / maintenance',
    quizTitle: 'Book your tune-up',
    steps: [
      { key: 'equipment', q: 'What needs a tune-up?', options: [
        { label: 'Air conditioner', icon: 'snow' }, { label: 'Furnace', icon: 'flame' },
        { label: 'Heat pump', icon: 'cycle' }, { label: 'AC and furnace', icon: 'unit' }, { label: 'Mini-split', icon: 'split' },
      ] },
      { key: 'last_service', q: 'When was it last serviced?', options: [
        { label: 'Within the last year' }, { label: '1–2 years ago' }, { label: 'More than 2 years ago' }, { label: 'Never / not sure' },
      ] },
      { key: 'systems', q: 'How many systems are in the home?', options: [{ label: 'One' }, { label: 'Two' }, { label: 'Three or more' }] },
      owner,
    ],
    points: ['Coil cleaning and electrical testing', 'Refrigerant and airflow checks', 'Safety and carbon monoxide checks on furnaces', 'Written report of what we find'],
    faqs: [
      { q: 'How long does a tune-up take?', a: 'About an hour for a typical single system.' },
      { q: 'Do you have a maintenance plan?', a: 'Yes — the Comfort Plan includes both seasonal tune-ups, priority scheduling and member savings.' },
    ],
  },
  {
    slug: 'heat-pump',
    h1: 'Go all-electric with a high-efficiency heat pump.',
    sub: 'Heating and cooling in one system — built for mild Valley winters. Free in-home estimates.',
    interest: 'Heat pump estimate',
    quizTitle: 'See if a heat pump fits',
    steps: [
      { key: 'current', q: 'What heats and cools your home now?', options: [
        { label: 'Gas furnace + AC', icon: 'unit' }, { label: 'An older heat pump', icon: 'cycle' },
        { label: 'Wall heater / no central system', icon: 'flame' }, { label: 'Not sure', icon: 'dial' },
      ] },
      { key: 'solar', q: 'Do you have rooftop solar?', options: [{ label: 'Yes', icon: 'bolt' }, { label: 'Planning to add it' }, { label: 'No' }] },
      homeSize, installTiming, owner,
    ],
    points: ['Ducted and ductless heat pumps', 'Help finding current rebates and incentives', 'Pairs well with rooftop solar', 'Permit and inspection handled'],
    faqs: [
      { q: 'Will a heat pump work in winter here?', a: 'Yes. Modern heat pumps are designed for much colder climates than ours. Dual-fuel options add gas backup if you want it.' },
      { q: 'Do I need a new electrical panel?', a: 'Not always. We check your panel during the free estimate.' },
    ],
  },
  {
    slug: 'hvac-service',
    h1: 'Heating and air service you can count on.',
    sub: 'Repair, replacement and maintenance for homes and businesses across Stockton and nearby cities.',
    interest: 'General HVAC service',
    quizTitle: 'Tell us what you need',
    steps: [
      { key: 'need', q: 'What can we help with?', options: [
        { label: 'Repair', icon: 'wrench' }, { label: 'New system', icon: 'unit' }, { label: 'Tune-up', icon: 'check' },
        { label: 'Ducts or air quality', icon: 'duct' }, { label: 'Commercial', icon: 'building' }, { label: 'Something else', icon: 'dial' },
      ] },
      systemType, urgency, owner,
    ],
    points: ['Residential, commercial and new construction', 'All major brands serviced', 'Upfront pricing', 'CA Lic. #1081315'],
    faqs: [
      { q: 'What areas do you serve?', a: 'Stockton and the surrounding area — Lodi, Manteca, Tracy, Modesto, Galt, Brentwood and more.' },
    ],
  },
  {
    slug: 'builders',
    h1: 'An HVAC sub that keeps your schedule.',
    sub: 'New construction, ADUs and remodel HVAC for builders in San Joaquin, Stanislaus and surrounding counties.',
    interest: 'New construction bid',
    quizTitle: 'Request a bid',
    company: true,
    steps: [
      { key: 'project_type', q: 'What type of project?', options: [
        { label: 'Custom home', icon: 'house' }, { label: 'Production / multiple homes', icon: 'building' },
        { label: 'ADU', icon: 'house' }, { label: 'Remodel or addition', icon: 'hammer' }, { label: 'Commercial', icon: 'building' },
      ] },
      { key: 'units', q: 'How many units?', options: [{ label: '1' }, { label: '2–5' }, { label: '6–20' }, { label: '20+' }] },
      { key: 'stage', q: 'Where is the project now?', options: [
        { label: 'Plans ready for bid' }, { label: 'Still in design' }, { label: 'Under construction' }, { label: 'Just budgeting' },
      ] },
      { key: 'timing', q: 'When do you need HVAC rough-in?', options: [
        { label: 'Within 30 days' }, { label: '1–3 months' }, { label: '3–6 months' }, { label: '6+ months' },
      ] },
    ],
    points: ['Bids from plans', 'Load calcs and duct design', 'Energy-code compliant installs', 'Rough-in and trim on schedule'],
    faqs: [
      { q: 'How do I get a bid?', a: 'Answer the quick questions and we’ll reach out for plans.' },
      { q: 'Do you handle Title 24 requirements?', a: 'Yes. We design and install to current California energy code and coordinate testing.' },
    ],
  },
];
