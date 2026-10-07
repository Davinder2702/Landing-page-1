const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_IMAGE = img('1505740420928-5e560c06d30e', 2000);

export const categories = [
  { id: 'audio', name: 'Audio', count: 48 },
  { id: 'wearables', name: 'Wearables', count: 32 },
  { id: 'computing', name: 'Computing', count: 26 },
  { id: 'phones', name: 'Phones', count: 19 },
  { id: 'cameras', name: 'Cameras', count: 14 },
  { id: 'accessories', name: 'Accessories', count: 57 },
];

export const products = [
  {
    id: 1, name: 'Aura Over-Ear Headphones', category: 'audio', price: 249, oldPrice: 299, tag: 'Bestseller',
    description: 'Adaptive noise cancelling with 40-hour battery and plush memory-foam cushions.',
    image: img('1505740420928-5e560c06d30e'),
  },
  {
    id: 2, name: 'Pulse Wireless Earbuds', category: 'audio', price: 129, tag: 'New',
    description: 'Compact true-wireless buds with spatial audio and a pocketable charging case.',
    image: img('1590658268037-6bf12165a8df'),
  },
  {
    id: 3, name: 'Minimal Smart Watch', category: 'wearables', price: 199,
    description: 'Always-on display, heart-rate tracking and a week of battery in a clean case.',
    image: img('1523275335684-37898b6baf30'),
  },
  {
    id: 4, name: 'Slate 14 Laptop', category: 'computing', price: 1299, oldPrice: 1449, tag: 'Sale',
    description: 'Featherweight aluminium body, 18-hour battery and a colour-accurate display.',
    image: img('1496181133206-80ce9b88a853'),
  },
  {
    id: 5, name: 'Nova Phone 12', category: 'phones', price: 899,
    description: 'Triple-lens camera system, all-day battery and a bright edge-to-edge screen.',
    image: img('1511707171634-5f897ff02aa9'),
  },
  {
    id: 6, name: 'Frame Mirrorless Camera', category: 'cameras', price: 1099, tag: 'New',
    description: '24MP full-frame sensor with fast autofocus and a timeless compact body.',
    image: img('1516035069371-29a1b244cc32'),
  },
  {
    id: 7, name: 'Tactile Mechanical Keyboard', category: 'accessories', price: 159,
    description: 'Hot-swappable switches, aluminium plate and quiet, satisfying keystrokes.',
    image: img('1587829741301-dc798b83add3'),
  },
  {
    id: 8, name: 'Echo Portable Speaker', category: 'audio', price: 89, oldPrice: 109, tag: 'Sale',
    description: 'Room-filling 360° sound, waterproof shell and 20 hours of playback.',
    image: img('1608043152269-423dbba4e7e1'),
  },
  {
    id: 9, name: 'Canvas Tablet 11', category: 'computing', price: 649,
    description: 'Laminated display with pencil support for notes, sketches and reading.',
    image: img('1544244015-0df4b3ffc6b0'),
  },
  {
    id: 10, name: 'Studio Headphones', category: 'audio', price: 179,
    description: 'Flat, honest response tuned for mixing, with a detachable braided cable.',
    image: img('1484704849700-f032a568e944'),
  },
  {
    id: 11, name: 'Precision Wireless Mouse', category: 'accessories', price: 69,
    description: 'Ergonomic shape, silent clicks and a sensor that works on any surface.',
    image: img('1527864550417-7fd91fc51a46'),
  },
  {
    id: 12, name: 'Instant Film Camera', category: 'cameras', price: 119,
    description: 'Point, shoot and hold the print — analogue charm with a modern flash.',
    image: img('1606220588913-b3aacb4d2f46'),
  },
];

export const colors = [
  { name: 'Sage', value: '#6f906b' },
  { name: 'Graphite', value: '#2b2e2b' },
  { name: 'Chalk', value: '#e9e7e1' },
];

export const specs = {
  audio: [
    ['Connectivity', 'Bluetooth 5.3, multipoint'],
    ['Battery life', 'Up to 40 hours'],
    ['Charging', 'USB-C, 10 min = 5 hours'],
    ['Weight', '250 g'],
  ],
  wearables: [
    ['Display', '1.4" always-on AMOLED'],
    ['Battery life', 'Up to 7 days'],
    ['Water resistance', '5 ATM'],
    ['Sensors', 'Heart rate, SpO2, GPS'],
  ],
  computing: [
    ['Processor', '10-core, 3.5 GHz'],
    ['Memory', '16 GB unified'],
    ['Storage', '512 GB SSD'],
    ['Battery life', 'Up to 18 hours'],
  ],
  phones: [
    ['Display', '6.1" OLED, 120 Hz'],
    ['Camera', '48 MP triple system'],
    ['Storage', '256 GB'],
    ['Battery', 'All-day, 30 W fast charge'],
  ],
  cameras: [
    ['Sensor', '24 MP full-frame'],
    ['Autofocus', '693-point hybrid AF'],
    ['Video', '4K at 60 fps'],
    ['Weight', '510 g (body)'],
  ],
  accessories: [
    ['Connectivity', 'Bluetooth + 2.4 GHz'],
    ['Battery', 'Up to 3 months'],
    ['Compatibility', 'macOS, Windows, iPadOS'],
    ['Materials', 'Aluminium, PBT'],
  ],
};

// Business WhatsApp number in international format, digits only (e.g. '919876543210').
// Left empty, wa.me opens WhatsApp and lets the user pick a chat.
export const WHATSAPP_NUMBER = '';

export const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const productUrl = (id) =>
  `${window.location.origin}${window.location.pathname}#/product/${id}`;
