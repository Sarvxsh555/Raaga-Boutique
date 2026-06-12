import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/lib/boutique-data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Discover — Raaga Boutique" },
      { name: "description", content: "Search and filter Raaga's couture collection by category, price, color, size and occasion." },
      { property: "og:title", content: "Discover — Raaga Boutique" },
      { property: "og:description", content: "Search and filter Raaga's couture collection." },
    ],
  }),
  component: Discover,
});

const CATEGORIES = ["Sarees", "Kurtis", "Lehengas", "Bridal", "Kids", "Custom"];
const COLORS = ["Ink Blue", "Ivory", "Champagne", "Blush", "Sand", "Midnight"];
const SIZES = ["XS", "S", "M", "L", "XL", "Free Size"];
const OCCASIONS = ["Wedding", "Bridal", "Reception", "Cocktail", "Daywear", "Festive", "Bespoke"];

function Discover() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState<string[]>([]);
  const [cols, setCols] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [occs, setOccs] = useState<string[]>([]);
  const [price, setPrice] = useState(200000);
  const [sort, setSort] = useState<"new" | "low" | "high">("new");

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const toggle = (list: string[], v: string, set: (l: string[]) => void) =>
    set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const results = useMemo(() => {
    let r = PRODUCTS.filter(p => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.description.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (occs.length && !occs.includes(p.occasion)) return false;
      if (cols.length && !p.colors.some(c => cols.includes(c.name))) return false;
      if (sizes.length && !p.sizes.some(s => sizes.includes(s))) return false;
      if (p.price && p.price > price) return false;
      return true;
    });
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [q, cats, cols, sizes, occs, price, sort]);

  const Pill = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} className={`rounded-full border px-3.5 py-1.5 text-xs transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
      {children}
    </button>
  );

  return (
    <div className="pt-32">
      <section className="container-luxe">
        <Reveal>
          <p className="eyebrow">Discover</p>
          <h1 className="mt-4 font-display text-5xl text-primary md:text-7xl">Find your piece.</h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search silks, embroidery, occasion…"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-full border border-primary px-5 text-[0.72rem] tracking-[0.2em] uppercase text-primary transition hover:bg-primary hover:text-primary-foreground">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select value={sort} onChange={e => setSort(e.target.value as "new" | "low" | "high")} className="h-12 rounded-full border border-border bg-card px-5 text-sm">
            <option value="new">Newest</option>
            <option value="low">Price · Low to High</option>
            <option value="high">Price · High to Low</option>
          </select>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{loading ? "Curating…" : `${results.length} pieces found`}</p>
      </section>

      <section className="container-luxe py-14">
        {loading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] w-full rounded-md skeleton" />
                <div className="h-3 w-1/2 rounded skeleton" />
                <div className="h-3 w-1/3 rounded skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {results.map(p => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-ivory shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border p-6">
                <p className="font-display text-2xl text-primary">Filters</p>
                <button onClick={() => setOpen(false)}><X size={20} /></button>
              </div>
              <div className="space-y-8 p-6">
                <FilterGroup title="Category">
                  <div className="flex flex-wrap gap-2">{CATEGORIES.map(c => <Pill key={c} active={cats.includes(c)} onClick={() => toggle(cats, c, setCats)}>{c}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title={`Price · up to ₹${price.toLocaleString("en-IN")}`}>
                  <input type="range" min={5000} max={200000} step={1000} value={price} onChange={e => setPrice(+e.target.value)} className="w-full accent-primary" />
                </FilterGroup>
                <FilterGroup title="Color">
                  <div className="flex flex-wrap gap-2">{COLORS.map(c => <Pill key={c} active={cols.includes(c)} onClick={() => toggle(cols, c, setCols)}>{c}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title="Size">
                  <div className="flex flex-wrap gap-2">{SIZES.map(s => <Pill key={s} active={sizes.includes(s)} onClick={() => toggle(sizes, s, setSizes)}>{s}</Pill>)}</div>
                </FilterGroup>
                <FilterGroup title="Occasion">
                  <div className="flex flex-wrap gap-2">{OCCASIONS.map(o => <Pill key={o} active={occs.includes(o)} onClick={() => toggle(occs, o, setOccs)}>{o}</Pill>)}</div>
                </FilterGroup>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => { setCats([]); setCols([]); setSizes([]); setOccs([]); setPrice(200000); }} className="flex-1 rounded-full border border-border py-3 text-xs tracking-[0.2em] uppercase">Reset</button>
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
