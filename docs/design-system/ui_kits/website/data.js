// data.js — events, venues, slogans, contact. Single source of truth.
// Event status is computed from the current date (see eventStatus()).

const WHATSAPP_NUMBER = '573152085980';        // +57 315 208 5980, digits only
const WHATSAPP_DISPLAY = '+57 315 208 5980';
const EMAIL = 'didami1013@gmail.com';
const INSTAGRAM_USER = 'danko_d.j';
const INSTAGRAM_URL = 'https://www.instagram.com/danko_d.j/';
const SOUNDCLOUD_URL = 'https://soundcloud.com/daniel-beltran-101291848';

function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
function mapsLink(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// Venues — clickable, open Google Maps in a new tab.
const VENUES = {
  saint_tropez: { name: 'Saint Tropez Club', address: 'Calle 90 #16-56, Piso 20, Bogotá' },
  radioberlin:  { name: 'RadioBerlin',       address: 'Carrera 13 #64-13, Chapinero, Bogotá' },
  antisistema:  { name: 'Antisistema 225',   address: 'Avenida Caracas #63-42, Bogotá' },
  solarte:      { name: 'Solarte Hostel',    address: 'Solarte Hostel, Cundinamarca' },
  private:      { name: 'Private Party',      address: null },
};

// Timeline events, oldest -> newest. `date` is ISO. Status auto-computed.
const EVENTS = [
  {
    id: 'first-party', date: '2024-12-23', venue: 'private',
    titleEs: 'Primera presentación', titleEn: 'First performance',
    descEs: 'Primera presentación en una fiesta privada entre amigos.',
    descEn: 'First performance at a private party with friends.',
  },
  {
    id: 'first-club', date: '2025-06-21', venue: 'saint_tropez',
    titleEs: 'Primer club', titleEn: 'First club performance',
    descEs: 'Primera presentación en club.',
    descEn: 'First club performance.',
  },
  {
    id: 'b2b-brandon', date: '2025-08-27', venue: 'radioberlin',
    titleEs: 'B2B con Brandon Lahine', titleEn: 'B2B with Brandon Lahine',
    descEs: 'Presentación especial B2B junto a Brandon Lahine.',
    descEn: 'Special B2B performance with Brandon Lahine.',
  },
  {
    id: 'radioberlin-aug', date: '2025-08-30', venue: 'radioberlin',
    titleEs: 'RadioBerlin', titleEn: 'RadioBerlin',
    descEs: 'Presentación en RadioBerlin.',
    descEn: 'Performance at RadioBerlin.',
  },
  {
    id: 'radioberlin-jxxxo', date: '2025-12-13', venue: 'radioberlin',
    titleEs: 'RadioBerlin × JXXXO', titleEn: 'RadioBerlin × JXXXO',
    descEs: 'Presentación en RadioBerlin y participación en un evento junto al DJ internacional JXXXO.',
    descEn: 'Performance at RadioBerlin and participation in an event alongside international DJ JXXXO.',
  },
  {
    id: 'antisistema', date: '2026-01-24', venue: 'antisistema',
    titleEs: 'Antisistema 225', titleEn: 'Antisistema 225',
    descEs: 'Presentación en Antisistema 225.',
    descEn: 'Performance at Antisistema 225.',
  },
  {
    id: 'solarte', date: '2026-06-14', venue: 'solarte', featured: true,
    titleEs: 'Evento destacado', titleEn: 'Featured event',
    descEs: 'Próxima fecha destacada en Solarte Hostel, Cundinamarca.',
    descEn: 'Featured upcoming event at Solarte Hostel, Cundinamarca.',
  },
];

// Auto status from today's date.
function eventStatus(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + 'T00:00:00');
  return d.getTime() >= today.getTime() ? 'upcoming' : 'completed';
}

const SLOGANS = {
  primary:  { es: 'Esto no es un set. Es mi carácter en frecuencia.', en: 'This is not a set. It\u2019s my character in frequency.' },
  alt: [
    { es: 'Cada golpe suena a quien soy.',              en: 'Every hit sounds like who I am.' },
    { es: 'Mi sonido no se adapta. Impone presencia.',  en: 'My sound doesn\u2019t adapt. It commands presence.' },
    { es: 'Techno con carácter. Sin concesiones.',      en: 'Techno with character. No compromises.' },
  ],
};

const GENRES = ['Techno', 'Peak Time', 'Melodic Techno', 'Afro House'];

Object.assign(window, {
  WHATSAPP_NUMBER, WHATSAPP_DISPLAY, EMAIL, INSTAGRAM_USER, INSTAGRAM_URL, SOUNDCLOUD_URL,
  waLink, mapsLink, VENUES, EVENTS, eventStatus, SLOGANS, GENRES,
});
