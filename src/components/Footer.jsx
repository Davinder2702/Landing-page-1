const cols = [
  { title: 'Shop', links: ['Audio', 'Wearables', 'Computing', 'Phones', 'Cameras'] },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 3 3 20h4.2l1.5-3h6.6l1.5 3H21L12 3Zm-2 11 2-4.2 2 4.2h-4Z" />
              </svg>
            </span>
            Vista
          </div>
          <p>Authentic electronics, clear choices and a shopping experience you can trust.</p>
          <p className="footer-contact">hello@vista.store<br />+1 (555) 014-2290</p>
        </div>

        {cols.map((c) => (
          <div key={c.title} className="footer-col">
            <h4>{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-wordmark" aria-hidden="true">vista</div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Vista. All rights reserved.</span>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
