import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Raaga Boutique" },
      { name: "description", content: "Visit Raaga Boutique in Bandra West, Mumbai or write to us about commissions and consultations." },
      { property: "og:title", content: "Contact — Raaga Boutique" },
      { property: "og:description", content: "Visit, call, or write to Raaga Boutique." },
    ],
  }),
  component: Contact,
});

const CONTACTS = [
  { icon: MapPin, label: "Atelier", v: "14 Linking Road, Bandra West, Mumbai 400050" },
  { icon: Phone, label: "Telephone", v: "+91 98200 14000" },
  { icon: Mail, label: "Correspondence", v: "care@raagaboutique.com" },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32">
      <section className="container-luxe">
        <Reveal>
          <p className="eyebrow">Be in touch</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl text-primary md:text-7xl text-balance">A note, a call, a quiet visit.</h1>
          <p className="mt-6 max-w-xl text-muted-foreground">For commissions, consultations or considered conversations.</p>
        </Reveal>
      </section>

      <section className="container-luxe mt-14 grid gap-6 md:grid-cols-3">
        <Stagger className="contents">
          {CONTACTS.map(c => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.label}>
                <motion.div whileHover={{ y: -4 }} className="h-full rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-xl hover:shadow-primary/10">
                  <Icon size={24} className="text-primary" />
                  <p className="mt-5 text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground">{c.label}</p>
                  <p className="mt-2 font-display text-xl text-primary">{c.v}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="container-luxe mt-20 grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
          className="rounded-lg border border-border bg-card p-8"
        >
          <p className="font-display text-3xl text-primary">Send a note</p>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><input required className="rb-input" /></Field>
              <Field label="Email"><input type="email" required className="rb-input" /></Field>
            </div>
            <Field label="Subject"><input className="rb-input" /></Field>
            <Field label="Message"><textarea rows={6} required className="rb-input resize-none" /></Field>
          </div>
          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] tracking-[0.25em] uppercase text-primary-foreground transition hover:bg-primary-dark">
            {sent ? "Sent · Thank you" : <>Send <Send size={14} /></>}
          </button>
        </form>

        <div className="relative overflow-hidden rounded-lg border border-border bg-primary/5">
          <iframe
            title="Raaga Boutique location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.825%2C19.052%2C72.845%2C19.072&layer=mapnik"
            className="h-full min-h-[420px] w-full"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-md glass p-5">
            <p className="font-display text-xl text-primary">Visit the atelier</p>
            <p className="mt-1 text-sm text-muted-foreground">Mon–Sat · 11am to 8pm · By appointment</p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-dark"><Icon size={14} /></a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" />
      <style>{`.rb-input{width:100%;border:1px solid var(--color-border);background:transparent;padding:0.85rem 1rem;border-radius:0.5rem;font-size:0.9rem;outline:none;transition:border-color 0.2s}.rb-input:focus{border-color:var(--color-primary)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.7rem] tracking-[0.25em] uppercase text-primary">{label}</span>
      {children}
    </label>
  );
}
