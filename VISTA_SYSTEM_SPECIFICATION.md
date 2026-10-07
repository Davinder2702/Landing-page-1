# Vista Electronics — Full Stack & Multi-Device Responsive Specification

This document provides a comprehensive technical, responsive UI, and backend architecture specification for **Vista Electronics** (`LP1`). It is designed to serve as an authoritative blueprint for frontend, backend, and full-stack engineering teams to build the complete backend service, RESTful APIs, database schema, responsive layouts, and business logic.

---

## 📑 Table of Contents

1. [System Architecture & Scope](#1-system-architecture--scope)
2. [Responsive Multi-Device UI Specifications (Web, Tablet, Mobile)](#2-responsive-multi-device-ui-specifications-web-tablet-mobile)
3. [Database Schema & Data Models](#3-database-schema--data-models)
4. [API Endpoints Specification](#4-api-endpoints-specification)
5. [Business Logic & WhatsApp Enquiry Generators](#5-business-logic--whatsapp-enquiry-generators)
6. [State Management & Routing Synchronization](#6-state-management--routing-synchronization)
7. [Verification & System Alignment Checklist](#7-verification--system-alignment-checklist)

---

## 1. System Architecture & Scope

### 1.1 Core Purpose
Vista is a modern, high-trust consumer electronics storefront that features clean category navigation, instant product search/sorting, a wishlist system, and a hybrid checkout model centered around **WhatsApp Enquiry Lists** and direct order requests.

### 1.2 System Tech Stack
- **Frontend Framework**: React 19 + Vite 8
- **UI & Icons**: Tailwind CSS / CSS Modules + Lucide React
- **Target Backend Architecture**: Node.js / Express or Python / FastAPI or Go
- **Target Database**: PostgreSQL 15+ (Relational Model)
- **Cache Layer**: Redis (for session cart state and product catalog caching)

---

## 2. Responsive Multi-Device UI Specifications (Web, Tablet, Mobile)

### 2.1 Viewport Breakpoints & Grids

| Device Category | Breakpoint Range | Max Container Width | Grid Columns (Products) | Navigation Mode |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop / Laptop** | `≥ 1024px` | `1320px` | 4 Columns (`repeat(4, 1fr)`) | Expanded Horizontal Header |
| **Tablet** | `768px – 1023px` | `100% (with 20px pad)` | 2 or 3 Columns (`repeat(3, 1fr)`) | Compact Nav + Menu Drawer |
| **Mobile** | `< 768px` | `100% (with 16px pad)` | 1 Column Grid / Stacked | Hamburger Toggle + Bottom Sheet |

---

### 2.2 Component-by-Component Responsiveness Guide

#### 1. Header & Navigation ([`Navbar.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/Navbar.jsx))
- **Desktop (`≥ 1024px`)**:
  - Displays left-aligned logo with vertical divider leading to inline horizontal navigation links (`Home`, `About`, `Shop` dropdown).
  - Right action cluster: `Contact` link, Search button, Wishlist icon button with badge (`wishCount`), Shopping bag enquiry list button with badge (`cartCount`).
- **Tablet & Mobile (`< 1024px`)**:
  - Nav links collapse into a vertical drop-down or slide-over drawer triggered by the hamburger icon (`menu-btn`).
  - Search, Wishlist, and Cart badges remain accessible in the top-right toolbar.
  - Interactive badges update dynamically whenever items are added/removed.

#### 2. Hero Banner ([`Hero.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/Hero.jsx))
- **Desktop**:
  - Rounded container (`border-radius: 22px`), minimum height `min(720px, 88vh)`, rich green brand background (`#2f4630`) overlaid with Unsplash focal image (`HERO_IMAGE`).
  - Hero text features desktop break tags (`br-desktop`) for line wrapping:
    > "Built for people who rely on their tech."
- **Mobile & Tablet**:
  - Minimum height scales down (`~360px – 480px`). Text scales dynamically via `clamp(28px, 3.4vw, 42px)`.
  - CTA button (`Shop Collection`) extends to fill accessible tap area (minimum 44px touch target).

#### 3. Category Grid ([`Categories.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/Categories.jsx))
- **Desktop**: Grid layout (`repeat(auto-fit, minmax(200px, 1fr))`) displaying 6 category cards (`Audio`, `Wearables`, `Computing`, `Phones`, `Cameras`, `Accessories`).
- **Tablet**: 3 columns x 2 rows.
- **Mobile**: 2 columns x 3 rows. Hover effect transitions to tap feedback (`:active` scaling).

#### 4. Products Section & Toolbar ([`Products.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/Products.jsx))
- **Toolbar Layout**:
  - **Category Chips**: Horizontal chip scroll bar with `overflow-x: auto` on mobile. Active category chip gets active styling (`.active`).
  - **Sorting Dropdown**: Options for `Featured` (`id ASC`), `Price: Low to High`, `Price: High to Low`.
  - **View Toggle**: Switches product layout between `Grid View` (`LayoutGrid`) and `List View` (`List`).
- **Product Card ([`ProductCard.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/ProductCard.jsx))**:
  - Displays product tag badge (`Bestseller`, `New`, `Sale`, `Popular`, `Hot`).
  - Heart icon button to toggle wishlist state.
  - Price display with current price and optional struck-through `oldPrice`.
  - Dual CTAs: `+ Add to enquiry` (adds to cart drawer) and `WhatsApp Enquire` (opens direct WhatsApp link).

#### 5. Product Detail View (`#/product/:id`) ([`ProductDetail.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/ProductDetail.jsx))
- **Desktop**: 2-column layout.
  - Left column: Main image viewer with 4 Unsplash focal point thumbnails (`galleryFor`).
  - Right column: Breadcrumb trail, category eyebrow, title, pricing + savings callout (`Save $X`), description lead, color swatches (`Sage`, `Graphite`, `Chalk`), quantity selector (`-`, `qty`, `+`), `Add to enquiry` button, `Wishlist` heart, primary WhatsApp button (`Enquire on WhatsApp · $Total`), 3-key perks (`Free delivery over $99`, `2-year warranty`, `30-day returns`), and tabbed specifications (`Details`, `Specifications`, `Shipping & returns`).
- **Mobile**: Stacked single-column layout. Thumbnails render in a horizontal scroll row below the main image. Sticky CTA actions at the bottom of the screen.

#### 6. Cart Drawer (Enquiry List) ([`CartDrawer.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/CartDrawer.jsx))
- Slide-over drawer (380px – 420px width on desktop; 100% full width on mobile).
- Backdrop blur overlay with `Escape` key listener.
- Lists enquiry items with thumbnail, product title, unit price, selected color, and inline quantity increment/decrement buttons (`-`, `qty`, `+`).
- Displays total estimated price and a primary green CTA: `Send enquiry on WhatsApp`.

---

## 3. Database Schema & Data Models

Below is the relational SQL schema (PostgreSQL dialect) required to back the Vista Electronics storefront.

```sql
-- 1. CATEGORIES TABLE
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    product_count INT DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    old_price NUMERIC(10, 2) NULL,
    tag VARCHAR(50) NULL, -- 'Bestseller', 'New', 'Sale', 'Popular', 'Hot'
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCT COLOR SWATCHES
CREATE TABLE product_colors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- e.g., 'Sage', 'Graphite', 'Chalk'
    hex_value VARCHAR(10) NOT NULL, -- e.g., '#6f906b', '#2b2e2b', '#e9e7e1'
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. PRODUCT SPECIFICATIONS TABLE
CREATE TABLE product_specs (
    id SERIAL PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
    spec_key VARCHAR(100) NOT NULL, -- e.g., 'Connectivity', 'Battery life'
    spec_value VARCHAR(255) NOT NULL, -- e.g., 'Bluetooth 5.3, multipoint'
    display_order INT DEFAULT 0
);

-- 5. ENQUIRIES TABLE (Track customer enquiry submissions)
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    enquiry_code VARCHAR(36) UNIQUE NOT NULL,
    customer_phone VARCHAR(30) NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'completed', 'cancelled'
    whatsapp_payload TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ENQUIRY ITEMS TABLE
CREATE TABLE enquiry_items (
    id SERIAL PRIMARY KEY,
    enquiry_id INT REFERENCES enquiries(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    color VARCHAR(50) NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);
```

---

## 4. API Endpoints Specification

### 4.1 Catalogue & Products API

#### `GET /api/v1/categories`
Returns all active categories with product counts.
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    { "id": "audio", "name": "Audio", "count": 48 },
    { "id": "wearables", "name": "Wearables", "count": 32 },
    { "id": "computing", "name": "Computing", "count": 26 },
    { "id": "phones", "name": "Phones", "count": 19 },
    { "id": "cameras", "name": "Cameras", "count": 14 },
    { "id": "accessories", "name": "Accessories", "count": 57 }
  ]
}
```

#### `GET /api/v1/products`
Fetch product list with filtering and sorting.
- **Query Parameters**:
  - `category` (optional): `all` | `audio` | `wearables` | `computing` | `phones` | `cameras` | `accessories`
  - `sort` (optional): `featured` | `low` | `high`
- **Response `200 OK`**:
```json
{
  "success": true,
  "total": 12,
  "data": [
    {
      "id": 1,
      "name": "Aura Over-Ear Headphones",
      "category": "audio",
      "price": 249,
      "oldPrice": 299,
      "tag": "Bestseller",
      "description": "Adaptive noise cancelling with 40-hour battery and plush memory-foam cushions.",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    }
  ]
}
```

#### `GET /api/v1/products/:id`
Fetch single product details including specs and gallery image URLs.
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Aura Over-Ear Headphones",
    "category": "audio",
    "price": 249,
    "oldPrice": 299,
    "tag": "Bestseller",
    "description": "Adaptive noise cancelling with 40-hour battery and plush memory-foam cushions.",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&h=1000&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&h=1000&q=80&crop=focalpoint&fp-x=0.35&fp-y=0.45&fp-z=1.8"
    ],
    "specs": [
      ["Connectivity", "Bluetooth 5.3, multipoint"],
      ["Battery life", "Up to 40 hours"],
      ["Charging", "USB-C, 10 min = 5 hours"],
      ["Weight", "250 g"]
    ],
    "related": [2, 8, 10]
  }
}
```

---

### 4.2 Enquiry & WhatsApp Integration API

#### `POST /api/v1/enquiries/single`
Creates an enquiry log for a single product and returns the generated WhatsApp link.
- **Request Body**:
```json
{
  "productId": 1,
  "color": "Sage",
  "quantity": 1
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "enquiryId": "ENQ-2026-9812",
  "whatsappUrl": "https://wa.me/?text=Hi!%20I%27d%20like%20to%20enquire%20about%20the%20Aura%20Over-Ear%20Headphones.%0A%0AColour%3A%20Sage%0AQuantity%3A%201%0APrice%3A%20%24249%0ALink%3A%20http%3A%2F%2Flocalhost%3A5173%2F%23%2Fproduct%2F1"
}
```

#### `POST /api/v1/enquiries/cart`
Creates a bulk enquiry log for cart items and returns the generated WhatsApp link.
- **Request Body**:
```json
{
  "items": [
    { "productId": 1, "color": "Sage", "quantity": 1, "unitPrice": 249 },
    { "productId": 3, "color": "Graphite", "quantity": 2, "unitPrice": 199 }
  ]
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "enquiryId": "ENQ-2026-4419",
  "totalAmount": 647,
  "whatsappUrl": "https://wa.me/?text=Hi!%20I%27d%20like%20to%20enquire%20about%20these%20products%3A%0A%0A1.%20Aura%20Over-Ear%20Headphones%20(Sage)%20%C3%97%201%20%E2%80%94%20%24249%0A...%0AEstimated%20total%3A%20%24647"
}
```

---

## 5. Business Logic & WhatsApp Enquiry Generators

The backend must replicate the exact formatting logic defined in the frontend codebase:

### 5.1 Currency Formatter
```javascript
const money = (n) => `$${n.toLocaleString()}`;
```

### 5.2 Single Product WhatsApp Message Format
Matches [`ProductCard.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/ProductCard.jsx) line 7-19:
```javascript
const singleEnquiryText = (product, { qty = 1, color = null } = {}) => {
  const lines = [
    `Hi! I'd like to enquire about the ${product.name}.`,
    '',
    color ? `Colour: ${color}` : null,
    `Quantity: ${qty}`,
    `Price: ${money(product.price)}`,
    `Link: ${productUrl(product.id)}`,
  ].filter(Boolean);
  return lines.join('\n');
};
```

### 5.3 Bulk Cart WhatsApp Message Format
Matches [`CartDrawer.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/CartDrawer.jsx) line 7-19:
```javascript
const listEnquiryText = (items, total) => {
  const itemLines = items.map((item, index) => 
    `${index + 1}. ${item.name}${item.color ? ` (${item.color})` : ''} × ${item.qty} — ${money(item.price * item.qty)}\n   ${productUrl(item.id)}`
  );

  return [
    "Hi! I'd like to enquire about these products:",
    '',
    ...itemLines,
    '',
    `Estimated total: ${money(total)}`
  ].join('\n');
};
```

---

## 6. State Management & Routing Synchronization

The application relies on a lightweight hash routing system ([`App.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/App.jsx)):

```javascript
const parseRoute = () => {
  const match = window.location.hash.match(/^#\/product\/(\d+)/);
  return match ? { page: 'product', id: Number(match[1]) } : { page: 'home' };
};
```

- **Route Rules**:
  - `#/product/:id` -> Loads `ProductDetail` component for the given product ID and scrolls to top (`window.scrollTo({ top: 0 })`).
  - `#` or `#shop` or `#categories` or `#about` or `#contact` -> Loads `Home` view and smoothly scrolls to the element with matching ID.

---

## 7. Verification & System Alignment Checklist

| Feature | Code File Reference | Backend / Spec Alignment Status |
| :--- | :--- | :--- |
| **Product Data Structure** | [`src/data.js`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/data.js#L15-L76) | Verified (12 Products, 6 Categories, 3 Colors) |
| **Category Definitions** | [`src/data.js`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/data.js#L6-L13) | Verified (`audio`, `wearables`, `computing`, `phones`, `cameras`, `accessories`) |
| **Single Item WhatsApp** | [`src/components/ProductCard.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/ProductCard.jsx#L7-L19) | Verified (Message template matched) |
| **Cart Drawer WhatsApp** | [`src/components/CartDrawer.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/components/CartDrawer.jsx#L7-L19) | Verified (Multi-item formatting matched) |
| **Responsive Grid & CSS** | [`src/index.css`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/index.css) | Verified (Breakpoints `1024px`, `768px`, `480px`) |
| **Hash Router Contract** | [`src/App.jsx`](file:///c:/Users/davin/OneDrive/Documents/Vista/LP1/src/App.jsx#L12-L15) | Verified (`#/product/:id` hash route regex) |
