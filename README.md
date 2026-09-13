# Kurinji Maligai

A modern, fast, and responsive department store website for **Kurinji Maligai**, your trusted neighbourhood grocery and daily essentials store in Akkur, Tamil Nadu.

---

## About

**Kurinji Maligai** is a department and grocery store website designed to showcase a wide range of daily household products and farm supplies, allowing customers to easily browse catalog items and contact the store directly through **WhatsApp** and **phone calls**. 

Because grocery prices change frequently with market stock, the website focuses on displaying available products, featured categories, and generating instant customer enquiries rather than online payment checkout.

---

## Features

- **Product Showcase & Catalog**: Rich categorized catalogue covering Grocery & Staples, Cooking Oils, Farm Fresh Dairy, Cold Drinks & Sodas, Daily Household Essentials, and Cow Ropes & Farm Supplies.
- **Interactive WhatsApp Order List**: Customers can tap to add items into an order list with custom quantities and send their order enquiry straight to the store's WhatsApp in one click.
- **Instant Call & Directions**: One-tap direct phone calling and Google Maps navigation to the physical store in Akkur.
- **Live Search & Filter**: Fast, debounced real-time product search with department category filters.
- **Store Branding**: Dedicated emblem badge, brand motto, and community trust stats.
- **Mobile-First Responsive Design**: Optimized UI layout for mobile devices, tablets, desktop monitors, and Smart TVs.
- **Store Hours & Contact Information**: Clear schedule showing daily opening hours (6:30 AM – 10:30 PM, open every day).
- **Fast Static Performance**: Built on Vite and Tailwind CSS for instant page loads and zero layout shift.
- **Security & Privacy**: Content Security Policy (CSP), spam-protected cart logic, and XSS-safe external links.

---

## Technology Stack

- **React 19** – UI library for declarative, reactive components
- **TypeScript 5.7** – Type-safe application development
- **Vite 8** – Lightning-fast build tool and development server
- **Tailwind CSS v4** – Modern utility-first CSS styling engine
- **Google Fonts** – *Plus Jakarta Sans* and *Playfair Display* typography
- **Vercel** – Optimized production cloud hosting platform

---

## Project Structure

```text
kurinji-maligai/
├── public/                     # Static public assets served directly
│   ├── logo.png                # Official Kurinji Maligai store logo (PNG)
│   ├── logo.jpg                # Original high-res store emblem (JPEG)
│   └── favicon.png             # Browser tab favicon (64x64 PNG)
├── src/                        # Source code
│   ├── assets/                 # Local source assets
│   │   ├── logo.png            # PNG logo asset
│   │   └── logo.jpg            # Original logo asset
│   ├── App.tsx                 # Main application UI and catalog state
│   ├── main.tsx                # React root mount entry point
│   ├── index.css               # Global styles, fonts, and Tailwind setup
│   └── vite-env.d.ts           # Vite TypeScript definitions
├── .env.example                # Safe environment variable configuration template
├── .gitattributes              # Git LFS tracking rules for binary assets
├── .gitignore                  # Production Git ignore rules
├── index.html                  # HTML entry shell with SEO & Open Graph meta
├── package.json                # Project dependencies and npm/pnpm scripts
├── pnpm-lock.yaml              # Exact dependency lockfile
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite plugins and build configuration
└── README.md                   # Repository documentation
```

---

## Installation

Clone the repository and install dependencies using your preferred package manager:

```bash
# Clone the repository
git clone https://github.com/sheiksaf23-lab/kurinji-maligai.git

# Navigate into the project folder
cd kurinji-maligai

# Install dependencies using pnpm (recommended)
pnpm install

# Alternatively, using npm:
# npm install
```

---

## Development

Start the local development server with Hot Module Replacement (HMR):

```bash
# Using pnpm
pnpm run dev

# Using npm
# npm run dev
```

Open [http://localhost:8443](http://localhost:8443) (or the port displayed in your terminal) in your browser to view the site.

---

## Build

Compile and bundle the project for production:

```bash
# Using pnpm
pnpm run build

# Using npm
# npm run build
```

Production output will be generated in the `dist/` directory, ready to deploy to any static host.

---

## Deployment to Vercel

The project is pre-configured and 100% ready for one-click deployment on **Vercel**:

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** and select **"Import Git Repository"**.
3. Choose your GitHub repository `sheiksaf23-lab/kurinji-maligai`.
4. Vercel will automatically detect **Vite** as the framework:
   - **Build Command**: `pnpm run build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install` (or `npm install`)
5. Click **"Deploy"**. Your website will be live in under 60 seconds with a free `.vercel.app` domain and automatic HTTPS SSL certificate.

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy directly from your terminal
vercel
```

---

## Environment Variables

No private secrets or database credentials are required for this project. If you wish to customize runtime URLs or contact details, see `.env.example`:

```bash
cp .env.example .env
```

---

## Contact & Store Enquiries

For any store enquiries, orders, or product availability checks:

- **Store Name**: Kurinji Maligai Department Store
- **Phone**: `8056348053`
- **WhatsApp**: `+91 8056348053`
- **Address**: 1/280-2, Sarbunisha Complex, Akkur, Udayayarkoil Pathy, Tamil Nadu 609301
- **Opening Hours**: Monday – Sunday, 6:30 AM – 10:30 PM (Open Every Day)
- **Google Maps**: [View Location on Maps](https://www.google.com/maps/search/?api=1&query=1/280-2,+Sarbunisha+Complex,+Akkur,+Udayayarkoil+Pathy,+Tamil+Nadu+609301)

---

## License

This project is licensed for the exclusive business operations and promotional use of **Kurinji Maligai Department Store**. All trademarks and brand assets belong to their respective owners.
