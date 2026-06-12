import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, Crown, Ruler, Scissors } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_APPOINTMENT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY,
} from "@/config/emailjs";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — Raaga Boutique" },
      { name: "description", content: "Book a private bridal consultation, custom design session or measurement appointment at Raaga Boutique." },
      { property: "og:title", content: "Appointments — Raaga Boutique" },
      { property: "og:description", content: "Private bridal consultations and bespoke fittings, by appointment." },
    ],
  }),
  component: Appointments,
});

const TYPES = [
  { id: "bridal", title: "Bridal Consultation", duration: "90 min", icon: Crown, desc: "Champagne, fabrics, and the dress of your day. With our head designer." },
  { id: "custom", title: "Custom Design Discussion", duration: "60 min", icon: Scissors, desc: "Sketch, swatches, and silhouette planning for your one-off piece." },
  { id: "measure", title: "Measurement Session", duration: "30 min", icon: Ruler, desc: "Precise studio measurements and fit reviews for ordered pieces." },
];

const SLOTS = ["10:30", "11:30", "13:00", "14:30", "16:00", "17:30"];

function Appointments() {
  const [type, setType] = useState("bridal");
  const [date, setDate] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  
  const [done, setDone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  // Cached reservation details for display in success modal after form reset
  const [reservedDetails, setReservedDetails] = useState<{
    typeTitle: string;
    date: number;
    month: string;
    slot: string;
    email: string;
  } | null>(null);

  const month = new Date();
  const monthLabel = month.toLocaleString("en-US", { month: "long", year: "numeric" });
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const canSubmit = type && date && slot && name && email && !isSending;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(phone.trim().replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    if (!date) {
      newErrors.date = "Please select an appointment date";
    }
    if (!slot) {
      newErrors.slot = "Please select a time slot";
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

    const typeTitle = TYPES.find(t => t.id === type)?.title || type;
    const dateText = `${date} ${monthLabel}`;

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      service: typeTitle,
      date: dateText,
      time: slot,
      notes: notes || "None",
    };

    try {
      const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_APPOINTMENT_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      };
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw { status: response.status, text: errorText };
      }

      // Cache details for success dialog
      setReservedDetails({
        typeTitle,
        date: date!,
        month: monthLabel.split(" ")[0],
        slot: slot!,
        email: email,
      });

      // Clear the form
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setDate(null);
      setSlot(null);
      setErrors({});
      setDone(true);
    } catch (err: any) {
      console.error("Failed to send appointment request:", err);
      console.error("EmailJS Error Status:", err?.status);
      console.error("EmailJS Error Text:", err?.text);
      console.error("Full error object:", JSON.stringify(err, null, 2));
      setErrorMsg("Failed to send appointment request. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pt-32">
      <section className="container-luxe">
        <Reveal>
          <p className="eyebrow flex items-center gap-3"><CalendarDays size={12} /> By Appointment</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl text-primary md:text-7xl text-balance">Reserve a private hour with the atelier.</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">Tea, swatches and quiet attention. Choose the session that suits your moment.</p>
        </Reveal>
      </section>

      <section className="container-luxe mt-14 grid gap-6 md:grid-cols-3">
        {TYPES.map((t, i) => {
          const Icon = t.icon;
          const active = type === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => setType(t.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-lg border p-7 text-left transition cursor-pointer ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}
            >
              <Icon size={28} className={active ? "text-primary-foreground" : "text-primary"} />
              <h3 className="mt-6 font-display text-2xl">{t.title}</h3>
              <p className={`mt-2 text-sm ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{t.desc}</p>
              <p className={`mt-6 text-[0.7rem] tracking-[0.3em] uppercase ${active ? "text-primary-foreground/70" : "text-primary"}`}>{t.duration}</p>
            </motion.button>
          );
        })}
      </section>

      <section className="container-luxe mt-16 grid gap-12 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-8">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl text-primary">{monthLabel}</p>
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-muted-foreground">Select date</span>
          </div>
          {errors.date && <p className="mt-2 text-xs text-red-500">{errors.date}</p>}
          <div className="mt-6 grid grid-cols-7 gap-2">
            {["S","M","T","W","T","F","S"].map((d, i) => <span key={i} className="text-center text-xs text-muted-foreground">{d}</span>)}
            {days.map(d => {
              const isPast = d < new Date().getDate();
              const isSelected = date === d;
              return (
                <button
                  key={d}
                  disabled={isPast}
                  onClick={() => setDate(d)}
                  className={`aspect-square rounded-full text-sm transition cursor-pointer ${
                    isSelected ? "bg-primary text-primary-foreground"
                      : isPast ? "cursor-not-allowed text-muted-foreground/40"
                      : "text-foreground hover:bg-primary/10"
                  }`}
                >{d}</button>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-primary">Available times</p>
            {errors.slot && <p className="mt-2 text-xs text-red-500">{errors.slot}</p>}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {SLOTS.map(s => (
                <button
                  key={s} onClick={() => setSlot(s)}
                  className={`rounded-full border py-2.5 text-sm transition cursor-pointer ${slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-card p-8"
        >
          <p className="font-display text-2xl text-primary">Your details</p>
          <div className="mt-6 space-y-4">
            <Field label="Full name" error={errors.name}>
              <input required value={name} onChange={e => setName(e.target.value)} className="rb-input" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="rb-input" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="rb-input" />
              </Field>
            </div>
            <Field label="Notes (optional)">
              <textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)} className="rb-input resize-none" />
            </Field>
          </div>

          {errorMsg && <p className="mt-4 text-sm text-red-500 text-center font-medium">{errorMsg}</p>}

          <button
            type="submit" disabled={!canSubmit || isSending}
            className="mt-6 w-full rounded-full bg-primary py-4 text-[0.72rem] tracking-[0.25em] uppercase text-primary-foreground transition enabled:hover:bg-primary-dark disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer font-semibold"
          >
            {isSending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirming...
              </>
            ) : (
              "Confirm Appointment"
            )}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">No payment required. We'll confirm by email within an hour.</p>
        </form>
      </section>

      <div className="h-24" />

      <AnimatePresence>
        {done && reservedDetails && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(false)} className="fixed inset-0 z-50 bg-primary/50 backdrop-blur" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-xl bg-ivory p-10 text-center shadow-2xl">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check size={28} />
                </div>
                <h3 className="mt-6 font-display text-3xl text-primary">Reserved.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your appointment request has been received. We will contact you shortly.
                </p>
                <p className="mt-4 p-4 rounded-lg bg-card text-xs text-left border border-border space-y-1">
                  <div><strong>Type:</strong> {reservedDetails.typeTitle}</div>
                  <div><strong>Date:</strong> {reservedDetails.date} {reservedDetails.month}</div>
                  <div><strong>Time Slot:</strong> {reservedDetails.slot}</div>
                  <div><strong>Client Email:</strong> {reservedDetails.email}</div>
                </p>
                <button onClick={() => setDone(false)} className="mt-8 w-full rounded-full border border-primary py-3 text-[0.7rem] tracking-[0.25em] uppercase text-primary transition hover:bg-primary hover:text-primary-foreground cursor-pointer font-semibold">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`.rb-input{width:100%;border:1px solid var(--color-border);background:transparent;padding:0.85rem 1rem;border-radius:0.5rem;font-size:0.9rem;color:var(--color-foreground);outline:none;transition:border-color 0.2s}.rb-input:focus{border-color:var(--color-primary)}`}</style>
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
