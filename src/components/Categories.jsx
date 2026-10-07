import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data.js';

export default function Categories({ onPick }) {
  return (
    <section className="section" id="categories">
      <div className="section-head">
        <div>
          <span className="eyebrow">Categories</span>
          <h2>Shop by category</h2>
        </div>
        <p className="muted">Everything you need, thoughtfully organised.</p>
      </div>

      <div className="category-grid">
        {categories.map((c) => (
          <button key={c.id} className="category-card" onClick={() => onPick(c.id)}>
            <span className="category-arrow"><ArrowUpRight size={15} /></span>
            <div>
              <h3>{c.name}</h3>
              <span className="category-count">{c.count} products</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
