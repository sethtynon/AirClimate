// Service-area cities. Each becomes /service-areas/<slug>/
// Coordinates are approximate city centers; distance from Stockton is computed at build time
// and any city beyond the radius in business.mjs is dropped automatically.
// zone: 'valley' | 'delta' | 'foothill' — drives climate-specific copy.

export const cities = [
  // San Joaquin County
  { name: 'Stockton', county: 'San Joaquin', lat: 37.9577, lng: -121.2908, zone: 'valley', home: true,
    note: 'Stockton is home base. We work in every part of town — from the older homes around Miracle Mile and the University of the Pacific to Brookside, Spanos Park, Lincoln Village, Weston Ranch and Morada.',
    zips: '95202–95219' },
  { name: 'Lodi', county: 'San Joaquin', lat: 38.1302, lng: -121.2724, zone: 'valley',
    note: 'Lodi’s mix of older bungalows near downtown and newer neighborhoods on the west side means we see everything from original floor furnaces to modern variable-speed systems.' },
  { name: 'Manteca', county: 'San Joaquin', lat: 37.7974, lng: -121.2161, zone: 'valley',
    note: 'Manteca has grown fast, and many of its newer two-story homes deal with a hot upstairs in summer — a problem zoning, duct fixes or a right-sized system can solve.' },
  { name: 'Tracy', county: 'San Joaquin', lat: 37.7397, lng: -121.4252, zone: 'delta',
    note: 'Tracy gets hot afternoons and strong evening winds off the Altamont. Outdoor units here collect a lot of dust and debris, so yearly coil cleaning matters.' },
  { name: 'Lathrop', county: 'San Joaquin', lat: 37.8227, lng: -121.2766, zone: 'valley',
    note: 'From established neighborhoods to newer homes in River Islands, Lathrop homeowners count on efficient cooling through long Valley summers.' },
  { name: 'Ripon', county: 'San Joaquin', lat: 37.7416, lng: -121.1244, zone: 'valley',
    note: 'Ripon’s ranch-style homes and orchard properties often have older equipment and long duct runs worth a closer look.' },
  { name: 'Escalon', county: 'San Joaquin', lat: 37.7977, lng: -120.9969, zone: 'valley',
    note: 'In Escalon and the surrounding farmland, we service homes, shops and outbuildings — including ductless systems for spaces without ductwork.' },
  { name: 'Mountain House', county: 'San Joaquin', lat: 37.7833, lng: -121.5427, zone: 'delta',
    note: 'Mountain House homes are newer and built tight. Many benefit from smart thermostat setup, zoning and fresh-air ventilation.' },
  { name: 'French Camp', county: 'San Joaquin', lat: 37.8844, lng: -121.2716, zone: 'valley',
    note: 'Just south of Stockton, French Camp is minutes from our home base — quick response for repairs and installs.' },
  { name: 'Lockeford', county: 'San Joaquin', lat: 38.1635, lng: -121.1497, zone: 'valley',
    note: 'Lockeford’s rural homes and ranch properties often need equipment that can handle long runs, shops and detached spaces.' },
  { name: 'Linden', county: 'San Joaquin', lat: 38.0213, lng: -121.0838, zone: 'valley',
    note: 'Out among Linden’s walnut and cherry orchards, we take care of farmhouses, newer homes and the shops and offices that go with them.' },
  { name: 'Woodbridge', county: 'San Joaquin', lat: 38.1541, lng: -121.3008, zone: 'valley',
    note: 'Woodbridge sits just northwest of Lodi along the Mokelumne River, with a mix of older homes and rural properties.' },
  { name: 'Farmington', county: 'San Joaquin', lat: 37.9302, lng: -120.9997, zone: 'valley',
    note: 'East of Stockton in Farmington, we handle heating and cooling for rural homes and ag-property buildings.' },
  // Stanislaus County
  { name: 'Modesto', county: 'Stanislaus', lat: 37.6391, lng: -120.9969, zone: 'valley',
    note: 'Modesto’s housing ranges from mid-century homes in College Area and La Loma to newer subdivisions in north Modesto — and every one of them needs reliable AC by June.' },
  { name: 'Salida', county: 'Stanislaus', lat: 37.7058, lng: -121.0849, zone: 'valley',
    note: 'Salida’s neighborhoods sit right off Highway 99 between Manteca and Modesto, an easy run for our trucks.' },
  { name: 'Riverbank', county: 'Stanislaus', lat: 37.7360, lng: -120.9354, zone: 'valley',
    note: 'Riverbank homes along the Stanislaus River see hot, dry summers and foggy winter mornings — both seasons put your system to work.' },
  { name: 'Oakdale', county: 'Stanislaus', lat: 37.7666, lng: -120.8471, zone: 'valley',
    note: 'Oakdale sits where the Valley meets the foothills, so homes here get both serious summer heat and colder winter nights.' },
  { name: 'Ceres', county: 'Stanislaus', lat: 37.5949, lng: -120.9577, zone: 'valley',
    note: 'Ceres homeowners rely on dependable cooling through triple-digit stretches every summer.' },
  { name: 'Hughson', county: 'Stanislaus', lat: 37.5966, lng: -120.8663, zone: 'valley',
    note: 'Hughson is surrounded by orchards, and ag dust is hard on outdoor units. Regular coil cleaning keeps systems efficient.' },
  { name: 'Waterford', county: 'Stanislaus', lat: 37.6413, lng: -120.7605, zone: 'valley',
    note: 'On the Tuolumne River east of Modesto, Waterford homes deal with long, hot summers and cool winter mornings.' },
  { name: 'Patterson', county: 'Stanislaus', lat: 37.4716, lng: -121.1297, zone: 'valley',
    note: 'Patterson’s growing neighborhoods on the west side of the Valley include many newer homes ready for smart controls and high-efficiency upgrades.' },
  // Sacramento County
  { name: 'Galt', county: 'Sacramento', lat: 38.2546, lng: -121.2999, zone: 'valley',
    note: 'Galt sits right on Highway 99 north of Lodi, an easy drive for our service trucks.' },
  { name: 'Elk Grove', county: 'Sacramento', lat: 38.4088, lng: -121.3716, zone: 'valley',
    note: 'Elk Grove’s large stock of two-story homes often struggle with uneven temperatures between floors — zoning and duct work can help.' },
  { name: 'Wilton', county: 'Sacramento', lat: 38.4119, lng: -121.2722, zone: 'valley',
    note: 'Wilton’s rural acreage homes often need systems sized for larger floor plans, detached shops and guest houses.' },
  // Contra Costa County
  { name: 'Discovery Bay', county: 'Contra Costa', lat: 37.9085, lng: -121.6002, zone: 'delta',
    note: 'Waterfront homes in Discovery Bay see Delta humidity and wind. Corrosion-resistant equipment placement and regular maintenance pay off here.' },
  { name: 'Brentwood', county: 'Contra Costa', lat: 37.9319, lng: -121.6958, zone: 'delta',
    note: 'Brentwood summers are hotter than the rest of the Bay Area, and many larger homes here benefit from zoning and two-stage equipment.' },
  { name: 'Oakley', county: 'Contra Costa', lat: 37.9974, lng: -121.7125, zone: 'delta',
    note: 'Oakley homeowners get hot inland afternoons with cooling Delta breezes in the evening — a great fit for whole-house fans and efficient AC.' },
  { name: 'Antioch', county: 'Contra Costa', lat: 38.0049, lng: -121.8058, zone: 'delta',
    note: 'Antioch has everything from older homes near Rivertown to newer subdivisions in the south — we service them all.' },
  { name: 'Byron', county: 'Contra Costa', lat: 37.8672, lng: -121.6380, zone: 'delta',
    note: 'Rural Byron properties often need flexible solutions, including ductless systems for shops and outbuildings.' },
  // Solano County
  { name: 'Rio Vista', county: 'Solano', lat: 38.1557, lng: -121.6913, zone: 'delta',
    note: 'On the Sacramento River, Rio Vista gets steady Delta winds. Outdoor units here benefit from regular cleaning and inspection.' },
  // Amador County
  { name: 'Ione', county: 'Amador', lat: 38.3527, lng: -120.9327, zone: 'foothill',
    note: 'Ione sits in the lower foothills, with hot summers and colder winters than the Valley floor — heating matters as much as cooling here.' },
  { name: 'Jackson', county: 'Amador', lat: 38.3488, lng: -120.7741, zone: 'foothill',
    note: 'Jackson’s foothill homes, many on hillsides with older systems, see real winter cold — dependable heat and properly sized heat pumps make a difference.' },
  // Calaveras County
  { name: 'Valley Springs', county: 'Calaveras', lat: 38.1916, lng: -120.8291, zone: 'foothill',
    note: 'Around Valley Springs and the lakes, foothill homes need heating and cooling that can handle both summer heat and winter frost.' },
  { name: 'San Andreas', county: 'Calaveras', lat: 38.1960, lng: -120.6805, zone: 'foothill',
    note: 'San Andreas homes face colder winters than the Valley. Heat pumps and furnaces need to be sized right for the elevation.' },
  { name: 'Copperopolis', county: 'Calaveras', lat: 37.9811, lng: -120.6416, zone: 'foothill',
    note: 'Lake and golf-course homes around Copperopolis often run larger systems — regular maintenance keeps them efficient.' },
];

export const zoneCopy = {
  valley: {
    climate: 'Valley summers regularly push past 100°, and winter tule fog keeps mornings cold and damp. Your system works hard in both seasons.',
    tip: 'Cleaning the outdoor coil every spring is one of the cheapest ways to protect your AC from Valley dust and heat.',
  },
  delta: {
    climate: 'Hot inland afternoons give way to Delta breezes in the evening, and steady wind blows dust and debris into outdoor units.',
    tip: 'Keep two feet of clearance around your outdoor unit and have the coil cleaned yearly — wind-blown debris builds up fast here.',
  },
  foothill: {
    climate: 'Foothill homes get Valley-level summer heat plus colder, frostier winters than the flatlands. Heating capacity matters as much as cooling.',
    tip: 'Schedule a fall furnace or heat pump tune-up before the first frost — foothill winters are harder on heating equipment.',
  },
};
