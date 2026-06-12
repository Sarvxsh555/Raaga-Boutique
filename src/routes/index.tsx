import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Quote, Star } from "lucide-react";
import hero from "@/assets/hero-1.jpg";
import { COLLECTIONS, PRODUCTS, TESTIMONIALS } from "@/lib/boutique-data";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raaga Boutique — Luxury Indian Couture" },
      { name: "description", content: "Premium sarees, lehengas and bridal couture, hand-crafted in our Mumbai atelier." },
      { property: "og:title", content: "Raaga Boutique" },
      { property: "og:description", content: "Premium sarees, lehengas and bridal couture." },
    ],
  }),
  component: Home,
});

const fade = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } } };

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="overflow-hidden">
      <section ref={heroRef} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ivory">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img src={hero} alt="Raaga signature look" className="absolute inset-y-0 right-0 w-full md:w-[65%] h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-ivory/0 to-ivory" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/40 to-transparent" />
        </motion.div>

        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 pt-32">
          <motion.div
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
            className="max-w-3xl"
          >
            <motion.p variants={fade} className="eyebrow flex items-center gap-3">
              <span className="gold-divider" /> A House of Couture · Est. 2014
            </motion.p>
            <motion.h1 variants={fade} className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-primary text-balance">
              Heritage,<br/><em className="not-italic text-foreground">re-imagined</em>.
            </motion.h1>
            <motion.p variants={fade} className="mt-8 max-w-xl text-base text-foreground/80 md:text-lg">
              Sarees, lehengas and bespoke couture, hand-finished in our Mumbai atelier for the women who wear their stories.
            </motion.p>
            <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/catalog"><MagneticButton variant="primary">Shop Collection <ArrowRight size={14} /></MagneticButton></Link>
              <Link to="/appointments"><MagneticButton variant="ghost">Book Appointment</MagneticButton></Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 right-6 hidden flex-col items-center gap-2 md:flex"
        >
          <span className="text-[0.65rem] tracking-[0.4em] uppercase text-primary/70">Scroll</span>
          <motion.span animate={{ height: [10, 30, 10] }} transition={{ duration: 2.4, repeat: Infinity }} className="block w-px bg-primary/50" />
        </motion.div>
      </section>

      <section className="border-y border-border/60 bg-primary py-5 text-primary-foreground">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-16 pr-16 font-display text-2xl whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) =>
              ["Handloomed Silks", "·", "Bridal Couture", "·", "Zardozi Atelier", "·", "Made in India", "·", "Bespoke Fittings", "·"].map((t, j) => (
                <span key={`${i}-${j}`} className="opacity-90">{t}</span>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="container-luxe py-28 md:py-36">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow flex items-center gap-3"><Sparkles size={12} /> Featured Collections</p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl text-primary md:text-6xl text-balance">A wardrobe composed in six chapters.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/catalog" className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-primary">
              View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <StaggerItem key={c.slug}>
              <Link to="/catalog" search={{ category: c.name }} className="group relative block overflow-hidden rounded-md bg-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-primary-foreground">
                    <p className="text-[0.65rem] tracking-[0.3em] uppercase opacity-80">Chapter {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-3xl">{c.name}</h3>
                    <p className="mt-1 text-sm opacity-80">{c.tagline}</p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-luxe grid grid-cols-2 gap-12 md:grid-cols-4">
          {[
            { n: "12", l: "Years of Craft" },
            { n: "84", l: "Artisans in Atelier" },
            { n: "2.4k", l: "Brides Dressed" },
            { n: "9", l: "Cities Shipped" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-display text-5xl text-primary md:text-7xl">{s.n}</p>
              <p className="mt-2 text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-luxe py-28 md:py-36">
        <Reveal>
          <p className="eyebrow">Latest Arrivals</p>
          <h2 className="mt-4 font-display text-5xl text-primary md:text-6xl">Just unveiled.</h2>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="relative overflow-hidden bg-primary py-28 text-primary-foreground md:py-36">
        <Quote className="absolute -top-8 left-10 opacity-10" size={220} />
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow text-primary-foreground/70">Whispered to us</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl text-primary-foreground md:text-6xl text-balance">Words from the women we dress.</h2>
          </Reveal>
          <Stagger className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <StaggerItem key={t.name}>
                <div className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 p-8 backdrop-blur-sm">
                  <div className="flex gap-1 text-accent">{Array.from({length: t.rating}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                  <p className="mt-5 font-display text-xl leading-relaxed">"{t.text}"</p>
                  <p className="mt-6 text-xs tracking-[0.2em] uppercase opacity-70">{t.name} · {t.city}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-luxe py-28 text-center md:py-36">
        <Reveal>
          <span className="gold-divider mx-auto block" />
          <h2 className="mt-8 font-display text-5xl text-primary md:text-7xl text-balance">
            Step into the atelier.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Private viewings, bridal consultations and bespoke fittings — by appointment only.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/appointments"><MagneticButton>Reserve your visit</MagneticButton></Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
