import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/boutique-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover="hover"
      className="group relative overflow-hidden rounded-md bg-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
        <motion.div
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 12 }}
          className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full glass px-4 py-2 text-xs text-primary"
        >
          <span className="tracking-[0.18em] uppercase">Quick View</span>
          <ArrowUpRight size={14} />
        </motion.div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {product.sizes.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full bg-ivory/90 px-2.5 py-1 text-[0.6rem] tracking-widest text-primary">{s}</span>
          ))}
        </div>
      </div>
      <div className="px-1 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[0.6rem]">{product.category}</p>
            <h3 className="mt-1 font-display text-xl text-primary">{product.name}</h3>
          </div>
          <p className="whitespace-nowrap font-display text-lg text-foreground">
            {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "On request"}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{product.fabric}</span>
          <div className="flex gap-1.5">
            {product.colors.map((c) => (
              <span key={c.name} title={c.name} className="h-4 w-4 rounded-full ring-1 ring-border" style={{ background: c.hex }} />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
