import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/boutique-data";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Raaga Boutique" },
      { name: "description", content: "Read what our clients say about Raaga Boutique's couture, bridal and bespoke experiences." },
      { property: "og:title", content: "Reviews — Raaga Boutique" },
      { property: "og:description", content: "Words from the women we dress." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const looped = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="pt-32">
      <section className="container-luxe text-center">
        <Reveal>
          <p className="eyebrow">Loved & Worn</p>
          <h1 className="mt-4 font-display text-5xl text-primary md:text-7xl text-balance">A house built on whispered referrals.</h1>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex text-accent">{Array.from({length: 5}).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
            <span className="font-display text-2xl text-primary">4.97</span>
            <span className="text-sm text-muted-foreground">· 1,284 reviews</span>
          </div>
        </Reveal>
      </section>

      <section className="mt-20 overflow-hidden py-6">
        <div className="flex animate-marquee gap-6">
          {looped.map((t, i) => (
            <div key={i} className="w-[360px] shrink-0 rounded-lg border border-border bg-card p-6">
              <Quote className="text-accent" size={22} />
              <p className="mt-4 font-display text-lg leading-snug text-primary">"{t.text.slice(0, 110)}…"</p>
              <p className="mt-4 text-xs tracking-[0.25em] uppercase text-muted-foreground">{t.name} · {t.city}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20">
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-xl hover:shadow-primary/10">
                <div className="flex gap-1 text-accent">{Array.from({length: t.rating}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <p className="mt-5 font-display text-xl leading-relaxed text-primary">"{t.text}"</p>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
