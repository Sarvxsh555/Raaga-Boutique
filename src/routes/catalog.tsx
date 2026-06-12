import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, COLLECTIONS } from "@/lib/boutique-data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Collections — Raaga Boutique" },
      { name: "description", content: "Explore sarees, kurtis, lehengas, bridal couture and bespoke designs from Raaga Boutique." },
      { property: "og:title", content: "Collections — Raaga Boutique" },
      { property: "og:description", content: "Sarees, lehengas, bridal couture and bespoke designs." },
    ],
  }),
  validateSearch: searchSchema,
  component: Catalog,
});

function Catalog() {
  const { category } = Route.useSearch();
  const initial = category && COLLECTIONS.find(c => c.name === category)?.name;
  const [active, setActive] = useState<string | undefined>(initial ?? undefined);
  const filtered = useMemo(() => active ? PRODUCTS.filter(p => p.category === active || (active === "Bridal Collections" && p.category === "Bridal")) : PRODUCTS, [active]);

  return (
    <div className="pt-32">
      <section className="container-luxe">
        <Reveal>
          <p className="eyebrow">The Collections</p>
          <h1 className="mt-4 font-display text-5xl text-primary md:text-7xl text-balance">Six chapters of couture.</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">From everyday kurtis to once-in-a-lifetime bridal — each piece is hand-finished in our Mumbai atelier.</p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(undefined)}
            className={`rounded-full border px-5 py-2 text-[0.7rem] tracking-[0.2em] uppercase transition ${!active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
          >All</button>
          {COLLECTIONS.map(c => (
            <button
              key={c.slug}
              onClick={() => setActive(c.name)}
              className={`rounded-full border px-5 py-2 text-[0.7rem] tracking-[0.2em] uppercase transition ${active === c.name ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
            >{c.name}</button>
          ))}
        </div>
      </section>

      <section className="container-luxe py-16">
        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <Stagger className="contents">
            {filtered.map((p) => (
              <StaggerItem key={p.id}><ProductCard product={p} /></StaggerItem>
            ))}
          </Stagger>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No pieces in this chapter yet.</p>
        )}
      </section>
    </div>
  );
}
