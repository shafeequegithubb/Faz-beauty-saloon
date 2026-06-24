import { useState, useEffect, useRef, ReactNode } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import fayizPhoto from "@/imports/IMG_8199.jpg";
import sabeelPhoto from "@/imports/ECD169EE-2B51-4247-BA08-BD6AEB5E51A0.PNG";
import weddingPhoto from "@/imports/jemsheed_wedding.png";
import {
  motion,
  useInView,
  AnimatePresence,
} from "motion/react";
import {
  Phone,
  MessageCircle,
  Star,
  Users,
  Award,
  Scissors,
  Instagram,
  MapPin,
  Menu,
  X,
  Clock,
  Crown,
  CheckCircle,
  Sparkles,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const PHONE = "+918606068726";
const PHONE_DISPLAY = "+91 8606068726";
const WA_LINK = `https://wa.me/${PHONE}`;

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    title: "Hair Services",
    icon: Scissors,
    items: ["Haircut", "Hair Styling", "Hair Coloring"],
    img: "photo-1503951914875-452162b0f3f1",
  },
  {
    title: "Beard Services",
    icon: Sparkles,
    items: ["Beard Trimming", "Beard Styling"],
    img: "photo-1605497788044-5a32c7078486",
  },
  {
    title: "Facial & Skin Care",
    icon: Award,
    items: ["Face Cleanup", "Facial Treatment", "Skin Care"],
    img: "photo-1570172619644-dfd03ed5d881",
  },
  {
    title: "Wedding Makeover",
    icon: Crown,
    items: [
      "Groom Makeup",
      "Hair Styling",
      "Beard Styling",
      "Premium Wedding Package",
    ],
    img: null,
  },
];

const TEAM = [
  {
    name: "Fayiz",
    role: "Founder & Master Stylist",
    specialty: "Wedding Makeovers & Precision Haircuts",
    img: null, // uses fayizPhoto import
    exp: "10+ Years",
  },
  {
    name: "Sabeel",
    role: "Senior Stylist",
    specialty: "Hair & Beard Styling, Facial Treatment",
    img: null, // uses sabeelPhoto import
    exp: "5+ Years",
  },
];

const TESTIMONIALS = [
  {
    name: "Jamsheed",
    rating: 5,
    service: "Wedding Makeover",
    text: "FAZ Beauty Saloon gave me the most stunning wedding look I could have imagined. Fayiz and his team are true artists. Every guest complimented my style!",
  },
  {
    name: "Shafeeque mohd",
    rating: 5,
    service: "Hair & Beard Styling",
    text: "The atmosphere is premium and the stylists truly understand what you want. Best grooming experience I have ever had. Highly recommended!",
  },
  {
    name: "Jasin np",
    rating: 5,
    service: "Regular Grooming",
    text: "I have been a loyal client for over a year and the quality never disappoints. The precision haircuts here are simply unmatched in the area.",
  },
  {
    name: "Roshan",
    rating: 5,
    service: "Premium Wedding Package",
    text: "Booked the premium wedding package — worth every penny. The team was professional, the products were top quality. My wedding photos look incredible!",
  },
  {
    name: "Sreejith P",
    rating: 5,
    service: "Facial Treatment",
    text: "Hygienic environment, premium branded products, and exceptional care. The facial treatment left my skin glowing. Will definitely return!",
  },
];

const STATS = [
  {
    value: 1000,
    suffix: "+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: 2,
    suffix: "",
    label: "Expert Stylists",
    icon: Award,
  },
  {
    value: 8,
    suffix: "+",
    label: "Years Experience",
    icon: Clock,
  },
  {
    value: 100,
    suffix: "%",
    label: "Premium Products",
    icon: CheckCircle,
  },
];

const HOURS = [
  { day: "Monday", time: "9:30 AM – 9:30 PM", open: true },
  { day: "Tuesday", time: "Closed", open: false },
  { day: "Wednesday", time: "9:30 AM – 9:30 PM", open: true },
  { day: "Thursday", time: "9:30 AM – 9:30 PM", open: true },
  { day: "Friday", time: "9:30 AM – 9:30 PM", open: true },
  { day: "Saturday", time: "9:30 AM – 9:30 PM", open: true },
  { day: "Sunday", time: "9:30 AM – 9:30 PM", open: true },
];

const GALLERY = [
  {
    id: "photo-1503951914875-452162b0f3f1",
    alt: "Premium haircut styling",
    tall: true,
  },
  {
    id: "photo-1605497788044-5a32c7078486",
    alt: "Professional beard styling",
    tall: false,
  },
  {
    id: "photo-1599351431202-1e0f0137899a",
    alt: "Wedding groom makeover",
    tall: false,
  },
  {
    id: "photo-1621605815971-fbc98d665033",
    alt: "Luxury hair grooming",
    tall: false,
  },
  {
    id: "photo-1584515979956-d9f6e5d09982",
    alt: "Modern hair styling",
    tall: false,
  },
  // {
  //   id: "photo-1759134198561-e2041049419c",
  //   alt: "Expert groom styling",
  //   tall: true,
  // },
];

const WHY_CHOOSE = [
  { icon: Users, text: "1000+ Happy Clients" },
  { icon: Award, text: "Professional Stylists" },
  { icon: Sparkles, text: "Premium Branded Products" },
  { icon: Crown, text: "Personalized Styling" },
  { icon: CheckCircle, text: "Hygienic Environment" },
  { icon: Scissors, text: "Trendy Haircuts & Beard Styling" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A84C]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
      <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span
      className="block text-[11px] font-semibold tracking-[0.35em] uppercase mb-3"
      style={{ color: GOLD }}
    >
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(201,168,76,0.18)",
        borderRadius: "2px",
      }}
    >
      {children}
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  dir = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  dir?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: dir === "up" ? 48 : dir === "down" ? -48 : 0,
        x: dir === "left" ? 48 : dir === "right" ? -48 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.7, ease: "easeInOut" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center select-none"
      >
        {/* Outer ring */}
        <div className="relative mb-8">
          <motion.div
            className="w-20 h-20 rounded-full"
            style={{ border: `1px solid ${GOLD}40` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{ border: `1px solid ${GOLD}20` }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Scissors size={22} style={{ color: GOLD }} />
          </div>
        </div>
        <div
          className="text-4xl font-bold tracking-[0.25em]"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: GOLD,
          }}
        >
          FAZ
        </div>
        <div className="text-[10px] tracking-[0.55em] text-white/40 uppercase mt-1.5">
          Beauty Saloon
        </div>
        <div className="flex gap-1.5 mt-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: GOLD }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.22,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      }}
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8,8,8,0.96)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.15)"
          : "none",
        boxShadow: scrolled
          ? "0 4px 40px rgba(0,0,0,0.5)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#"
          className="flex flex-col leading-none group"
        >
          <span
            className="text-[26px] font-bold tracking-[0.22em] transition-colors duration-300"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: GOLD,
            }}
          >
            FAZ
          </span>
          <span className="text-[9px] tracking-[0.45em] text-white/35 uppercase group-hover:text-white/60 transition-colors duration-300">
            Beauty Saloon
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors duration-300 group"
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                style={{ backgroundColor: GOLD }}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-widest uppercase border border-white/15 text-white/70 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300"
            style={{ borderRadius: "2px" }}
          >
            <Phone size={12} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{
              backgroundColor: GOLD,
              color: "#080808",
              borderRadius: "2px",
            }}
          >
            <MessageCircle size={12} />
            WhatsApp
          </a>
        </div>

        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <div className="px-6 py-7 flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[13px] tracking-[0.2em] uppercase text-white/70 hover:text-white border-b border-white/5 pb-4 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 py-3.5 text-[12px] font-medium tracking-widest uppercase border border-white/20 text-white"
                  style={{ borderRadius: "2px" }}
                >
                  <Phone size={13} />
                  Call Now
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold tracking-widest uppercase"
                  style={{
                    backgroundColor: GOLD,
                    color: "#080808",
                    borderRadius: "2px",
                  }}
                >
                  <MessageCircle size={13} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-[#111]"
        style={{
          backgroundImage: `url(${unsplash("photo-1503951914875-452162b0f3f1", 1920, 1080)})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/85 via-[#080808]/55 to-[#080808]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/75 via-transparent to-[#080808]/50" />

      {/* Animated gold light streaks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
            top: `${25 + i * 22}%`,
            left: 0,
            right: 0,
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 9 + i * 2.5,
            repeat: Infinity,
            delay: i * 2.8,
            ease: "linear",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Label>Premium Grooming Experience</Label>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.55,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-[clamp(3rem,9vw,7.5rem)] font-bold text-white leading-[0.92] mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Transform Your{" "}
          <em className="not-italic" style={{ color: GOLD }}>
            Style
          </em>
          <br />
          With{" "}
          <em className="not-italic" style={{ color: GOLD }}>
            FAZ
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="text-[clamp(1rem,2.5vw,1.25rem)] text-white/65 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Premium Men&apos;s Grooming &amp; Wedding Makeover
          Specialists
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: GOLD,
              color: "#080808",
              borderRadius: "2px",
              boxShadow: `0 0 40px ${GOLD}45`,
            }}
          >
            Book Appointment
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase border border-white/25 text-white hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300"
            style={{ borderRadius: "2px" }}
          >
            <Phone size={14} />
            Call Now
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase border border-[#25D366]/35 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
            style={{ borderRadius: "2px" }}
          >
            <MessageCircle size={14} />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.15 }}
          className="mt-20 flex justify-center gap-10 md:gap-16 flex-wrap"
        >
          {[
            ["1000+", "Happy Clients"],
            ["2", "Expert Stylists"],
            ["Premium", "Products Only"],
          ].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div
                className="text-[clamp(1.4rem,3vw,2rem)] font-bold leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: GOLD,
                }}
              >
                {val}
              </div>
              <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase mt-1.5">
                {lbl}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/25">
          Scroll
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <div className="w-0.5 h-2.5 rounded-full bg-[#C9A84C]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-28 md:py-36 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn dir="right">
            <div className="relative">
              <div
                className="relative overflow-hidden bg-[#111] h-[520px]"
                style={{ borderRadius: "2px" }}
              >
                <img
                  src={unsplash(
                    "photo-1621605815971-fbc98d665033",
                    700,
                    900,
                  )}
                  alt="FAZ Beauty Saloon premium grooming"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
              </div>
              {/* Gold corner accent */}
              <div
                className="absolute -top-4 -left-4 w-20 h-20 border-2 border-[#C9A84C]/35 pointer-events-none"
                style={{ borderRadius: "2px" }}
              />
              {/* Stat badge */}
              <div
                className="absolute -bottom-5 -right-5 px-7 py-5 shadow-2xl"
                style={{
                  backgroundColor: GOLD,
                  borderRadius: "2px",
                }}
              >
                <div
                  className="text-[2.5rem] font-bold text-[#080808] leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  1000+
                </div>
                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#080808]/70 mt-1">
                  Happy Clients
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn dir="left">
            <Label>Our Story</Label>
            <h2
              className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white leading-tight mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Where Style Meets{" "}
              <em
                className="not-italic"
                style={{ color: GOLD }}
              >
                Perfection
              </em>
            </h2>
            <GoldDivider />
            <p className="text-white/65 leading-[1.85] mb-10 mt-4 text-[15px]">
              Welcome to FAZ Beauty Saloon, where style meets
              perfection. Founded by{" "}
              <strong className="text-white font-medium">
                Fayiz
              </strong>
              , we specialize in premium men&apos;s grooming and
              wedding makeover services. With 1000+ satisfied
              clients, branded products, and skilled
              professionals, we deliver exceptional styling
              experiences tailored to every individual.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {WHY_CHOOSE.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3.5"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${GOLD}12`,
                      border: `1px solid ${GOLD}35`,
                      borderRadius: "2px",
                    }}
                  >
                    <Icon size={14} style={{ color: GOLD }} />
                  </div>
                  <span className="text-[13px] text-white/70 leading-tight">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      className="py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg,#0a0a0a 0%,#0d0b07 50%,#0a0a0a 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>What We Offer</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Services
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <FadeIn key={svc.title} delay={i * 0.1}>
                <div
                  className="group relative overflow-hidden h-full cursor-pointer transition-transform duration-500 hover:-translate-y-1.5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(201,168,76,0.14)",
                    borderRadius: "2px",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-[#1a1a1a]">
                    {svc.img === null ? (
                      <ImageWithFallback
                        src={weddingPhoto}
                        alt="Wedding groom makeover — FAZ Beauty Saloon"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={unsplash(svc.img, 400, 350)}
                        alt={svc.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{
                          transitionProperty: "transform",
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                    <div
                      className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center"
                      style={{
                        background: `${GOLD}22`,
                        border: `1px solid ${GOLD}55`,
                        borderRadius: "2px",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Icon size={16} style={{ color: GOLD }} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3
                      className="text-[17px] font-bold text-white mb-4"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {svc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-[13px] text-white/55"
                        >
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: GOLD }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}07 0%, transparent 100%)`,
                      border: `1px solid ${GOLD}35`,
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section id="team" className="py-28 md:py-36 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>The Experts</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet Our{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Team
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.18}>
              <div
                className="group relative overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(201,168,76,0.14)",
                  borderRadius: "2px",
                }}
              >
                <div className="relative h-[340px] overflow-hidden bg-[#181818]">
                  {member.name === "Fayiz" ? (
                    <ImageWithFallback
                      src={fayizPhoto}
                      alt="Fayiz — Founder & Master Stylist at FAZ Beauty Saloon"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : member.name === "Sabeel" ? (
                    <ImageWithFallback
                      src={sabeelPhoto}
                      alt="Sabeel — Senior Stylist at FAZ Beauty Saloon"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={unsplash(
                        member.img as string,
                        520,
                        640,
                      )}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent" />
                  <div
                    className="absolute top-4 right-4 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{
                      backgroundColor: GOLD,
                      color: "#080808",
                      borderRadius: "2px",
                    }}
                  >
                    {member.exp}
                  </div>
                </div>
                <div className="p-7">
                  <h3
                    className="text-[22px] font-bold text-white"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-[12px] font-semibold tracking-[0.15em] uppercase mt-1.5"
                    style={{ color: GOLD }}
                  >
                    {member.role}
                  </p>
                  <p className="text-[13px] text-white/45 mt-2 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section
      id="gallery"
      className="py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg,#0a0a0a 0%,#0d0b07 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>Our Work</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Style{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Gallery
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{
            gridAutoRows: "200px",
            gridAutoFlow: "dense",
          }}
        >
          {GALLERY.map((img, i) => (
            <FadeIn
              key={img.id}
              delay={i * 0.07}
              className={`relative overflow-hidden group bg-[#1a1a1a] ${img.tall ? "row-span-2" : ""}`}
              style={
                { borderRadius: "2px" } as React.CSSProperties
              }
            >
              <img
                src={unsplash(
                  img.id,
                  600,
                  img.tall ? 800 : 400,
                )}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-[13px] font-medium">
                  {img.alt}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  idx,
}: {
  stat: (typeof STATS)[0];
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = stat.value / 60;
    const id = setInterval(() => {
      n += step;
      if (n >= stat.value) {
        setCount(stat.value);
        clearInterval(id);
      } else {
        setCount(Math.floor(n));
      }
    }, 18);
    return () => clearInterval(id);
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: idx * 0.15 }}
      className="text-center py-10 px-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(201,168,76,0.15)",
        borderRadius: "2px",
      }}
    >
      <div
        className="w-12 h-12 mx-auto mb-5 flex items-center justify-center"
        style={{
          background: `${GOLD}15`,
          border: `1px solid ${GOLD}40`,
          borderRadius: "2px",
        }}
      >
        <Icon size={20} style={{ color: GOLD }} />
      </div>
      <div
        className="text-[2.8rem] font-bold leading-none mb-2"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: GOLD,
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div className="text-[11px] text-white/45 tracking-[0.2em] uppercase">
        {stat.label}
      </div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="py-28 md:py-36 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>By The Numbers</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Achievements
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section
      className="py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg,#0a0a0a 0%,#0d0b07 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>Client Reviews</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Clients{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Say
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map(
                    (_, j) => (
                      <Star
                        key={j}
                        size={13}
                        fill={GOLD}
                        style={{ color: GOLD }}
                      />
                    ),
                  )}
                </div>
                <p className="text-[14px] text-white/65 leading-[1.8] flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-white/5">
                  <div className="text-[13px] font-semibold text-white">
                    {t.name}
                  </div>
                  <div
                    className="text-[11px] tracking-wide mt-1"
                    style={{ color: GOLD }}
                  >
                    {t.service}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto md:max-w-none md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {TESTIMONIALS.slice(3).map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <GlassCard className="p-8">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map(
                    (_, j) => (
                      <Star
                        key={j}
                        size={13}
                        fill={GOLD}
                        style={{ color: GOLD }}
                      />
                    ),
                  )}
                </div>
                <p className="text-[14px] text-white/65 leading-[1.8] mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-white/5">
                  <div className="text-[13px] font-semibold text-white">
                    {t.name}
                  </div>
                  <div
                    className="text-[11px] tracking-wide mt-1"
                    style={{ color: GOLD }}
                  >
                    {t.service}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Business Hours ───────────────────────────────────────────────────────────

function BusinessHours() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="py-28 md:py-36 bg-[#080808]">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>When We Are Open</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Business{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Hours
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <FadeIn>
          <GlassCard className="overflow-hidden">
            {HOURS.map((h, i) => {
              const isToday = h.day === today;
              return (
                <div
                  key={h.day}
                  className={`flex justify-between items-center px-8 py-4.5 transition-colors duration-200 ${isToday
                    ? "bg-[#C9A84C]/08"
                    : "hover:bg-white/[0.015]"
                    } ${i < HOURS.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                  style={{ padding: "18px 32px" }}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: GOLD }}
                      />
                    )}
                    <span
                      className={`text-[14px] font-medium ${isToday ? "text-white" : "text-white/55"}`}
                    >
                      {h.day}
                      {isToday && (
                        <span
                          className="ml-2.5 text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5"
                          style={{
                            backgroundColor: `${GOLD}22`,
                            color: GOLD,
                            borderRadius: "2px",
                          }}
                        >
                          Today
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-[14px] font-medium tabular-nums ${h.open
                      ? isToday
                        ? "text-white"
                        : "text-white/60"
                      : "text-red-400/75"
                      }`}
                  >
                    {h.time}
                  </span>
                </div>
              );
            })}
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      className="py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg,#0a0a0a 0%,#0d0b07 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <Label>Get In Touch</Label>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact{" "}
            <em className="not-italic" style={{ color: GOLD }}>
              Us
            </em>
          </h2>
          <GoldDivider />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <FadeIn dir="right">
            <GlassCard className="p-10">
              <h3
                className="text-[26px] font-bold text-white mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                FAZ Beauty Saloon
              </h3>

              <div className="space-y-7 mb-10">
                {[
                  {
                    icon: Users,
                    label: "Founder",
                    val: "Fayiz",
                    link: null,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    val: PHONE_DISPLAY,
                    link: `tel:${PHONE}`,
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    val: "9:30 AM – 9:30 PM",
                    sub: "Closed every Tuesday",
                    link: null,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    val: "Padapparamb, Malappuram, Kerala",
                    link: null,
                  },
                ].map(
                  ({ icon: Icon, label, val, sub, link }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: `${GOLD}14`,
                          border: `1px solid ${GOLD}38`,
                          borderRadius: "2px",
                        }}
                      >
                        <Icon
                          size={15}
                          style={{ color: GOLD }}
                        />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/35 tracking-[0.25em] uppercase mb-1">
                          {label}
                        </div>
                        {link ? (
                          <a
                            href={link}
                            className="text-[15px] text-white font-medium hover:text-[#C9A84C] transition-colors"
                          >
                            {val}
                          </a>
                        ) : (
                          <div className="text-[15px] text-white font-medium">
                            {val}
                          </div>
                        )}
                        {sub && (
                          <div className="text-[12px] text-white/35 mt-0.5">
                            {sub}
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: GOLD,
                    color: "#080808",
                    borderRadius: "2px",
                  }}
                >
                  <Phone size={13} />
                  Call Now
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase border border-[#25D366]/35 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
                  style={{ borderRadius: "2px" }}
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase border border-white/15 text-white/70 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300"
                  style={{ borderRadius: "2px" }}
                >
                  Book Appointment
                </a>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn dir="left">
            <div
              className="overflow-hidden"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "2px",
                height: "480px",
              }}
            >
              <iframe
                title="FAZ Beauty Saloon — Padapparamba, Malappuram, Kerala"
                src="https://maps.google.com/maps?q=10.985274,76.107698&z=17&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    "invert(88%) hue-rotate(180deg) saturate(0.4) brightness(0.65)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(201,168,76,0.18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <div
              className="text-[2rem] font-bold tracking-[0.22em] mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: GOLD,
              }}
            >
              FAZ
            </div>
            <div className="text-[9px] tracking-[0.45em] text-white/30 uppercase mb-4">
              Beauty Saloon
            </div>
            <p className="text-[13px] text-white/45 leading-[1.8]">
              Premium Men&apos;s Grooming &amp; Wedding Makeover
              Studio. Where style meets perfection.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/faz_grooming?igsh=MTUwZzNzOHpyZTFiNg==",
                  label: "Instagram",
                },
                {
                  icon: MessageCircle,
                  href: WA_LINK,
                  label: "WhatsApp",
                },
                {
                  icon: Phone,
                  href: `tel:${PHONE}`,
                  label: "Phone",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#C9A84C]/60"
                  style={{
                    background: `${GOLD}12`,
                    border: `1px solid ${GOLD}30`,
                    borderRadius: "2px",
                  }}
                >
                  <Icon size={14} style={{ color: GOLD }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-7"
              style={{ color: GOLD }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-white/45 hover:text-white transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-7"
              style={{ color: GOLD }}
            >
              Contact Info
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  text: PHONE_DISPLAY,
                  href: `tel:${PHONE}`,
                },
                {
                  icon: Clock,
                  text: "9:30 AM – 9:30 PM (Tue: Closed)",
                },
                {
                  icon: MapPin,
                  text: "Padapparamba, Malappuram, Kerala",
                },
              ].map(({ icon: Icon, text, href }) => (
                <div
                  key={text}
                  className="flex items-center gap-3"
                >
                  <Icon
                    size={13}
                    style={{ color: GOLD }}
                    className="flex-shrink-0"
                  />
                  {href ? (
                    <a
                      href={href}
                      className="text-[13px] text-white/45 hover:text-white transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-[13px] text-white/45">
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-white/25"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} FAZ Beauty Saloon.
            All rights reserved.
          </div>
          <div>
            Designed with excellence &mdash; Founded by{" "}
            <span style={{ color: GOLD }}>Fayiz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Button ─────────────────────────────────────────────────

function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-7 right-7 z-50 w-[56px] h-[56px] flex items-center justify-center shadow-2xl"
      style={{
        backgroundColor: "#25D366",
        borderRadius: "50%",
      }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(37,211,102,0.45)",
          "0 0 0 18px rgba(37,211,102,0)",
        ],
      }}
      transition={{ duration: 1.8, repeat: Infinity }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      <MessageCircle
        size={26}
        className="text-white"
        fill="white"
      />
    </motion.a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      className="min-h-screen bg-[#080808]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Team />
            <Gallery />
            <Stats />
            <Testimonials />
            <BusinessHours />
            <Contact />
          </main>
          <Footer />
          <WhatsAppFloat />
        </>
      )}
    </div>
  );
}