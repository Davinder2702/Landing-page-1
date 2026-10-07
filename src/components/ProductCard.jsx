import { Heart, Plus } from 'lucide-react';
import { categories, productUrl, whatsappLink } from '../data.js';
import WhatsAppIcon from './WhatsAppIcon.jsx';

export const money = (n) => `$${n.toLocaleString()}`;

export const singleEnquiry = (p, { qty = 1, color } = {}) =>
  whatsappLink(
    [
      `Hi! I'd like to enquire about the ${p.name}.`,
      '',
      color && `Colour: ${color}`,
      `Quantity: ${qty}`,
      `Price: ${money(p.price)}`,
      `Link: ${productUrl(p.id)}`,
    ]
      .filter((line) => line !== undefined && line !== null && line !== false)
      .join('\n'),
  );

export default function ProductCard({ product: p, index = 0, onAdd, wished, onWish }) {
  const href = `#/product/${p.id}`;

  return (
    <article className="product" style={{ '--i': index }}>
      <div className="product-img">
        <a href={href} aria-label={p.name}>
          <img src={p.image} alt={p.name} loading="lazy" />
        </a>
        {p.tag && <span className={`tag tag-${p.tag.toLowerCase()}`}>{p.tag}</span>}
        <button
          className={`wish ${wished ? 'on' : ''}`}
          onClick={() => onWish(p.id)}
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="product-body">
        <div className="product-info">
          <span className="product-cat">
            {categories.find((c) => c.id === p.category)?.name}
          </span>
          <h3><a href={href}>{p.name}</a></h3>
          <p className="product-desc">{p.description}</p>
        </div>

        <div className="product-foot">
          <div className="price">
            <strong>{money(p.price)}</strong>
            {p.oldPrice && <s>{money(p.oldPrice)}</s>}
          </div>
          <div className="product-actions">
            <button className="add-btn" onClick={() => onAdd(p)} aria-label="Add to enquiry list">
              <Plus size={15} />
              <span>Add to enquiry</span>
            </button>
            <a
              className="wa-btn"
              href={singleEnquiry(p)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${p.name} on WhatsApp`}
            >
              <WhatsAppIcon size={15} />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
