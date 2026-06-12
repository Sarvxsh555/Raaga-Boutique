import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, COLLECTIONS } from "@/lib/boutique-data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

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

const productCategory = (collection?: string) => {
  if (collection === "Bridal Collections") return "Bridal";
  if (collection === "Kids Wear") return "Kids";
  if (collection === "Custom Designs") return "Custom";
  return collection;
};

function Catalog() {
  const { category } = Route.useSearch();
  const initial = category && COLLECTIONS.find(c => c.name === category)?.name;
  const [active, setActive] = useState<string | undefined>(initial ?? undefined);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);

  const filterOptions = useMemo(() => ({
    colors: [...new Set(PRODUCTS.flatMap(product => product.colors.map(color => color.name)))].sort(),
    sizes: [...new Set(PRODUCTS.flatMap(product => product.sizes))].sort(),
    occasions: [...new Set(PRODUCTS.map(product => product.occasion))].sort(),
    fabrics: [...new Set(PRODUCTS.map(product => product.fabric))].sort(),
  }), []);

  const toggle = (list: string[], value: string, set: (values: string[]) => void) =>
    set(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);

  const filtered = useMemo(() => {
    let results = PRODUCTS.filter(product => {
      const query = q.trim().toLowerCase();
      const searchable = [
        product.name,
        product.description,
        product.category,
        product.fabric,
        product.occasion,
        ...product.sizes,
        ...product.colors.map(color => color.name),
      ].join(" ").toLowerCase();
      if (query && !query.split(/\s+/).every(term => searchable.includes(term))) return false;
      if (active && product.category !== productCategory(active)) return false;
      if (colors.length && !product.colors.some(color => colors.includes(color.name))) return false;
      if (sizes.length && !product.sizes.some(size => sizes.includes(size))) return false;
      if (occasions.length && !occasions.includes(product.occasion)) return false;
      if (fabrics.length && !fabrics.includes(product.fabric)) return false;
      return true;
    });

    // Sort categories: Sarees first, then Lehengas, then Kids, then others
    const categoryOrder = ["Sarees", "Lehengas", "Kids"];
    results = [...results].sort((a, b) => {
      let indexA = categoryOrder.indexOf(a.category);
      let indexB = categoryOrder.indexOf(b.category);
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });

    return results;
  }, [active, colors, fabrics, occasions, q, sizes]);

  const activeFilterCount = colors.length + sizes.length + occasions.length + fabrics.length;
  const clearFilters = () => {
    setColors([]);
    setSizes([]);
    setOccasions([]);
    setFabrics([]);
  };

  const Pill = ({ active: selected, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} className={`rounded-full border px-3.5 py-1.5 text-xs transition ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
      {children}
    </button>
  );

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

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={event => setQ(event.target.value)}
              placeholder="Search silks, embroidery, occasion..."
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-5 text-[0.72rem] tracking-[0.2em] uppercase text-primary transition hover:bg-primary hover:text-primary-foreground">
            <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary">{activeFilterCount}</span>}
          </button>

        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <p>{filtered.length} of {PRODUCTS.length} pieces found</p>
          {(q || active || activeFilterCount > 0) && (
            <button onClick={() => { setQ(""); setActive(undefined); clearFilters(); }} className="text-primary underline-offset-4 hover:underline">
              Clear search and filters
            </button>
          )}
        </div>
      </section>

      <section className="container-luxe py-14">
        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No pieces in this chapter yet.</p>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-ivory shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <p className="font-display text-2xl text-primary">Filters</p>
                <button onClick={() => setOpen(false)} aria-label="Close filters"><X size={20} /></button>
              </div>
              <div className="space-y-8 p-6">

                <FilterGroup title="Color">
                  <div className="flex flex-wrap gap-2">{filterOptions.colors.map(color => <Pill key={color} active={colors.includes(color)} onClick={() => toggle(colors, color, setColors)}>{color}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title="Size">
                  <div className="flex flex-wrap gap-2">{filterOptions.sizes.map(size => <Pill key={size} active={sizes.includes(size)} onClick={() => toggle(sizes, size, setSizes)}>{size}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title="Occasion">
                  <div className="flex flex-wrap gap-2">{filterOptions.occasions.map(occasion => <Pill key={occasion} active={occasions.includes(occasion)} onClick={() => toggle(occasions, occasion, setOccasions)}>{occasion}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title="Fabric">
                  <div className="flex flex-wrap gap-2">{filterOptions.fabrics.map(fabric => <Pill key={fabric} active={fabrics.includes(fabric)} onClick={() => toggle(fabrics, fabric, setFabrics)}>{fabric}</Pill>)}</div>
                </FilterGroup>
                <div className="flex gap-3 pt-4">
                  <button onClick={clearFilters} className="flex-1 rounded-full border border-border py-3 text-xs tracking-[0.2em] uppercase">Reset</button>
                  <button onClick={() => setOpen(false)} className="flex-1 rounded-full bg-primary py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground">Apply</button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[0.7rem] tracking-[0.3em] uppercase text-primary">{title}</p>
      {children}
    </div>
  );
}
