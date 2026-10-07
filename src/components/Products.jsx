import { useMemo, useState } from 'react';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';
import { categories, products } from '../data.js';
import ProductCard from './ProductCard.jsx';

const sorts = {
  featured: { label: 'Featured', fn: (a, b) => a.id - b.id },
  low: { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
};

export default function Products({ category, setCategory, onAdd, wishlist, onWish }) {
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('featured');

  const visible = useMemo(
    () =>
      products
        .filter((p) => category === 'all' || p.category === category)
        .sort(sorts[sort].fn),
    [category, sort],
  );

  return (
    <section className="section" id="shop">
      <div className="section-head">
        <div>
          <span className="eyebrow">Shop</span>
          <h2>Latest arrivals</h2>
        </div>
      </div>

      <div className="toolbar">
        <div className="chips">
          {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
            <button
              key={c.id}
              className={`chip ${category === c.id ? 'active' : ''}`}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="toolbar-right">
          <span className="muted small">{visible.length} items</span>
          <label className="select">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </label>
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              className={view === 'grid' ? 'active' : ''}
              onClick={() => setView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={`products ${view}`} key={`${view}-${category}`}>
        {visible.map((p, i) => (
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
  );
}
