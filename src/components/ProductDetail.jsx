import { useState } from 'react';
import {
  ArrowLeft, ChevronRight, Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw,
} from 'lucide-react';
import { categories, colors, products, specs } from '../data.js';
import ProductCard, { money, singleEnquiry } from './ProductCard.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';

// Unsplash (imgix) focal-point crops give us extra "angles" from one photo.
const galleryFor = (image) => {
  const base = `${image.split('?')[0]}?auto=format&fit=crop&w=1000&h=1000&q=80`;
  return [
    base,
    `${base}&crop=focalpoint&fp-x=0.35&fp-y=0.45&fp-z=1.8`,
    `${base}&crop=focalpoint&fp-x=0.65&fp-y=0.55&fp-z=1.8`,
    `${base}&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=2.6`,
  ];
};

const perks = [
  { icon: Truck, text: 'Free delivery on orders over $99' },
  { icon: ShieldCheck, text: '2-year warranty included' },
  { icon: RotateCcw, text: '30-day free returns' },
];

export default function ProductDetail({ id, onAdd, wishlist, onWish }) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(colors[0].name);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="section detail-missing">
        <h2>Product not found</h2>
        <a href="#shop" className="btn btn-dark"><ArrowLeft size={15} /> Back to shop</a>
      </section>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const gallery = galleryFor(product.image);
  const wished = wishlist.has(product.id);
  const related = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 4);

  const tabs = {
    details: (
      <div className="detail-copy">
        <p>{product.description}</p>
        <p>
          Designed to disappear into your day, the {product.name} pairs considered materials with
          dependable performance. Every unit is sourced directly from the manufacturer and backed
          by our standard warranty.
        </p>
      </div>
    ),
    specs: (
      <dl className="spec-list">
        {specs[product.category].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    ),
    shipping: (
      <div className="detail-copy">
        <p>Orders placed before 2pm ship the same day. Standard delivery takes 2–4 business days and is free over $99.</p>
        <p>Changed your mind? Return it within 30 days in its original packaging for a full refund.</p>
      </div>
    ),
  };

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="#">Home</a>
        <ChevronRight size={13} />
        <a href="#shop">Shop</a>
        <ChevronRight size={13} />
        <span>{category?.name}</span>
        <ChevronRight size={13} />
        <span className="current">{product.name}</span>
      </nav>

      <section className="detail">
        <div className="gallery">
          <div className="gallery-main">
            {gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? product.name : ''}
                className={i === active ? 'show' : ''}
              />
            ))}
            {product.tag && <span className={`tag tag-${product.tag.toLowerCase()}`}>{product.tag}</span>}
          </div>
          <div className="gallery-thumbs">
            {gallery.map((src, i) => (
              <button
                key={src}
                className={i === active ? 'active' : ''}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src.replace('w=1000&h=1000', 'w=240&h=240')} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <span className="eyebrow">{category?.name}</span>
          <h1>{product.name}</h1>

          <div className="price detail-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && (
              <>
                <s>{money(product.oldPrice)}</s>
                <span className="save">Save {money(product.oldPrice - product.price)}</span>
              </>
            )}
          </div>

          <p className="detail-lead">{product.description}</p>

          <div className="option">
            <span className="option-label">Colour <strong>{color}</strong></span>
            <div className="swatches">
              {colors.map((c) => (
                <button
                  key={c.name}
                  className={`swatch ${color === c.name ? 'active' : ''}`}
                  style={{ '--swatch': c.value }}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <div className="qty qty-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={15} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus size={15} /></button>
            </div>
            <button className="btn detail-add-list" onClick={() => onAdd(product, qty, color)}>
              <Plus size={16} /> Add to enquiry
            </button>
            <button
              className={`wish-lg ${wished ? 'on' : ''}`}
              onClick={() => onWish(product.id)}
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>
          <a
            className="btn btn-green block detail-wa"
            href={singleEnquiry(product, { qty, color })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> Enquire on WhatsApp · {money(product.price * qty)}
          </a>

          <ul className="perks">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text}><Icon size={16} /> {text}</li>
            ))}
          </ul>

          <div className="tabs" role="tablist">
            {[['details', 'Details'], ['specs', 'Specifications'], ['shipping', 'Shipping & returns']].map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                className={tab === k ? 'active' : ''}
                onClick={() => setTab(k)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="tab-panel" key={tab}>{tabs[tab]}</div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">You may also like</span>
            <h2>Related products</h2>
          </div>
          <a href="#shop" className="btn btn-dark">View all</a>
        </div>
        <div className="products grid">
          {related.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onAdd={onAdd}
              wished={wishlist.has(p.id)}
              onWish={onWish}
            />
          ))}
        </div>
      </section>
    </>
  );
}
