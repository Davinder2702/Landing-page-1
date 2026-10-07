import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data.js';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={HERO_IMAGE} alt="" />
        <div className="hero-tint" />
        <div className="hero-shade" />
      </div>

      <div className="hero-lines" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="hero-content">
        <h1>
          Built for people who
          <br className="br-desktop" />
          rely on their tech.
        </h1>
        <p>
          Find the right technology with clear choices and a
          <br className="br-desktop" /> shopping experience you can trust.
        </p>
      </div>

      <a href="#shop" className="btn btn-light hero-cta">
        Shop Collection <ArrowRight size={15} />
      </a>
    </section>
  );
}
