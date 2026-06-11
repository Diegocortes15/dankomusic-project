// Contact.jsx — direct contact: WhatsApp (primary), email, Instagram. No booking form.

function Contact({ lang }) {
  return (
    <section id="contact" className="section contact">
      <Reveal><SectionStarter num="" total={4} title={lang === 'en' ? 'CONTACT' : 'CONTACTO'} lede={t('contact.lede', lang)} /></Reveal>

      <div className="contact__cards">
        <Reveal delay={80} as="a" className="contact-card contact-card--wa" href={waLink(t('wa.general', lang))}>
          <span className="contact-card__icon"><Icon name="whatsapp" size={26} /></span>
          <span className="contact-card__label mono">WHATSAPP</span>
          <span className="contact-card__value">{WHATSAPP_DISPLAY}</span>
          <span className="contact-card__cta">{t('cta.whatsapp', lang)} <Icon name="chevron-right" size={16} /></span>
        </Reveal>

        <Reveal delay={160} as="a" className="contact-card" href={`mailto:${EMAIL}`}>
          <span className="contact-card__icon"><Icon name="mail" size={24} /></span>
          <span className="contact-card__label mono">EMAIL</span>
          <span className="contact-card__value contact-card__value--sm">{EMAIL}</span>
          <span className="contact-card__cta">{t('cta.email', lang)} <Icon name="chevron-right" size={16} /></span>
        </Reveal>

        <Reveal delay={240} as="a" className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <span className="contact-card__icon"><Icon name="instagram" size={24} /></span>
          <span className="contact-card__label mono">INSTAGRAM</span>
          <span className="contact-card__value">@{INSTAGRAM_USER}</span>
          <span className="contact-card__cta">{t('cta.follow', lang)} <Icon name="external" size={15} /></span>
        </Reveal>
      </div>
    </section>
  );
}

window.Contact = Contact;
