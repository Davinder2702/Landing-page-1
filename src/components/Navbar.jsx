import { useState } from 'react';
import { Search, ShoppingBag, Heart, ChevronDown, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Shop', href: '#shop', dropdown: true },
];

export default function Navbar({ cartCount, wishCount, onCart }) {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#" className="logo" aria-label="Vista home">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 3 3 20h4.2l1.5-3h6.6l1.5 3H21L12 3Zm-2 11 2-4.2 2 4.2h-4Z" />
          </svg>
        </a>
        <span className="nav-divider" />
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={active === l.label ? 'active' : ''}
                onClick={() => {
                  setActive(l.label);
                  setMenuOpen(false);
                }}
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} />}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-right">
        <a href="#contact" className="nav-contact">Contact</a>
        <span className="nav-divider" />
        <button className="icon-btn" aria-label="Search"><Search size={17} /></button>
        <button className="icon-btn" aria-label="Wishlist">
          <Heart size={17} />
          {wishCount > 0 && <span className="badge">{wishCount}</span>}
        </button>
        <button className="icon-btn" aria-label="Enquiry list" onClick={onCart}>
          <ShoppingBag size={17} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
        <button
          className="icon-btn menu-btn"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>
  );
}
