import { useState, useEffect, useRef, useCallback } from "react";
import logo from "./assets/logo.jpg";

const PHONE = "8056348053";
const WA_NUMBER = "918056348053";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const CALL_LINK = `tel:+${WA_NUMBER}`;
const STORE_ADDRESS = "1/280-2, Sarbunisha Complex, Akkur, Udayayarkoil Pathy, Tamil Nadu 609301";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=1/280-2,+Sarbunisha+Complex,+Akkur,+Udayayarkoil+Pathy,+Tamil+Nadu+609301";

/* ── Categories Data (Products without price) ── */
const categories = [
  {
    id: "grocery",
    label: "Grocery & Staples",
    icon: "🛒",
    color: "from-emerald-700 to-green-600",
    light: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    img: "photo-1568626913161-c4ac1e5ae186",
    products: [
      { name: "Basmati Rice 5kg", tag: "Best Quality" },
      { name: "Toor Dal 1kg", tag: "Fresh Crop" },
      { name: "Tata Salt 1kg", tag: "Essential" },
      { name: "Chakra Gold Tea 250g", tag: "Top Seller" },
      { name: "Aashirvaad Atta 5kg", tag: "Pure Whole Wheat" },
      { name: "Sugar 1kg", tag: "Fine Crystal" },
    ],
  },
  {
    id: "oils",
    label: "Cooking Oils",
    icon: "🫙",
    color: "from-amber-600 to-yellow-500",
    light: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    img: "photo-1552592074-ea7a91b851b3",
    products: [
      { name: "Sunflower Oil 1L", tag: "Popular" },
      { name: "Groundnut Oil 1L", tag: "Traditional Cold Pressed" },
      { name: "Coconut Oil 500ml", tag: "Pure & Aromatic" },
      { name: "Gold Winner Oil 1L", tag: "Top Brand" },
      { name: "Sesame Oil 500ml", tag: "Gingelly Oil" },
      { name: "Mustard Oil 1L", tag: "Kachi Ghani" },
    ],
  },
  {
    id: "dairy",
    label: "Dairy Products",
    icon: "🥛",
    color: "from-sky-600 to-blue-500",
    light: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    img: "photo-1550583724-b2692b85b150",
    products: [
      { name: "Fresh Curd 500g", tag: "Daily Fresh" },
      { name: "Fresh Milk 500ml", tag: "Farm Fresh" },
      { name: "Amul Butter 100g", tag: "Salted Butter" },
      { name: "Pure Ghee 500ml", tag: "Rich Aroma" },
      { name: "Fresh Paneer 200g", tag: "Soft & Fresh" },
      { name: "Cold Spiced Milk 200ml", tag: "Chilled Special" },
    ],
  },
  {
    id: "sodas",
    label: "Cold Drinks & Sodas",
    icon: "🥤",
    color: "from-purple-600 to-violet-500",
    light: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    img: "photo-1625865019554-220ea80ea813",
    products: [
      { name: "Coca-Cola 2L", tag: "Chilled" },
      { name: "Pepsi 750ml", tag: "Refreshing" },
      { name: "Sprite 2L", tag: "Clear Lime" },
      { name: "Maaza Mango 1.2L", tag: "Real Pulp" },
      { name: "Bovento Soda 1.5L", tag: "Local Favorite" },
      { name: "Thums Up 2L", tag: "Strong Taste" },
    ],
  },
  {
    id: "essentials",
    label: "Daily Essentials",
    icon: "🧴",
    color: "from-teal-600 to-emerald-500",
    light: "from-teal-50 to-emerald-50",
    border: "border-teal-200",
    img: "photo-1655522060985-6769176edff7",
    products: [
      { name: "Surf Excel 1kg", tag: "Top Brand" },
      { name: "Dettol Soap 3x125g", tag: "Germ Protection" },
      { name: "Colgate Toothpaste 200g", tag: "Strong Teeth" },
      { name: "Vim Dishwash Bar 300g", tag: "Degreaser" },
      { name: "Floor Cleaner Phenyl 1L", tag: "Pine Scent" },
      { name: "Cycle Agarbathi Pack", tag: "Fragrant Incense" },
    ],
  },
  {
    id: "ropes",
    label: "Cow Ropes & Farm",
    icon: "🐄",
    color: "from-lime-700 to-green-600",
    light: "from-lime-50 to-green-50",
    border: "border-lime-200",
    img: "photo-1586201375761-83865001e31c",
    products: [
      { name: "Heavy Duty Cow Rope 5m", tag: "Strong Braided" },
      { name: "Coir Rope Bundle 10m", tag: "Natural Fiber" },
      { name: "Cattle Feed Bag 50kg", tag: "High Protein" },
      { name: "Nylon Tie Rope 10m", tag: "Weatherproof" },
      { name: "Farm Sickle Tool", tag: "Forged Steel" },
      { name: "Animal Care Spray 250ml", tag: "Antiseptic" },
    ],
  },
];

/* All catalog items flattened for search */
const catalogItems = categories.flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    catId: cat.id,
    catName: cat.label,
    img: cat.img,
  }))
);

const testimonials = [
  { name: "Ravi Kumar", role: "Regular Customer", msg: "Kurinji Maligai has everything I need. Fresh dairy products every morning and high quality groceries!", stars: 5 },
  { name: "Meena Devi", role: "Loyal Customer", msg: "The cow ropes and farm supplies are excellent quality. Very trustworthy shop in our area.", stars: 5 },
  { name: "Suresh Babu", role: "Daily Visitor", msg: "Best cold drinks collection and always stocked. The owner is very helpful and honest.", stars: 5 },
];

const marqueeItems = [
  "🛒 Grocery Staples", "🫙 Cooking Oils", "🥛 Farm Fresh Dairy", "🥤 Chilled Sodas",
  "🐄 Heavy Duty Cow Ropes", "🧴 Daily Household Essentials", "🌾 Premium Rice & Pulses", "☕ Tea & Coffee",
];

const stats = [
  { value: "500+", label: "Products in Stock", icon: "📦" },
  { value: "15+", label: "Years Community Trust", icon: "🏆" },
  { value: "2000+", label: "Satisfied Families", icon: "😊" },
  { value: "6:30AM–10:30PM", label: "Open Every Day", icon: "🕐" },
];

/* ── Intersection Observer Hook ── */
function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ── Debounce Hook ── */
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/* ── WhatsApp Icon SVG ── */
function WaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grocery");
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("All");

  /* Quick WhatsApp Order Cart State */
  const [cart, setCart] = useState<{ [name: string]: { name: string; qty: number } }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /* Security: debounce search so we don't re-render on every keystroke */
  const debouncedSearch = useDebounce(searchQuery, 150);

  /* Cleanup ref for toast timeout to prevent memory leak on unmount */
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);

  /* Passive scroll listener for better performance */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock when any modal is open */
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (menuOpen || cartOpen) {
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      document.body.classList.add("body-scroll-locked");
    } else {
      document.body.classList.remove("body-scroll-locked");
      document.documentElement.style.removeProperty("--scrollbar-width");
    }
    return () => {
      document.body.classList.remove("body-scroll-locked");
    };
  }, [menuOpen, cartOpen]);

  /* Global Escape key handler – closes any open modal/drawer */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (cartOpen) setCartOpen(false);
        if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cartOpen, menuOpen]);

  /* Cleanup toast timer on unmount */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  /* Toast notification timer – uses ref so timeout is cleaned up properly */
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  /* Cart Functions with spam protection */
  const MAX_UNIQUE_ITEMS = 50;
  const MAX_QTY_PER_ITEM = 99;

  const addToCart = (name: string) => {
    setCart((prev) => {
      const existing = prev[name];
      /* Security: cap unique items at MAX_UNIQUE_ITEMS */
      if (!existing && Object.keys(prev).length >= MAX_UNIQUE_ITEMS) {
        showToast("Order list full (50 items max). Please send current list first.");
        return prev;
      }
      const newQty = existing ? Math.min(existing.qty + 1, MAX_QTY_PER_ITEM) : 1;
      return { ...prev, [name]: { name, qty: newQty } };
    });
    showToast(`Added "${name}" to your order list!`);
  };

  const updateCartQty = (name: string, delta: number) => {
    setCart((prev) => {
      const item = prev[name];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      /* Security: cap qty per item */
      return { ...prev, [name]: { ...item, qty: Math.min(newQty, MAX_QTY_PER_ITEM) } };
    });
  };

  const cartItemsArray = Object.values(cart);
  const totalCartCount = cartItemsArray.reduce((acc, item) => acc + item.qty, 0);

  const generateWhatsAppCartLink = () => {
    if (cartItemsArray.length === 0) return WA_LINK;
    let text = `Hi Kurinji Maligai! 👋 I would like to inquire / order the following items:\n\n`;
    cartItemsArray.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} x${item.qty}\n`;
    });
    text += `\nPlease confirm availability and details!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const activeCat = categories.find((c) => c.id === activeTab) || categories[0];

  /* Filtered Products for Live Search – uses debounced value to prevent over-rendering */
  const filteredCatalog = catalogItems.filter((item) => {
    const q = debouncedSearch.toLowerCase();
    const matchesSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.catName.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    const matchesCategory = selectedCatFilter === "All" || item.catName === selectedCatFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-green-50 text-slate-900 overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">

      {/* ── Toast Notification Banner ── */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-[100] max-w-sm bg-emerald-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-3 animate-bounce">
          <span className="text-xl">✅</span>
          <p className="flex-1">{toastMessage}</p>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg py-2" : "bg-gradient-to-b from-black/40 via-black/20 to-transparent py-3"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group text-left focus:outline-none">
            <img
              src={logo}
              alt="Kurinji Maligai Store Logo"
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-emerald-400 shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <p className={`font-display font-bold text-base sm:text-xl leading-tight transition-colors ${scrolled ? "text-green-950" : "text-white"}`}>
                Kurinji Maligai
              </p>
              <p className={`text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-colors ${scrolled ? "text-emerald-700" : "text-emerald-200"}`}>
                Department Store
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {["home", "products", "categories", "about", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`text-sm xl:text-base font-semibold capitalize transition-colors hover:text-emerald-400 ${
                  scrolled ? "text-green-900 hover:text-emerald-600" : "text-emerald-100 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
              title="View WhatsApp Order List"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Order List</span>
              {totalCartCount > 0 && (
                <span className="bg-amber-400 text-green-950 font-black text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Desktop WhatsApp CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <WaIcon className="w-4 h-4" /> WhatsApp
            </a>

            {/* Desktop Call CTA */}
            <a
              href={CALL_LINK}
              className="hidden lg:flex items-center gap-2 bg-white/90 hover:bg-white text-green-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              📞 Call Now
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2.5 rounded-2xl transition-colors ${
                scrolled ? "text-green-900 bg-green-100/60" : "text-white bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile & Tablet Drawer Menu Overlay ── */}
        {menuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex flex-col bg-emerald-950/95 backdrop-blur-xl text-white animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-800/50">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-300 shadow" />
                <span className="font-display font-bold text-lg">Kurinji Maligai</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-5">
              {["home", "products", "categories", "about", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-left text-xl font-bold capitalize text-emerald-100 hover:text-emerald-300 py-3 border-b border-emerald-800/40 flex items-center justify-between"
                >
                  <span>{s}</span>
                  <span className="text-emerald-500 text-sm">→</span>
                </button>
              ))}

              <div className="mt-6 space-y-3">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25d366] text-white text-base font-bold py-4 rounded-2xl shadow-lg active:scale-95"
                >
                  <WaIcon className="w-5 h-5" /> Chat on WhatsApp
                </a>
                <a
                  href={CALL_LINK}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-700 text-white text-base font-bold py-4 rounded-2xl shadow-lg active:scale-95"
                >
                  📞 Direct Call ({PHONE})
                </a>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-white/15 text-white text-base font-bold py-4 rounded-2xl active:scale-95"
                >
                  📍 Open Store Directions
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <section id="home" className="hero-gradient noise relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Responsive Ambient Blobs */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-yellow-400/10 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left Content Column */}
            <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 pr-5 mb-6 inline-flex shadow-lg">
                <img src={logo} alt="Kurinji Maligai Store Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-emerald-300" />
                <span className="text-white text-xs sm:text-sm font-extrabold tracking-wide">Nature Blooms · Goodness Lives On</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                Your Preferred<br />
                <span className="shimmer-text">Kurinji</span><br />
                <span className="text-emerald-200">Maligai Store</span>
              </h1>

              <p className="text-emerald-100 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 font-light">
                From fresh groceries, pure cooking oils, and farm dairy to cold sodas, daily house essentials, and durable cow ropes — top quality for your home and farm.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                <button onClick={() => scrollTo("products")} className="btn-green text-base w-full sm:w-auto justify-center">
                  Explore Products <span>→</span>
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold text-base w-full sm:w-auto justify-center"
                >
                  <WaIcon className="w-5 h-5" /> Order on WhatsApp
                </a>
              </div>

              {/* Quick Contact Strip */}
              <div className="flex items-center justify-center md:justify-start gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 max-w-sm mx-auto md:mx-0">
                <div className="w-11 h-11 rounded-full bg-emerald-400/20 flex items-center justify-center text-2xl flex-shrink-0">📞</div>
                <div className="text-left">
                  <p className="text-emerald-200 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Instant Call / WhatsApp</p>
                  <a href={CALL_LINK} className="text-white font-extrabold text-lg tracking-wide hover:underline">
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Grid Cards (Visible on Tablet md+ & PC & TV) */}
            <div className="hidden md:grid grid-cols-2 gap-4 relative">
              {[
                { img: "photo-1568626913161-c4ac1e5ae186", label: "Grocery Staples", delay: "0s" },
                { img: "photo-1552592074-ea7a91b851b3", label: "Cooking Oils", delay: "0.5s" },
                { img: "photo-1550583724-b2692b85b150", label: "Fresh Dairy", delay: "1s" },
                { img: "photo-1625865019554-220ea80ea813", label: "Cold Drinks", delay: "1.5s" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-square relative group"
                  style={{ animation: `float 5s ease-in-out ${card.delay} infinite` }}
                >
                  <img
                    src={`https://images.unsplash.com/${card.img}?w=400&h=400&fit=crop&auto=format`}
                    alt={card.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white text-sm sm:text-base font-bold drop-shadow">{card.label}</p>
                </div>
              ))}

              {/* Center Floating Emblem Logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-md rounded-full shadow-2xl p-2.5 border-4 border-emerald-400 scale-110 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <img
                  src={logo}
                  alt="Kurinji Maligai Official Emblem"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-inner"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Wave Divider */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60L48 53.3C96 46.7 192 33.3 288 28.3C384 23.3 480 26.7 576 33.3C672 40 768 50 864 48.3C960 46.7 1056 33.3 1152 26.7C1248 20 1344 20 1392 20L1440 20V60H0Z" fill="#f0fdf4" />
          </svg>
        </div>
      </section>

      {/* ── Marquee Continuous Strip ── */}
      <div className="bg-emerald-800 py-3.5 overflow-hidden border-y border-emerald-700">
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-bold text-xs sm:text-sm tracking-wide flex items-center gap-3">
              <span>{item}</span>
              <span className="text-amber-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Key Statistics Section ── */}
      <section ref={statsRef} className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center p-5 sm:p-7 rounded-3xl border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/50 group cursor-default"
                style={statsInView ? { animation: `countUp 0.5s ease ${i * 0.1}s both` } : { opacity: 0 }}
              >
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <p className="font-display text-2xl sm:text-4xl font-extrabold text-emerald-900 mb-1">{s.value}</p>
                <p className="text-emerald-700 text-xs sm:text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS & LIVE SEARCH (WITHOUT PRICE DISPLAY) ── */}
      <section id="products" className="py-16 sm:py-24 bg-green-50">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-badge mb-4">Our Available Catalog</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-green-950 mt-2 mb-4">
              Explore Products
            </h2>
            <p className="text-emerald-800 text-sm sm:text-base font-normal">
              Search for any daily grocery, oil, dairy, soda, or farm supply item below and add to your inquiry list!
            </p>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="max-w-3xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search products (e.g., Rice, Oil, Milk, Coke, Rope, Soap)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-emerald-200 text-emerald-950 font-medium text-sm sm:text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Grocery & Staples", "Cooking Oils", "Dairy Products", "Cold Drinks & Sodas", "Daily Essentials", "Cow Ropes & Farm"].map((catName) => (
                <button
                  key={catName}
                  onClick={() => setSelectedCatFilter(catName)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                    selectedCatFilter === catName
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-md"
                      : "bg-white text-emerald-800 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>

          {/* Display Grid (No prices shown) */}
          {filteredCatalog.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredCatalog.slice(0, debouncedSearch ? 24 : 8).map((p) => (
                <div
                  key={p.name}
                  className="product-card bg-white rounded-3xl border border-emerald-100 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="relative h-48 bg-emerald-50 overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${p.img}?w=400&h=300&fit=crop&auto=format`}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="offer-tag">{p.tag}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        {p.catName}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-emerald-950 text-base sm:text-lg leading-snug">{p.name}</h3>
                      <div className="stars text-sm mt-1">★★★★★</div>
                      <p className="text-xs text-emerald-600 font-semibold mt-2">Available for pickup & WhatsApp order</p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <button
                      onClick={() => addToCart(p.name)}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow hover:shadow-md active:scale-95"
                    >
                      <span>🛒 Add to Order List</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-emerald-100 p-8 max-w-md mx-auto">
              <span className="text-5xl">🔍</span>
              <p className="font-bold text-emerald-900 text-lg mt-3">No products found for &ldquo;{debouncedSearch}&rdquo;</p>
              <p className="text-emerald-600 text-sm mt-1">Try searching for rice, oil, curd, soap, or soda.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCatFilter("All"); }}
                className="mt-4 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Quick Order Banner */}
          <div className="mt-12 text-center bg-emerald-800 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <p className="font-display text-2xl font-bold">Have a custom grocery list?</p>
              <p className="text-emerald-200 text-sm mt-1">Send us your exact items list on WhatsApp for instant confirmation and packing!</p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:scale-105 transition-all flex-shrink-0"
            >
              <WaIcon className="w-5 h-5" /> Send Custom List
            </a>
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORIES SECTION (WITHOUT PRICES) ── */}
      <section id="categories" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-badge mb-4">Store Departments</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 mt-2 mb-3">
              Explore Departments
            </h2>
            <p className="text-emerald-700 text-sm sm:text-base">Tap any department to view product varieties.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "tab-active border-transparent scale-105"
                    : "bg-white border-emerald-200 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-50"
                }`}
              >
                <span>{cat.icon}</span> <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Active Category Display Panel */}
          <div
            key={activeCat.id}
            className="bg-emerald-50/50 rounded-3xl overflow-hidden shadow-xl border border-emerald-100"
            style={{ animation: "countUp 0.4s ease both" }}
          >
            <div className="grid md:grid-cols-2">
              {/* Left Image Banner */}
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${activeCat.img}?w=800&h=600&fit=crop&auto=format`}
                  alt={activeCat.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${activeCat.color} opacity-75`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                  <p className="text-5xl sm:text-6xl mb-2">{activeCat.icon}</p>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold">{activeCat.label}</h3>
                  <p className="text-emerald-100 text-sm mt-1">{activeCat.products.length} Items Available in Stock</p>
                </div>
              </div>

              {/* Right Products List (No price tags) */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
                    Available Items in {activeCat.label}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCat.products.map((p) => (
                      <div
                        key={p.name}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border ${activeCat.border} bg-gradient-to-br ${activeCat.light} hover:shadow-md transition-all`}
                      >
                        <div>
                          <p className="text-emerald-950 text-xs sm:text-sm font-bold">{p.name}</p>
                          <p className="text-emerald-600 text-[11px] font-semibold">{p.tag}</p>
                        </div>
                        <button
                          onClick={() => addToCart(p.name)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-transform active:scale-95"
                          title="Add to WhatsApp Order"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg"
                >
                  <WaIcon className="w-5 h-5" /> Enquire Entire Category on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Quick Department Grid Cards below */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`cat-card rounded-2xl p-4 text-center border transition-all duration-300 ${
                  activeTab === cat.id
                    ? `bg-gradient-to-br ${cat.color} border-transparent text-white shadow-lg scale-105`
                    : `bg-white border-emerald-100 text-emerald-900 hover:border-emerald-300`
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{cat.icon}</div>
                <p className={`text-xs font-bold leading-tight ${activeTab === cat.id ? "text-white" : "text-emerald-900"}`}>
                  {cat.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STORE SECTION ── */}
      <section id="about" className="py-16 sm:py-24 relative overflow-hidden bg-emerald-900 text-white">
        <div className="absolute inset-0 hero-gradient opacity-95 pointer-events-none" />
        <div className="absolute inset-0 noise opacity-100 pointer-events-none" />

        <div className="relative z-10 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-badge mb-5 bg-white/15 border-white/20 text-white">Why Choose Us</span>
              
              {/* Store Official Logo Emblem Card */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 mb-6 shadow-xl">
                <img src={logo} alt="Kurinji Maligai Official Emblem" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-300 shadow-lg flex-shrink-0" />
                <div>
                  <p className="text-amber-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider">Your Neighbourhood Store</p>
                  <p className="text-white font-extrabold text-base sm:text-xl">Essentials For A Better Tomorrow</p>
                  <p className="text-emerald-200 text-xs sm:text-sm mt-1">Once in 12 Years, Always Special</p>
                </div>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-6 leading-tight">
                Your Neighbourhood's<br />Most Trusted Store
              </h2>
              <p className="text-emerald-100 text-base sm:text-lg leading-relaxed mb-8 font-light">
                Kurinji Maligai Department Store has been serving local families and farmers for over 15 years. We take pride in providing guaranteed quality, fresh stock every morning, honest weights, and warm customer service.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "✅", title: "Quality Sourced", desc: "Handpicked fresh groceries & oils" },
                  { icon: "👍", title: "Trusted Products", desc: "Top brands & local favorites" },
                  { icon: "🚚", title: "WhatsApp Ordering", desc: "Order online, pick up or home delivery" },
                  { icon: "❤️", title: "15+ Years Trust", desc: "Proudly serving our community" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-bold text-white text-sm sm:text-base">{item.title}</p>
                    <p className="text-emerald-200 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div>
              <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">Customer Reviews</p>
              <div className="relative min-h-[220px]">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className={`bg-white text-emerald-950 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 ${
                      i === testimonialIdx ? "opacity-100 translate-y-0" : "opacity-0 absolute inset-0 pointer-events-none translate-y-4"
                    }`}
                  >
                    <div className="stars text-lg mb-3">{"★".repeat(t.stars)}</div>
                    <p className="text-emerald-900 text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                      "{t.msg}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-base">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-emerald-950 text-sm sm:text-base">{t.name}</p>
                        <p className="text-emerald-600 text-xs font-semibold">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex gap-2 mt-4 justify-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === testimonialIdx ? "w-8 bg-white" : "w-2.5 bg-white/40"}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT & LOCATION SECTION ── */}
      <section id="contact" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="section-badge mb-4">Store Location & Contact</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-emerald-950 mt-2 mb-3">
              Visit or Contact Us
            </h2>
            <p className="text-emerald-700 text-sm sm:text-base">We are open 7 days a week from 6:30 AM to 10:30 PM.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                href: CALL_LINK,
                icon: "📞",
                title: "Call Us Direct",
                sub: PHONE,
                sub2: "Tap to make a quick phone call",
                bg: "from-emerald-50 to-green-50",
                border: "border-emerald-200",
                text: "text-emerald-900",
                btn: "bg-emerald-700 hover:bg-emerald-800",
                label: "Call Now",
              },
              {
                href: WA_LINK,
                icon: "💬",
                title: "WhatsApp Chat",
                sub: PHONE,
                sub2: "Send list or ask questions",
                bg: "from-emerald-50 to-teal-50",
                border: "border-teal-200",
                text: "text-teal-900",
                btn: "bg-[#25d366] hover:bg-[#20bd5a]",
                label: "Open WhatsApp",
                external: true,
              },
              {
                href: MAPS_LINK,
                icon: "📍",
                title: "Store Directions",
                sub: "Sarbunisha Complex, Akkur",
                sub2: "1/280-2, Udayayarkoil Pathy, TN 609301",
                bg: "from-amber-50 to-yellow-50",
                border: "border-amber-200",
                text: "text-amber-900",
                btn: "bg-amber-600 hover:bg-amber-700",
                label: "Open in Google Maps",
                external: true,
              },
            ].map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className={`product-card flex flex-col items-center text-center p-6 sm:p-8 bg-gradient-to-br ${card.bg} border ${card.border} rounded-3xl shadow-sm`}
              >
                <div className="text-4xl sm:text-5xl mb-3">{card.icon}</div>
                <p className={`font-extrabold ${card.text} text-lg mb-1`}>{card.title}</p>
                <p className="text-emerald-800 font-bold text-sm sm:text-base">{card.sub}</p>
                <p className="text-emerald-600 text-xs mt-1">{card.sub2}</p>
                <span className={`mt-5 ${card.btn} text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full transition-all shadow`}>
                  {card.label}
                </span>
              </a>
            ))}
          </div>

          {/* Bottom Interactive Order CTA */}
          <div className="hero-gradient rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden noise">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Ready to place an order?</h3>
              <p className="text-emerald-100 text-sm sm:text-base max-w-lg">
                Click below to send your shopping list directly to our WhatsApp. We will confirm your items & delivery time!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 relative z-10 w-full md:w-auto">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base px-6 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
              >
                <WaIcon className="w-5 h-5" /> Start WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-emerald-950 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Store Brand Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Kurinji Maligai Logo" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow-md" />
                <div>
                  <p className="font-display font-bold text-lg">Kurinji Maligai</p>
                  <p className="text-emerald-400 text-xs">Department Store</p>
                </div>
              </div>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Your reliable local store for all household groceries, pure cooking oils, daily fresh dairy, sodas, and farm cow ropes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Departments</p>
              <ul className="space-y-2 text-sm text-emerald-200">
                {categories.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => { setActiveTab(c.id); scrollTo("categories"); }} className="hover:text-white transition-colors text-left">
                      • {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timings */}
            <div>
              <p className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Store Address & Schedule</p>
              <div className="space-y-2 text-sm text-emerald-200">
                <p>🗓️ Monday – Sunday</p>
                <p>⏰ 6:30 AM – 10:30 PM</p>
                <p className="leading-snug">📍 1/280-2, Sarbunisha Complex, Akkur, Udayayarkoil Pathy, TN 609301</p>
                <p className="text-xs text-emerald-400 mt-2">Open on all public holidays!</p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Contact & WhatsApp</p>
              <div className="space-y-3 text-sm">
                <a href={CALL_LINK} className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors">
                  <span>📞</span> Phone: {PHONE}
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors">
                  <WaIcon className="w-4 h-4 text-[#25d366]" /> WhatsApp: {PHONE}
                </a>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors">
                  <span>📍</span> Get Google Maps Location
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400">
            <p>© {new Date().getFullYear()} Kurinji Maligai Department Store. All rights reserved.</p>
            <p>Designed for Mobile, Tablet, PC, Mac & Smart TV Viewing 🚀</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP ORDER LIST DRAWER MODAL (NO PRICES) ── */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}
          role="presentation"
        >
          <div
            className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl slide-in-right"
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp order list"
          >
            {/* Drawer Header */}
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-300 shadow" />
                <div>
                  <h3 className="font-display font-bold text-lg">WhatsApp Order List</h3>
                  <p className="text-xs text-emerald-200">{totalCartCount} item(s) selected</p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItemsArray.length > 0 ? (
                cartItemsArray.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3.5 bg-green-50/60 rounded-2xl border border-emerald-100">
                    <div className="flex-1 pr-3">
                      <p className="font-bold text-emerald-950 text-sm">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQty(item.name, -1)}
                        className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="font-bold text-emerald-950 text-sm w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.name, 1)}
                        className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-emerald-700">
                  <span className="text-5xl">🛒</span>
                  <p className="font-bold text-base mt-3">Your order list is empty</p>
                  <p className="text-xs text-emerald-500 mt-1">Browse products and tap "+ Add" to build your WhatsApp inquiry list!</p>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartItemsArray.length > 0 && (
              <div className="p-5 border-t border-emerald-100 bg-emerald-50/40 space-y-4">
                <a
                  href={generateWhatsAppCartLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white font-extrabold py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-base"
                >
                  <WaIcon className="w-5 h-5" /> Send Order List to WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── WHATSAPP FLOATING ACTION BUTTON (FAB) ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn pulse-ring relative"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <WaIcon className="w-7 h-7 text-white" />
      </a>

    </div>
  );
}
