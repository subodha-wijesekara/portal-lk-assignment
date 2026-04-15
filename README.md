# FashionHub — Product Details Flow

A mobile-responsive e-commerce product detail flow built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **MongoDB** (Mongoose).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript 5 |
| Database | MongoDB Atlas via Mongoose |
| Icons | lucide-react |
| Images | Unsplash CDN |

---

## Features

- **Splash / Welcome screen** — matches Figma landing design  
- **Explore screen** — product grid with category filter tabs (All / Men / Women / Kids / Other)  
- **Product Detail screen** — product image, size selector, color swatches, price, Add to Cart  
- **Cart ("My Orders")** — full cart with quantity, remove, and summary  
- **Checkout** — delivery address, payment method selector, voucher input, Pay Now  
- **Order confirmation** — displays generated orderId after simulated payment success  

---

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products (auto-seeds on first call) |
| GET | `/api/products?category=Men` | Filter by category |
| GET | `/api/products/:id` | Single product detail |
| GET | `/api/cart` | Get cart for mock user |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart?productId=...&selectedSize=...&colorName=...` | Remove item |
| POST | `/api/orders` | Create order from cart, simulates payment success |
| GET | `/api/orders` | List orders for mock user |

---

## Run Locally

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
MOCK_USER_ID=test-user-001
```

### 4. Seed the database

**No manual step needed.** The database is auto-seeded when you first hit `GET /api/products`.  
You can also trigger it manually:

```bash
curl http://localhost:3000/api/products
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build for Production

```bash
npm run build
npm run start
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Add environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `MOCK_USER_ID`
4. Deploy.

---

## Authentication

A **mock/seeded user** system is used. All cart and order routes operate under the `MOCK_USER_ID` environment variable (`test-user-001` by default). Full OAuth is not implemented — this satisfies the "simple session or mock auth" requirement.

---

## Decisions & Shortcuts

| Decision | Reason |
|----------|--------|
| Tailwind v4 via `@import "tailwindcss"` | Installed version by create-next-app is v4 |
| `unoptimized` on `<Image>` for Unsplash | Avoids paid image optimization quota on Vercel |
| In-memory Mongoose connection cache | Prevents multiple connections across hot reloads in dev |
| Auto-seeding on first API call | No separate seed script needed — zero setup friction |
| Static mock userId | Satisfies "simple auth" requirement without full OAuth |
| `params` awaited as Promise | Required by Next.js 16 breaking change |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── products/route.ts       # GET /api/products
│   │   ├── products/[id]/route.ts  # GET /api/products/:id
│   │   ├── cart/route.ts           # GET/POST/DELETE /api/cart
│   │   └── orders/route.ts         # GET/POST /api/orders
│   ├── explore/page.tsx            # Product listing
│   ├── products/[id]/
│   │   ├── page.tsx                # Server component (fetch + metadata)
│   │   └── ProductDetailClient.tsx # Client component (interactions)
│   ├── cart/page.tsx               # Cart / My Orders
│   ├── checkout/page.tsx           # Checkout + order creation
│   ├── search/page.tsx
│   ├── settings/page.tsx
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Tailwind v4 + custom styles
├── components/
│   ├── BottomNav.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── db.ts                       # MongoDB connection
│   └── seed.ts                     # Seed product data
├── models/
│   ├── Product.ts
│   ├── Cart.ts
│   └── Order.ts
└── types/
    └── index.ts                    # Shared TypeScript interfaces
```
