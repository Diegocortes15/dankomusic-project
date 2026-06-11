// Footer.jsx — slim footer. Logo, name, socials (SoundCloud emphasized), contact.

function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="footer__left">
        <img className="footer__logo" src="../../assets/logo/danko_logo.jpeg" alt="" />
        <div>
          <div className="footer__name">DANK<span className="footer__o">Ø</span></div>
          <div className="footer__tag mono">{t('footer.tag', lang)}</div>
        </div>
      </div>

      <div className="footer__socials">
        <a className="footer__social footer__social--primary" href={SOUNDCLOUD_URL} target="_blank" rel="noreferrer" aria-label="SoundCloud">
          <Icon name="soundcloud" size={18} />
        </a>
        <a className="footer__social" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Icon name="instagram" size={18} />
        </a>
        <a className="footer__social" href={waLink(t('wa.general', lang))} aria-label="WhatsApp">
          <Icon name="whatsapp" size={18} />
        </a>
        <a className="footer__social" href={`mailto:${EMAIL}`} aria-label="Email">
          <Icon name="mail" size={18} />
        </a>
      </div>

      <div className="footer__rights mono">
        <div>{t('footer.rights', lang)}</div>
        <div>{t('footer.built', lang)} · 04°35′N 74°04′W</div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
