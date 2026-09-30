import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChefHat,
  Clock3,
  Facebook,
  Instagram,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  Navigation,
  Phone,
  Quote,
  Send,
  Sparkles,
  Star,
  Utensils,
  Users,
  Wine,
  X,
} from "lucide-react";
import { toast } from "sonner";
import restaurantPhoto from "../../../images/unnamed.jpg";

const images = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=88",
  plates: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
  pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85",
  salad: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85",
  dessert: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=85",
  interior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
  table: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  soup: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
};

const menuData = {
  Plates: [
    { name: "Smoky Grill Plate", description: "Sample menu item · replace with your signature plate", price: "LSL 185", image: images.hero, tag: "Sample favourite" },
    { name: "The Cookhouse Bowl", description: "Sample menu item · replace with current description", price: "LSL 145", image: images.plates, tag: "Sample plate" },
    { name: "Seasonal Table Plate", description: "Sample menu item · update with seasonal offering", price: "LSL 165", image: images.salad, tag: "Sample seasonal" },
  ],
  "Small Plates": [
    { name: "Shared Table Starter", description: "Sample menu item · replace with your starter", price: "LSL 95", image: images.soup, tag: "Sample starter" },
    { name: "Garden & Grain", description: "Sample menu item · replace with current description", price: "LSL 88", image: images.salad, tag: "Sample plate" },
    { name: "House Dip Board", description: "Sample menu item · update with your sharing plate", price: "LSL 105", image: images.plates, tag: "Sample to share" },
  ],
  Sweet: [
    { name: "Warm Finish", description: "Sample menu item · replace with your dessert", price: "LSL 75", image: images.dessert, tag: "Sample dessert" },
    { name: "Seasonal Sweet Plate", description: "Sample menu item · update with current offering", price: "LSL 68", image: images.dessert, tag: "Sample sweet" },
    { name: "After-Dinner Pour", description: "Sample menu item · replace with your drinks detail", price: "LSL 55", image: images.table, tag: "Sample pour" },
  ],
} as const;

type MenuCategory = keyof typeof menuData;

const navItems = [
  { label: "Story", target: "story" },
  { label: "Menu", target: "menu" },
  { label: "Gallery", target: "gallery" },
  { label: "Visit", target: "visit" },
];

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Plates");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Enquiry received", {
      description: "Thanks — the Lake Cookhouse team can confirm your request on 5699 9501.",
    });
    event.currentTarget.reset();
  };

  const showPlaceholder = (label: string) => {
    toast(`${label} placeholder`, { description: "Add the live social link when it is ready." });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#1b1a16]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-[#17140f]/95 shadow-lg shadow-black/10 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button className="group flex items-center gap-3 text-left text-white" onClick={() => scrollToSection("top")} aria-label="Back to top">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c99a5d]/70 text-[#d9ad72] transition-transform duration-200 group-hover:rotate-12">
              <ChefHat size={18} strokeWidth={1.5} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[21px] tracking-[0.02em]">Lake</span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.31em] text-[#d9ad72]">Cookhouse</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item.target} onClick={() => scrollToSection(item.target)} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors duration-200 hover:text-[#e3b474]">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:56999501" className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-[#e3b474] lg:flex">
              <Phone size={14} /> 5699 9501
            </a>
            <button onClick={() => scrollToSection("reserve")} className="hidden rounded-full bg-[#d5a363] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#231a10] transition-all duration-200 hover:bg-[#ecc48e] active:scale-[.97] sm:block">
              Reserve a table
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white md:hidden" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}>
              {mobileMenuOpen ? <X size={19} /> : <MenuIcon size={19} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#17140f]/98 px-5 py-5 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button key={item.target} onClick={() => { scrollToSection(item.target); setMobileMenuOpen(false); }} className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {item.label}
                </button>
              ))}
              <button onClick={() => { scrollToSection("reserve"); setMobileMenuOpen(false); }} className="mt-2 w-full rounded-full bg-[#d5a363] px-5 py-3 text-xs font-bold uppercase tracking-[0.17em] text-[#231a10]">Reserve a table</button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#211a12] pb-16 pt-32 sm:min-h-[790px] sm:pb-20 lg:min-h-[850px] lg:pb-24">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images.hero})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,15,10,.83)_0%,rgba(22,16,9,.48)_46%,rgba(18,14,10,.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,12,8,.82)_0%,transparent_55%)]" />
          <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-[780px] animate-[riseIn_.8s_.1s_both]">
              <div className="mb-6 flex items-center gap-3 text-[#e2b87d]">
                <span className="h-px w-12 bg-[#d5a363]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.32em]">Airport Road · Maseru</span>
              </div>
              <h1 className="max-w-[750px] font-display text-[clamp(4.25rem,10vw,9.1rem)] leading-[.78] tracking-[-0.065em] text-[#fbf5ea]">
                Good Food.<br /><em className="ml-[.1em] text-[#e3b474]">Great Moments.</em>
              </h1>
              <p className="mt-9 max-w-[455px] text-[15px] leading-7 text-white/75 sm:text-[17px] sm:leading-8">
                A warm table for slow lunches, late dinners and the little celebrations in between. Welcome to Lake Cookhouse.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => scrollToSection("menu")} className="group flex items-center gap-3 rounded-full bg-[#d5a363] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#241b10] transition-all duration-200 hover:bg-[#f0c58f] active:scale-[.97]">
                  View menu <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button onClick={() => scrollToSection("reserve")} className="flex items-center gap-3 rounded-full border border-white/40 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:border-[#e3b474] hover:text-[#e3b474] active:scale-[.97]">
                  Reserve a table <CalendarDays size={16} />
                </button>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-3 text-white/55 sm:absolute sm:bottom-0 sm:right-8 sm:mt-0 lg:right-12">
              <ArrowDown size={15} className="animate-bounce" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Scroll to explore</span>
            </div>
          </div>
        </section>

        <section id="story" className="relative overflow-hidden bg-[#f4f0e8] py-24 sm:py-32 lg:py-40">
          <div className="absolute -right-28 top-28 h-80 w-80 rounded-full bg-[#d5a363]/10 blur-3xl" aria-hidden="true" />
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-12">
            <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
              <div className="absolute -left-4 -top-4 h-full w-full border border-[#c99a5d]/50 sm:-left-5 sm:-top-5" aria-hidden="true" />
              <div className="relative aspect-[.86] overflow-hidden bg-[#ded4c5]">
                <img src={restaurantPhoto} alt="Lake Cookhouse patio and restaurant exterior" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-[#1b1a16]/90 px-4 py-3 text-[#f5ebdd] backdrop-blur-sm">
                  <Sparkles size={16} className="text-[#d5a363]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Come as you are</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-3 hidden w-40 border border-[#e1d7c7] bg-[#f4f0e8] p-2 sm:block lg:-right-12">
                <img src={images.plates} alt="Plates set on a restaurant table" className="aspect-square w-full object-cover" />
              </div>
            </div>
            <div className="max-w-[610px]">
              <div className="section-kicker">The Lake Cookhouse feeling</div>
              <h2 className="mt-5 max-w-[600px] font-display text-[clamp(3.1rem,6vw,5.8rem)] leading-[.9] tracking-[-0.055em] text-[#252018]">
                A good table<br /><em className="text-[#ae7941]">does more.</em>
              </h2>
              <p className="mt-8 max-w-[520px] text-[17px] leading-8 text-[#5f584d]">
                Lake Cookhouse is a place to settle in. A little unhurried, a little unexpected, and always centred around the pleasure of sharing a meal.
              </p>
              <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-[#7c7468]">
                On Airport Road in Maseru, the mood is easy: beautiful plates, warm light and room for the moments you want to remember.
              </p>
              <button onClick={() => scrollToSection("menu")} className="group mt-9 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b5b2d] transition-colors hover:text-[#52351c]">
                Explore the sample menu <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </section>

        <section id="menu" className="bg-[#1c1a15] py-24 text-[#f8f1e6] sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <div className="section-kicker text-[#d5a363]">From the kitchen</div>
                <h2 className="mt-5 max-w-[650px] font-display text-[clamp(3.2rem,6vw,6.3rem)] leading-[.88] tracking-[-0.06em]">Made for the<br /><em className="text-[#d5a363]">middle of the table.</em></h2>
              </div>
              <div className="max-w-[360px] lg:pb-2">
                <div className="mb-3 inline-flex items-center gap-2 border border-[#d5a363]/50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#e0b77a]"><Sparkles size={12} /> Sample menu</div>
                <p className="text-[13px] leading-6 text-white/55">The menu below is a visual sample and can be replaced with Lake Cookhouse’s current dishes and prices.</p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-2 border-b border-white/10 pb-5">
              {(Object.keys(menuData) as MenuCategory[]).map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-200 ${activeCategory === category ? "bg-[#d5a363] text-[#271d11]" : "border border-white/15 text-white/55 hover:border-[#d5a363]/60 hover:text-[#d5a363]"}`}>
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-5 pt-8 md:grid-cols-3">
              {menuData[activeCategory].map((item, index) => (
                <article key={item.name} className="group animate-[riseIn_.5s_both]" style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="relative aspect-[1.06] overflow-hidden bg-[#2b271f]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 bg-[#f4f0e8] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#4d3821]">{item.tag}</span>
                    <span className="absolute bottom-4 right-4 font-display text-2xl text-white">{item.price}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-white/12 py-5">
                    <div>
                      <h3 className="font-display text-2xl tracking-[-0.02em] text-[#fbf4e8]">{item.name}</h3>
                      <p className="mt-1 text-[12px] leading-5 text-white/45">{item.description}</p>
                    </div>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-[#d5a363] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/35">All prices shown in LSL · sample content for layout</p>
              <button onClick={() => scrollToSection("reserve")} className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#d5a363]">Ask about today’s menu <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            </div>
          </div>
        </section>

        <section className="bg-[#d5a363] py-16 sm:py-20">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center lg:px-12">
            <div className="flex items-start gap-5">
              <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#3b2919]/30 text-[#3b2919]"><Wine size={21} strokeWidth={1.5} /></div>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c3d20]">Your next great moment</p><h3 className="mt-2 font-display text-3xl tracking-[-0.03em] text-[#271d11] sm:text-4xl">Bring your appetite. We’ll set the table.</h3></div>
            </div>
            <button onClick={() => scrollToSection("reserve")} className="flex shrink-0 items-center gap-3 rounded-full bg-[#241b11] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.17em] text-[#f9ebd5] transition-all duration-200 hover:bg-[#4b321b] active:scale-[.97]">Make an enquiry <ArrowUpRight size={16} /></button>
          </div>
        </section>

        <section id="gallery" className="overflow-hidden bg-[#eee8dc] py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><div className="section-kicker">A seat at the table</div><h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.86] tracking-[-0.06em] text-[#272119]">Take a look<br /><em className="text-[#ae7941]">around.</em></h2></div>
              <p className="max-w-[290px] pb-2 text-sm leading-6 text-[#756d60]">An atmosphere built for lingering. Browse the mood, then come make it yours.</p>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              <div className="group col-span-2 aspect-[1.35] overflow-hidden bg-[#ded3c2]"><img src={images.table} alt="Restaurant table with plated food" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
              <div className="group aspect-[.76] overflow-hidden bg-[#ded3c2]"><img src={images.dessert} alt="Dessert plate" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
              <div className="group aspect-[.76] overflow-hidden bg-[#ded3c2]"><img src={images.pasta} alt="Pasta dish" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
              <div className="group aspect-[.76] overflow-hidden bg-[#ded3c2]"><img src={images.soup} alt="Soup bowl" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
              <div className="group col-span-2 aspect-[1.35] overflow-hidden bg-[#ded3c2] lg:col-span-1"><img src={images.interior} alt="Warm restaurant interior" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-end lg:gap-24">
              <div><div className="section-kicker">Why dine with us</div><h2 className="mt-5 font-display text-[clamp(3.1rem,5.8vw,5.8rem)] leading-[.9] tracking-[-0.06em] text-[#282219]">The details<br /><em className="text-[#ae7941]">matter here.</em></h2><p className="mt-7 max-w-[420px] text-[15px] leading-7 text-[#6c6458]">Good food is only the beginning. The rest is the feeling you take with you when you leave.</p></div>
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {[
                  { icon: Utensils, title: "Food first", copy: "A menu-led experience that keeps the plate at the heart of the occasion." },
                  { icon: Leaf, title: "Easy atmosphere", copy: "Warm, considered and never overdone — a place to feel immediately at home." },
                  { icon: Users, title: "Made to share", copy: "Bring the people you like. There is always room for one more around the table." },
                  { icon: Clock3, title: "Stay awhile", copy: "Come for a quick bite or settle in for the whole evening. Your table is yours." },
                ].map(({ icon: Icon, title, copy }, index) => (
                  <div key={title} className="border-t border-[#cfc4b4] pt-5">
                    <div className="flex items-center gap-3"><Icon size={18} strokeWidth={1.5} className="text-[#ae7941]" /><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a5f33]">0{index + 1}</span></div>
                    <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-[#30281e]">{title}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#766e62]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-24 overflow-hidden bg-[#262018] px-7 py-12 sm:px-14 sm:py-16">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(213,163,99,.18),transparent_66%)]" aria-hidden="true" />
              <Quote size={42} strokeWidth={1} className="absolute right-8 top-8 text-[#d5a363]/30 sm:right-14 sm:top-12" />
              <div className="relative max-w-[750px]"><p className="font-display text-[clamp(2rem,4vw,3.6rem)] leading-[1.03] tracking-[-0.035em] text-[#f8f0e3]">“The best evenings are the ones that don’t need a reason.”</p><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5a363]">The Lake Cookhouse promise</p></div>
            </div>
          </div>
        </section>

        <section id="visit" className="bg-[#1c1a15] py-24 text-[#f8f1e6] sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-24 lg:px-12">
            <div>
              <div className="section-kicker text-[#d5a363]">Find your way here</div>
              <h2 className="mt-5 font-display text-[clamp(3.4rem,6.7vw,6.7rem)] leading-[.84] tracking-[-0.06em]">Make a night<br /><em className="text-[#d5a363]">of it.</em></h2>
              <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-white/55">Whether it’s a quick catch-up or a table full of friends, we’re ready when you are.</p>
              <div className="mt-10 space-y-6">
                <a href="https://www.google.com/maps/search/?api=1&query=Airport+Road%2C+Maseru+100%2C+Lesotho" target="_blank" rel="noreferrer" className="group flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d5a363]/50 text-[#d5a363]"><MapPin size={17} /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5a363]">Location</span><span className="mt-1 block text-[16px] text-white/85">Airport Road, Maseru 100</span><span className="mt-1 flex items-center gap-1 text-[11px] text-white/45 transition-colors group-hover:text-[#d5a363]">Open in maps <ArrowUpRight size={13} /></span></span>
                </a>
                <a href="tel:56999501" className="group flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d5a363]/50 text-[#d5a363]"><Phone size={17} /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5a363]">Call us</span><span className="mt-1 block text-[16px] text-white/85">5699 9501</span><span className="mt-1 block text-[11px] text-white/45 transition-colors group-hover:text-[#d5a363]">For reservations & enquiries</span></span>
                </a>
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden border border-white/10 bg-[#29251e]">
              <img src={restaurantPhoto} alt="Lake Cookhouse patio and restaurant exterior" className="absolute inset-0 h-full w-full object-cover opacity-45" />
              <div className="absolute inset-0 bg-[#1c1a15]/45" />
              <div className="grain absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center px-7 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d5a363] bg-[#1c1a15]/70 text-[#d5a363] shadow-2xl"><Navigation size={25} strokeWidth={1.3} /></div>
                <p className="mt-7 font-display text-3xl text-[#fff7eb]">Airport Road</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d5a363]">Maseru 100 · Lesotho</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Airport+Road%2C+Maseru+100%2C+Lesotho" target="_blank" rel="noreferrer" className="mt-8 flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-white transition-colors hover:border-[#d5a363] hover:text-[#d5a363]">Get directions <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="reserve" className="bg-[#d5a363] py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-24 lg:px-12">
            <div><div className="section-kicker text-[#5f3d1c]">Your table is waiting</div><h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.86] tracking-[-0.06em] text-[#241a10]">Let’s make<br /><em className="text-[#7d4e25]">a plan.</em></h2><p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#5d4025]">Send an enquiry and the Lake Cookhouse team can confirm the details with you directly.</p><div className="mt-8 flex items-center gap-3 text-[#5f3d1c]"><Check size={16} /><span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Fastest response: call 5699 9501</span></div></div>
            <form onSubmit={handleReservation} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <label className="field-label">Your name<input required name="name" type="text" placeholder="Full name" /></label>
              <label className="field-label">Phone number<input required name="phone" type="tel" placeholder="e.g. 5699 9501" /></label>
              <label className="field-label">Preferred date<input required name="date" type="date" /></label>
              <label className="field-label">Guests<select required name="guests" defaultValue=""><option value="" disabled>Select guests</option><option>2 guests</option><option>3–4 guests</option><option>5–8 guests</option><option>9+ guests</option></select></label>
              <label className="field-label sm:col-span-2">Anything we should know? <textarea name="message" rows={3} placeholder="A special occasion, preferred time or question…" /></label>
              <div className="sm:col-span-2"><button type="submit" className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#241a10] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f9ebd5] transition-all duration-200 hover:bg-[#4b321b] active:scale-[.99]">Send enquiry <Send size={16} className="transition-transform duration-200 group-hover:translate-x-1" /></button><p className="mt-3 text-center text-[10px] text-[#5e4228]">This form is a design placeholder — enquiries can be connected to your preferred booking workflow.</p></div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#17140f] py-12 text-[#f8f1e6] sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
            <div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c99a5d]/70 text-[#d9ad72]"><ChefHat size={18} strokeWidth={1.5} /></span><span className="font-display text-3xl">Lake Cookhouse</span></div><p className="mt-5 max-w-[340px] text-[13px] leading-6 text-white/40">Good food, great moments, and a table ready for you in Maseru.</p></div>
            <div className="flex gap-3"><button onClick={() => showPlaceholder("Instagram")} aria-label="Instagram placeholder" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-[#d5a363] hover:text-[#d5a363]"><Instagram size={17} /></button><button onClick={() => showPlaceholder("Facebook")} aria-label="Facebook placeholder" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-[#d5a363] hover:text-[#d5a363]"><Facebook size={17} /></button></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} Lake Cookhouse</span><div className="flex flex-wrap gap-x-6 gap-y-2"><a href="tel:56999501" className="transition-colors hover:text-[#d5a363]">5699 9501</a><span>Airport Road, Maseru 100</span><button onClick={() => scrollToSection("top")} className="transition-colors hover:text-[#d5a363]">Back to top ↑</button></div></div>
        </div>
      </footer>
    </div>
  );
}
