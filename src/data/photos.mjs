// Stand-in photography (Unsplash, free license) until real Air Climate job photos are available.
// TODO: replace with your own photos of your team, trucks and installs — real photos convert far better.
const u = (id, w = 1200, h = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

export const photoIds = {
  techAc: '1792799888905-8696bd32a11a',     // technician servicing an outdoor AC unit
  techHands: '1792799881226-e841c0f9c125',  // technician connecting gauges
  condenser: '1776860150305-108ed577d7d4',  // outdoor unit beside a home
  heatpump: '1776860155275-eee24bfb1dee',   // house with heat pump
  cozy: '1770751188018-794ed229204a',       // warm living room
  minisplit: '1759772238012-9d5ad59ae637',  // wall-mounted ductless head
  thermostat: '1545259741-2ea3ebf61fa3',    // smart thermostat
  humidifier: '1768471569643-717e823b5f9a', // clean air
  ducts: '1786840671711-bdabee8634cf',      // ductwork
  rooftop: '1774290331891-5d759056c68d',    // commercial rooftop units
  framing: '1777105939822-21228c81916d',    // new construction
  family: '1762500824959-ad78b31b4161',     // family at home
  house: '1598228723793-52759bba239c',      // home exterior
};

export const photo = (key, w, h) => u(photoIds[key], w, h);

// Default photo for each service category / specific service
export const categoryPhoto = { cooling: 'condenser', heating: 'cozy', heatpump: 'heatpump', ductless: 'minisplit', air: 'ducts', build: 'rooftop', urgent: 'techAc' };
const servicePhotoOverride = {
  'ac-repair': 'techAc', 'ac-tune-up': 'techHands', 'ac-maintenance': 'techHands', 'thermostats': 'thermostat', 'zoning-systems': 'thermostat',
  'indoor-air-quality': 'humidifier', 'air-purification': 'humidifier', 'new-construction': 'framing', 'remodels-additions': 'framing',
  'whole-house-fans': 'house', 'ventilation': 'house',
};
export const servicePhotoKey = (s) => servicePhotoOverride[s.slug] || categoryPhoto[s.category] || 'techAc';
