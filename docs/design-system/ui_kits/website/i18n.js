// i18n.js — bilingual string table (ES primary, EN). t(key, lang) -> string.

const STRINGS = {
  // Nav
  'nav.bio':      { es: 'Perfil',       en: 'About' },
  'nav.shows':    { es: 'Shows',        en: 'Shows' },
  'nav.gallery':  { es: 'Galería',      en: 'Gallery' },
  'nav.music':    { es: 'SoundCloud',   en: 'SoundCloud' },
  'nav.contact':  { es: 'Contacto',     en: 'Contact' },

  // Hero
  'hero.eyebrow':  { es: 'Peak Time Techno · Bogotá, CO', en: 'Peak Time Techno · Bogotá, CO' },
  'hero.scroll':   { es: 'Scroll', en: 'Scroll' },

  // CTAs
  'cta.soundcloud':{ es: 'Escuchar en SoundCloud', en: 'Listen on SoundCloud' },
  'cta.whatsapp':  { es: 'Contactar a Dankø',      en: 'Contact Dankø' },
  'cta.tickets':   { es: 'Conseguir entradas',     en: 'Get Tickets' },
  'cta.email':     { es: 'Escribir email',         en: 'Send email' },
  'cta.follow':    { es: 'Seguir',                 en: 'Follow' },

  // WhatsApp prefilled
  'wa.general':    {
    es: 'Hola Dankø, quiero información sobre tus eventos.',
    en: 'Hi Dankø, I\u2019d like information about your events.'
  },

  // Events
  'event.next':      { es: 'Próximo evento', en: 'Next event' },
  'event.upcoming':  { es: 'Próximo',        en: 'Upcoming' },
  'event.completed': { es: 'Realizado',      en: 'Completed' },

  // Venue
  'venue.open':  { es: 'Ver en Maps', en: 'Open in Maps' },

  // Shows
  'shows.lede': {
    es: 'Calendario en vivo — de la primera fiesta entre amigos a residente en la escena de Bogotá.',
    en: 'Live calendar — from a first party with friends to a resident in Bogotá\u2019s scene.'
  },
  'shows.upcoming': { es: 'Próximas', en: 'Upcoming' },
  'shows.past':     { es: 'Pasadas',  en: 'Past' },
  'shows.viewAll':  { es: 'Ver todos los shows', en: 'View all shows' },
  'shows.showing':  { es: 'Mostrando {n} de {total}', en: 'Showing {n} of {total}' },
  'shows.empty':    { es: 'Sin fechas por ahora.', en: 'No dates right now.' },
  'shows.allTitle': { es: 'Todos los shows', en: 'All shows' },
  'shows.back':     { es: 'Volver al sitio', en: 'Back to site' },

  // Stats
  'stat.sets':   { es: 'Sets',       en: 'Sets' },
  'stat.bpm':    { es: 'Rango BPM',  en: 'BPM range' },
  'stat.exp':    { es: 'Experiencia',en: 'Experience' },

  // Bio
  'bio.body': {
    es: 'Dankø es DJ y productor con 4 años de experiencia. Su sonido se enfoca principalmente en Peak Time Techno, combinando potencia, precisión y versatilidad. Su propuesta artística también se mueve entre el Melodic Techno y el Afro House, construyendo una energía progresiva que lleva la pista hacia el peak time manteniendo una identidad propia.',
    en: 'Dankø is a DJ and producer with 4 years of experience. His sound is primarily focused on Peak Time Techno, combining power, precision and versatility. His artistic approach also moves between Melodic Techno and Afro House, building a progressive energy that drives the dancefloor toward peak time while maintaining a distinct identity.'
  },

  // Journey
  'journey.lede': {
    es: 'De la primera fiesta entre amigos a residente en la escena electrónica de Bogotá.',
    en: 'From a first party with friends to a resident in Bogotá\u2019s electronic scene.'
  },
  'journey.growth': {
    es: 'A partir de esta etapa, Dankø se convierte en artista residente de Drop V Booking, manteniendo presencia continua en RadioBerlin y fortaleciendo su posición dentro de la escena electrónica de Bogotá.',
    en: 'From this stage onward, Dankø became a resident artist of Drop V Booking, maintaining a continued presence at RadioBerlin and strengthening his position within Bogotá\u2019s electronic music scene.'
  },

  // Gallery
  'gallery.lede': {
    es: 'Cabina, pista y club. Toca una imagen para ampliar.',
    en: 'Booth, floor and club. Tap any image to expand.'
  },

  // SoundCloud
  'sc.lede': {
    es: 'La plataforma principal de Dankø. Sets, edits y producciones originales — dale play.',
    en: 'Dankø\u2019s primary platform. Sets, edits and original productions — hit play.'
  },

  // Contact
  'contact.lede': {
    es: 'Información de eventos, prensa y colaboraciones. WhatsApp es la vía más rápida.',
    en: 'Event info, press and collaborations. WhatsApp is the fastest way to reach out.'
  },

  // Footer
  'footer.tag':     { es: 'Peak Time Techno · Bogotá', en: 'Peak Time Techno · Bogotá' },
  'footer.rights':  { es: '© 2026 Dankø. Todos los derechos reservados.', en: '© 2026 Dankø. All rights reserved.' },
  'footer.built':   { es: 'Hecho en Bogotá', en: 'Made in Bogotá' },
};

function t(key, lang = 'es') {
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[lang] ?? entry.es ?? key;
}

window.t = t;
window.STRINGS = STRINGS;
