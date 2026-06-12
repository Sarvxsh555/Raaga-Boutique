import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getReviews, addReview } from "@/lib/api/reviews.functions";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Raaga Boutique" },
      { name: "description", content: "Read what our clients say about Raaga Boutique's couture, bridal and bespoke experiences." },
      { property: "og:title", content: "Reviews — Raaga Boutique" },
      { property: "og:description", content: "Words from the women we dress." },
    ],
  }),
  loader: async () => {
    return getReviews();
  },
  component: Reviews,
});

function Reviews() {
  const reviews = Route.useLoaderData();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !text.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview({
        data: {
          name: name.trim(),
          city: city.trim(),
          rating,
          text: text.trim(),
        },
      });

      toast.success("Thank you! Your review has been added.");
      
      // Reset form fields
      setName("");
      setCity("");
      setRating(5);
      setText("");
      setOpen(false);

      // Invalidate router cache to refetch the route loader and update UI
      router.invalidate();
    } catch (err) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const looped = [...reviews, ...reviews];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2)
    : "5.00";
  const reviewsCountText = reviews.length.toLocaleString();

  return (
    <div className="pt-32">
      <section className="container-luxe text-center">
        <Reveal>
          <p className="eyebrow">Loved & Worn</p>
          <h1 className="mt-4 font-display text-5xl text-primary md:text-7xl text-balance">A house built on whispered referrals.</h1>
          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="font-display text-2xl text-primary">{averageRating}</span>
              <span className="text-sm text-muted-foreground">· {reviewsCountText} reviews</span>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-xs tracking-[0.2em] uppercase text-primary-foreground transition hover:bg-primary-dark cursor-pointer">
                  <Plus size={14} /> Write a Review
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-ivory border-border text-foreground">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-primary text-center">Share Your Raaga Experience</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4 space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs tracking-[0.1em] uppercase text-muted-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Priyal Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-border bg-card focus-visible:ring-primary focus-visible:border-primary text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs tracking-[0.1em] uppercase text-muted-foreground">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border-border bg-card focus-visible:ring-primary focus-visible:border-primary text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground">Rating</Label>
                    <div className="flex gap-2 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setRating(starValue)}
                            className="cursor-pointer transition-transform hover:scale-110"
                            aria-label={`Rate ${starValue} Stars`}
                          >
                            <Star
                              size={24}
                              fill={starValue <= rating ? "currentColor" : "none"}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="review" className="text-xs tracking-[0.1em] uppercase text-muted-foreground">Your Thoughts</Label>
                    <Textarea
                      id="review"
                      placeholder="Describe your design, fitting, and overall experience with the Raaga team..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[100px] border-border bg-card focus-visible:ring-primary focus-visible:border-primary text-sm leading-relaxed"
                      required
                    />
                  </div>
                  <DialogFooter className="pt-2 sm:justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-xs tracking-[0.2em] uppercase text-primary-foreground transition hover:bg-primary-dark disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Reveal>
      </section>

      <section className="mt-20 overflow-hidden py-6">
        <div className="flex animate-marquee gap-6">
          {looped.slice(0, 16).map((t, i) => (
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
          {reviews.map((t, idx) => (
            <StaggerItem key={`${t.name}-${idx}`}>
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-lg border border-border bg-card p-8 transition-shadow hover:shadow-xl hover:shadow-primary/10">
                <div className="flex gap-1 text-accent">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <p className="mt-5 font-display text-xl leading-relaxed text-primary">"{t.text}"</p>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">{t.name}</p>
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
