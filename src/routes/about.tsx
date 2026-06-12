import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import boutique from "@/assets/about-boutique.jpg";
import designer from "@/assets/designer.jpg";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Atelier — Raaga Boutique" },
      { name: "description", content: "The story of Raaga Boutique — a Mumbai atelier crafting heritage couture with contemporary sensibility." },
      { property: "og:title", content: "Atelier — Raaga Boutique" },
      { property: "og:description", content: "Inside our Mumbai atelier — the people, the craft, the values." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "2014", t: "A small studio in Bandra", d: "Three artisans, one mannequin, and a clear belief in slow couture." },
  { y: "2017", t: "First bridal commission", d: "An heirloom lehenga begins our journey into bridal." },
  { y: "2020", t: "Atelier expansion", d: "We grow into a 4,000 sq ft house, with a dedicated zardozi wing." },
  { y: "2023", t: "Bespoke programme launches", d: "Made-to-measure couture for clients across nine cities." },
  { y: "2026", t: "Ten years young", d: "A decade of craft, with our hands still on every piece." },
];

const VALUES = [
  { t: "Slow couture", d: "Every garment is hand-finished. Nothing leaves the atelier in a hurry." },
  { t: "Heritage craft", d: "Zardozi, aari, gota and chikankari — kept alive by master artisans." },
  { t: "Quiet luxury", d: "Confidence over ornament. We dress, we don't decorate." },
];

function About() {
  return (
    <div className="pt-32">
      <section className="container-luxe">
        <Reveal>
          <p className="eyebrow">The Atelier</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl text-primary md:text-7xl text-balance">A house for women who wear their stories.</h1>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <motion.img src={boutique} alt="Raaga Boutique interior" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.6 }} />
          </Reveal>
          <Reveal delay={0.15} className="self-end md:col-span-5">
            <p className="leading-relaxed text-muted-foreground">
              Raaga began in 2014, in a small Bandra studio with three artisans and a quiet conviction — that Indian couture deserved patience, that fabric had memory, and that women dressed for themselves first.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Twelve years on, our work is still hand-finished, still measured, still personal. The atelier has grown, but every piece passes our designer's eye before it travels to yours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe mt-28 grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <motion.img src={designer} alt="Founder and head designer" loading="lazy" className="aspect-[4/5] w-full rounded-md object-cover" whileHover={{ scale: 1.02 }} transition={{ duration: 0.6 }} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Founder · Head Designer</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Tara Raichand</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            A graduate of NIFT and a former apprentice in Banaras, Tara founded Raaga with one rule — never compromise on the hand of the maker. She still sketches each bridal commission personally.
          </p>
          <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-2xl italic text-primary">
            "A saree should feel like a sentence the wearer finishes."
          </blockquote>
        </Reveal>
      </section>

      <section className="container-luxe mt-28">
        <Reveal>
          <p className="eyebrow">What we believe</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-6xl">Three quiet rules.</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <StaggerItem key={v.t}>
              <div className="h-full rounded-lg border border-border bg-card p-8">
                <p className="font-display text-5xl text-accent/60">0{i+1}</p>
                <h3 className="mt-4 font-display text-2xl text-primary">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-luxe mb-12 mt-28">
        <Reveal>
          <p className="eyebrow">Our journey</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-6xl">A decade in stitches.</h2>
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-3 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <Stagger className="space-y-12">
            {TIMELINE.map((m, i) => (
              <StaggerItem key={m.y}>
                <div className={`relative grid gap-4 md:grid-cols-2 md:items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <p className="font-display text-5xl text-accent">{m.y}</p>
                    <h3 className="mt-2 font-display text-2xl text-primary">{m.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
                  </div>
                  <div className="hidden md:block" />
                  <motion.span
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    className="absolute left-0 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </motion.span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
