import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY,
} from "@/config/emailjs";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!validateForm()) return;

    setIsSending(true);
    setErrorMsg("");
    setSuccessMsg("");

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_CONTACT_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          accessToken: EMAILJS_PRIVATE_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw { status: response.status, text: errorText };
      }

      setSuccessMsg("Thank you for reaching out. We will get back to you soon.");
      
      // Reset form on success
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch (err) {
      console.error("Failed to send contact message:", err);
      setErrorMsg("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

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
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-card p-8"
        >
          <p className="font-display text-3xl text-primary">Send a note</p>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input required value={name} onChange={e => setName(e.target.value)} className="rb-input" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="rb-input" />
              </Field>
            </div>
            <Field label="Subject" error={errors.subject}>
              <input required value={subject} onChange={e => setSubject(e.target.value)} className="rb-input" />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea rows={6} required value={message} onChange={e => setMessage(e.target.value)} className="rb-input resize-none" />
            </Field>
          </div>

          {successMsg && <p className="mt-4 text-sm text-green-600 font-medium">{successMsg}</p>}
          {errorMsg && <p className="mt-4 text-sm text-red-500 font-medium">{errorMsg}</p>}

          <button
            type="submit" disabled={isSending}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] tracking-[0.25em] uppercase text-primary-foreground transition hover:bg-primary-dark disabled:opacity-40 cursor-pointer font-semibold"
          >
            {isSending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>Send <Send size={14} /></>
            )}
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.7rem] tracking-[0.25em] uppercase text-primary">{label}</span>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </label>
  );
}
