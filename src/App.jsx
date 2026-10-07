import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';

// Minimal hash router: "#/product/3" opens a product, anything else is the home page
// (so plain anchors like "#shop" keep working).
const parseRoute = () => {
  const m = window.location.hash.match(/^#\/product\/(\d+)/);
  return m ? { page: 'product', id: Number(m[1]) } : { page: 'home' };
};

export default function App() {
  const [route, setRoute] = useState(parseRoute);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (route.page === 'product') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const anchor = window.location.hash.slice(1);
      if (anchor) document.getElementById(anchor)?.scrollIntoView();
    }
  }, [route]);

  // Enquiry list: the same product in a different colour is a separate line.
  const addToCart = (product, qty = 1, color = null) => {
    const key = `${product.id}-${color ?? ''}`;
    setCart((items) => {
      const found = items.find((i) => i.key === key);
      if (found) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...items, { ...product, key, color, qty }];
    });
    setCartOpen(true);
  };

  const updateQty = (key, delta) =>
    setCart((items) =>
      items
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );

  const toggleWish = (id) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const pickCategory = (id) => {
    setCategory(id);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const isHome = route.page === 'home';

  return (
    <>
      <div className="page">
        <header className={`hero-wrap ${isHome ? '' : 'compact'}`}>
          <Navbar cartCount={cartCount} wishCount={wishlist.size} onCart={() => setCartOpen(true)} />
          {isHome && <Hero />}
        </header>
        <main>
          {isHome ? (
            <>
              <Categories onPick={pickCategory} />
              <Products
                category={category}
                setCategory={setCategory}
                onAdd={addToCart}
                wishlist={wishlist}
                onWish={toggleWish}
              />
            </>
          ) : (
            <ProductDetail
              key={route.id}
              id={route.id}
              onAdd={addToCart}
              wishlist={wishlist}
              onWish={toggleWish}
            />
          )}
        </main>
        <Footer />
      </div>
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={updateQty}
      />
    </>
  );
}
