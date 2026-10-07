import { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { productUrl, whatsappLink } from '../data.js';
import { money } from './ProductCard.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const listEnquiry = (items, total) =>
  whatsappLink(
    [
      "Hi! I'd like to enquire about these products:",
      '',
      ...items.map(
        (i, n) =>
          `${n + 1}. ${i.name}${i.color ? ` (${i.color})` : ''} × ${i.qty} — ${money(i.price * i.qty)}\n   ${productUrl(i.id)}`,
      ),
      '',
      `Estimated total: ${money(total)}`,
    ].join('\n'),
  );

export default function CartDrawer({ open, items, onClose, onQty }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Enquiry list</h3>
          <button className="icon-btn dark" onClick={onClose} aria-label="Close enquiry list">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <ShoppingBag size={28} />
            <p>Your enquiry list is empty.</p>
          </div>
        ) : (
          <ul className="drawer-items">
            {items.map((i) => (
              <li key={i.key}>
                <img src={i.image} alt="" />
                <div className="drawer-item-info">
                  <strong>{i.name}</strong>
                  <span>
                    {money(i.price)}
                    {i.color && ` · ${i.color}`}
                  </span>
                  <div className="qty">
                    <button onClick={() => onQty(i.key, -1)} aria-label="Decrease"><Minus size={13} /></button>
                    <span>{i.qty}</span>
                    <button onClick={() => onQty(i.key, 1)} aria-label="Increase"><Plus size={13} /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-foot">
          <div className="drawer-total">
            <span>Estimated total</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="muted small">We'll confirm availability and final pricing on WhatsApp.</p>
          {items.length ? (
            <a
              className="btn btn-green block"
              href={listEnquiry(items, total)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={17} /> Send enquiry on WhatsApp
            </a>
          ) : (
            <button className="btn btn-green block" disabled>
              <WhatsAppIcon size={17} /> Send enquiry on WhatsApp
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
