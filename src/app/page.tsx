"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Building2,
  Zap,
  Leaf,
  Handshake,
  Globe,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  FlaskConical,
  Car,
  Battery,
  Sun,
  Banknote,
  Users,
  Wrench,
  Store,
  UserCheck,
  Plug,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/251912233688";
const EMAIL = "info@oranex.com.et";
const CEO_EMAIL = "oranexceo@gmail.com,ceo@oranex.com.et";
const WEBSITE = "https://oranex.com.et";
const LOCATION = "NFL, Woreda 1, Addis Ababa, Ethiopia";
const PHONE_1 = "+251 912 233 688";
const PHONE_2 = "+251 968 636 371";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#chemicals", label: "Chemicals" },
  { href: "#ev", label: "EV Solutions" },
  { href: "#financing", label: "Financing" },
  { href: "#partnership", label: "Partnership" },
  { href: "#contact", label: "Contact" },
];

const CHEMICAL_CATEGORIES = [
  {
    title: "Detergent Chemicals",
    description:
      "Premium raw materials for detergent manufacturing, laundry formulations, and industrial cleaning solutions.",
    icon: FlaskConical,
  },
  {
    title: "Construction Chemicals",
    description:
      "Specialty additives and binders for concrete, mortar, waterproofing, and modern construction applications.",
    icon: Building2,
  },
  {
    title: "Industrial Chemicals",
    description:
      "Bulk and specialty chemicals for manufacturing, processing, and large-scale industrial operations.",
    icon: Globe,
  },
];

const CHEMICAL_PRODUCTS = [
  "SLES",
  "LABSA",
  "STPP",
  "Soda Ash",
  "Caustic Soda",
  "HPMC",
  "RDP",
  "SNF",
];

const EV_SOLUTIONS = [
  {
    title: "Electric Vehicles",
    description:
      "Modern EV platforms for personal mobility, fleet operations, and commercial transportation across Ethiopia.",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    icon: Car,
  },
  {
    title: "EV Spare Parts",
    description:
      "Genuine and compatible components — batteries, motors, controllers, and consumables for EV maintenance.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
    icon: Wrench,
  },
  {
    title: "Charging Stations",
    description:
      "AC and DC fast-charging infrastructure for businesses, fleets, commercial centers, and public networks.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba53b3f87?q=80&w=1200&auto=format&fit=crop",
    icon: Plug,
  },
  {
    title: "Battery Systems",
    description:
      "Advanced lithium battery packs, BMS integration, and energy storage for mobility and stationary use.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    icon: Battery,
  },
  {
    title: "Renewable Energy",
    description:
      "Solar and clean energy systems powering EV infrastructure and sustainable industrial operations.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    icon: Sun,
  },
];

const FINANCING_ITEMS = [
  {
    title: "Strategic Financing",
    description:
      "Long-term capital structures aligned with industrial growth, EV adoption, and energy infrastructure expansion.",
    icon: Banknote,
  },
  {
    title: "Investor Partnerships",
    description:
      "Institutional and private investor collaboration for scalable ventures across chemicals, mobility, and energy.",
    icon: Handshake,
  },
  {
    title: "Project Financing",
    description:
      "Structured funding for EV charging networks, renewable installations, and large-scale trade projects.",
    icon: Building2,
  },
  {
    title: "Trade Financing",
    description:
      "Import-export financing, supplier credit facilities, and working capital for international trade operations.",
    icon: Globe,
  },
];

const PARTNERSHIP_TYPES = [
  {
    title: "EV Garages",
    description:
      "Technical service partnerships with referral commissions on EV sales, parts, and maintenance contracts.",
    icon: Wrench,
  },
  {
    title: "Spare Parts Shops",
    description:
      "Authorized distribution of EV components with competitive margins and dedicated supply support.",
    icon: Store,
  },
  {
    title: "Sales Agents",
    description:
      "Commission-based sales across chemicals, EV solutions, and energy products with premium pricing tiers.",
    icon: UserCheck,
  },
  {
    title: "Charging Infrastructure Partners",
    description:
      "Site operators and developers partnering on charging station deployment and revenue-sharing models.",
    icon: Plug,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 sm:mb-16 md:mb-20 max-w-full"
    >
      <p className="text-emerald-500 text-xs sm:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 px-1">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 px-2 text-balance">
        {title}
      </h2>
      <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 break-words">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="ORANEX Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute text-emerald-500 font-black text-base sm:text-lg">
                O
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base md:text-lg font-bold tracking-wide group-hover:text-emerald-400 transition-colors truncate">
                ORANEX TRADING
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 tracking-wider sm:tracking-widest uppercase truncate">
                ONE MEMBER PLC
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-emerald-400 transition-all duration-300 font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Get in Touch
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden shrink-0 p-2.5 -mr-1 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-white/5 transition-colors touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/98 border-t border-white/5 backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col px-4 sm:px-6 py-4 sm:py-6 gap-0 max-h-[min(70dvh,32rem)] overflow-y-auto overscroll-contain">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-4 text-base sm:text-lg text-gray-200 hover:text-emerald-400 transition-colors border-b border-white/5 touch-manipulation"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-5 inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 py-4 rounded-full font-semibold transition-all touch-manipulation"
                >
                  WhatsApp Us
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-6xl mx-auto text-center w-full min-w-0"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-3 sm:px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8 max-w-full mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-center leading-snug">
              Addis Ababa, Ethiopia • Global Trade Excellence
            </span>
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl md:text-6xl lg:text-7xl font-bold leading-[1.12] sm:leading-[1.1] tracking-tight mb-6 sm:mb-8 px-1 text-balance break-words">
            Driving Ethiopia&apos;s Future Through{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Trade, Electric Mobility & Sustainable Solutions
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12 px-1 break-words">
            <strong className="text-white font-semibold">
              ORANEX TRADING ONE MEMBER PLC
            </strong>{" "}
            is an Ethiopia-based industrial trading company specializing in
            industrial chemicals, electric mobility solutions, EV spare parts,
            charging infrastructure, renewable energy systems, and strategic
            investment partnerships.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 w-full max-w-md sm:max-w-none mx-auto">
            <a
              href="#chemicals"
              className="group inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all hover:shadow-xl hover:shadow-emerald-500/20 sm:hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Explore Solutions
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a
              href="#partnership"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-emerald-500/50 hover:bg-white/5 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all sm:hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Become a Partner
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 sm:mt-10 px-1">
            <div className="border border-emerald-500/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400 text-center">
              Ethiopia Based
            </div>

            <div className="border border-emerald-500/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400 text-center">
              Global Supply Network
            </div>

            <div className="border border-emerald-500/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400 text-center">
              EV Infrastructure Focus
            </div>

            <div className="border border-emerald-500/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400 text-center">
              Industrial Chemical Supply
            </div>
          </div>

          <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto w-full">
            {[
              { label: "Industrial Chemicals", icon: FlaskConical },
              { label: "Electric Mobility", icon: Zap },
              { label: "Renewable Energy", icon: Leaf },
              { label: "Global Trade", icon: Globe },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors min-w-0"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0" />
                <span className="text-[11px] sm:text-xs md:text-sm text-gray-400 font-medium text-center leading-tight break-words">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CHEMICALS */}
      <section id="chemicals" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="Industrial Supply"
            title="Premium Chemical Solutions"
            description="Comprehensive chemical portfolios for detergent manufacturing, construction, and industrial processing — sourced globally and delivered with enterprise reliability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
            {CHEMICAL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-emerald-500/40 transition-all duration-500 md:hover:-translate-y-2 min-w-0"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-emerald-400 break-words">
                  {cat.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed break-words">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-black/50 p-5 sm:p-8 md:p-12"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center text-balance px-1">
              Key Product Portfolio
            </h3>
            <p className="text-gray-500 text-sm sm:text-base text-center mb-6 sm:mb-10 px-2 break-words">
              Bulk supply • Quality assured • Competitive enterprise pricing
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {CHEMICAL_PRODUCTS.map((product) => (
                <div
                  key={product}
                  className="group flex items-center justify-center py-4 sm:py-5 px-2 sm:px-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 min-w-0"
                >
                  <span className="text-sm sm:text-lg md:text-xl font-bold tracking-wide text-gray-200 group-hover:text-emerald-400 transition-colors text-center break-words">
                    {product}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EV SOLUTIONS */}
      <section id="ev" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="Sustainable Mobility"
            title="EV & Energy Solutions"
            description="End-to-end electric mobility infrastructure — from vehicles and spare parts to charging networks, battery systems, and renewable energy integration."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {EV_SOLUTIONS.map((item, i) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 hover:border-emerald-500/40 transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-emerald-500/5 min-w-0 ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      i === 0 ? "h-48 sm:h-56 md:h-72 lg:h-80" : "h-44 sm:h-56"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600/90 flex items-center justify-center">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-emerald-400 transition-colors break-words">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

            {/* Smart Hotels Section */}
<section
  id="smart-hotels"
  className="bg-white py-20 px-6 md:px-20"
>
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-14">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
        Smart Hospitality Solutions
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
        Smart Hotels & Infrastructure
      </h2>

      <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
        ORANEX delivers integrated smart hotel solutions including
        intelligent lighting systems, smart room technologies,
        hotel materials sourcing, and hospitality project supply
        solutions for modern hotels and commercial developments.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          Smart Lighting
        </h3>

        <p className="text-gray-600 leading-relaxed">
          LED strips, smart canopy lighting, kitchen lighting,
          bed lighting systems, and intelligent lighting controls
          for modern hospitality environments.
        </p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          Hotel Materials
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Comprehensive sourcing solutions for hotel construction,
          renovation, interior finishing, furniture, and hospitality
          materials supply.
        </p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          Smart Room Systems
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Motion sensors, automation controls, smart switches,
          and energy-efficient room management systems for
          modern hospitality projects.
        </p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
        <h3 className="text-2xl font-semibold mb-4">
          Project Supply
        </h3>

        <p className="text-gray-600 leading-relaxed">
          End-to-end supply support for hotels, resorts,
          apartments, and commercial infrastructure developments
          across Ethiopia.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* FINANCING */}
      <section
        id="financing"
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950/80 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative min-w-0">
          <SectionHeader
            eyebrow="Investor Ready"
            title="Strategic Financing & Investment"
            description="ORANEX offers structured financing pathways for investors, institutions, and strategic partners seeking exposure to high-growth industrial and clean-energy markets."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14">
            {FINANCING_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-emerald-500/40 transition-all duration-500 md:hover:-translate-y-1 text-center min-w-0"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 break-words">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed break-words">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-semibold transition-all hover:shadow-xl hover:shadow-emerald-500/20 sm:hover:-translate-y-0.5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              Partner With ORANEX
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section id="partnership" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="Grow With Us"
            title="Commission Partnership Program"
            description="Join ORANEX's expanding network of partners and earn competitive commissions through EV solutions, EV spare parts, charging infrastructure, and electric mobility partnerships."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {PARTNERSHIP_TYPES.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all duration-500 md:hover:-translate-y-2 min-w-0"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 sm:mb-5">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-emerald-400 break-words">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed break-words">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 to-black p-6 sm:p-8 md:p-12 text-center"
          >
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto mb-5 sm:mb-6" />
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-300 mb-3 sm:mb-4 px-2 text-balance break-words">
              Premium pricing and commission opportunities available.
            </p>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 break-words">
              We are actively onboarding EV garages, spare parts shops, sales
              agents, and charging infrastructure partners across Ethiopia.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
            >
              Apply as a Partner
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Contact ORANEX"
            description="Reach our team for chemicals supply, EV solutions, financing partnerships, and strategic collaboration opportunities."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-4 sm:space-y-6 min-w-0"
            >
              <div className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-colors min-w-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-1">Head Office</h3>
                  <p className="text-gray-400 text-sm sm:text-base break-words">
                    NFL, Woreda 1, Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-colors min-w-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-1">Email</h3>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-gray-400 hover:text-emerald-400 transition-colors mobile-safe-text text-sm sm:text-base"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-colors min-w-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-1" />
                <div className="min-w-0">
                  <h3 className="font-bold text-base sm:text-lg mb-1">WhatsApp</h3>
                  <p className="text-gray-400 text-sm sm:text-base break-words">
                    Fast response for inquiries & orders
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950/30 to-black p-6 sm:p-8 md:p-12 flex flex-col justify-center min-w-0"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 break-words">
                Start a Conversation
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed break-words">
                Whether you need bulk chemicals, EV infrastructure, or a
                financing partnership — our team is ready to assist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  Email Us
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold transition-all w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black pt-12 sm:pt-16 pb-24 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-14">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-500">
                  O
                </div>
                <div>
                  <p className="font-bold">ORANEX TRADING</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    ONE MEMBER PLC
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs break-words">
                Premium industrial chemicals, EV infrastructure, electric mobility, renewable energy, and strategic trade solutions headquartered in Addis Ababa, Ethiopia.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-emerald-400 mb-5 tracking-wide">
                Chemicals
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#chemicals" className="hover:text-white transition-colors">
                    Detergent Chemicals
                  </a>
                </li>
                <li>
                  <a href="#chemicals" className="hover:text-white transition-colors">
                    Construction Chemicals
                  </a>
                </li>
                <li>
                  <a href="#chemicals" className="hover:text-white transition-colors">
                    Industrial Chemicals
                  </a>
                </li>
                <li>
                  <a href="#chemicals" className="hover:text-white transition-colors">
                    Product Portfolio
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-emerald-400 mb-5 tracking-wide">
                EV Solutions
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#ev" className="hover:text-white transition-colors">
                    Electric Vehicles
                  </a>
                </li>
                <li>
                  <a href="#ev" className="hover:text-white transition-colors">
                    EV Spare Parts
                  </a>
                </li>
                <li>
                  <a href="#ev" className="hover:text-white transition-colors">
                    Charging Stations
                  </a>
                </li>
                <li>
                  <a href="#ev" className="hover:text-white transition-colors">
                    Renewable Energy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-emerald-400 mb-5 tracking-wide">
               
              <div>
  <h4 className="font-bold text-emerald-400 mb-5 tracking-wide">
    Smart Hotels
  </h4>

  <ul className="space-y-3 text-sm text-gray-500">
    <li>
      <a href="#smart-hotels" className="hover:text-white transition-colors">
        Smart Lighting
      </a>
    </li>

    <li>
      <a href="#smart-hotels" className="hover:text-white transition-colors">
        Hotel Materials
      </a>
    </li>

    <li>
      <a href="#smart-hotels" className="hover:text-white transition-colors">
        Smart Room Systems
      </a>
    </li>

    <li>
      <a href="#smart-hotels" className="hover:text-white transition-colors">
        Hospitality Projects
      </a>
    </li>
  </ul>
</div>

                Contact
              </h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Addis Ababa, Ethiopia
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="hover:text-white transition-colors mobile-safe-text break-all"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#financing" className="hover:text-white transition-colors">
                    Financing
                  </a>
                </li>
                <li>
                  <a href="#partnership" className="hover:text-white transition-colors">
                    Partnership Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 text-center md:text-left">
            <p className="break-words px-1">
              © {new Date().getFullYear()} ORANEX TRADING ONE MEMBER PLC. All rights reserved.
            </p>
            <p className="text-center md:text-right break-words px-1">
              Ethiopia • Electric Mobility • Chemicals • Sustainable Energy
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white pl-4 pr-5 sm:pl-5 sm:pr-6 py-3.5 sm:py-4 rounded-full shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/40 touch-manipulation"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="font-semibold hidden sm:inline">WhatsApp</span>
      </a>

            
    </main>
  );
}
