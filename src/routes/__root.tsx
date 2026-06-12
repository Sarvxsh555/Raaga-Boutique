import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-primary">404</h1>
        <p className="mt-4 text-muted-foreground">This page is out of season.</p>
        <Link to="/" className="mt-6 inline-block underline">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display">Something didn't load</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-6 py-2 text-sm text-primary-foreground"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Raaga Boutique — Luxury Indian Couture" },
      { name: "description", content: "Raaga Boutique — premium sarees, kurtis, lehengas, bridal couture and bespoke design. Where heritage meets contemporary luxury." },
      { property: "og:title", content: "Raaga Boutique" },
      { property: "og:description", content: "Premium sarees, lehengas & bridal couture. Where heritage meets contemporary luxury." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Collections" },
  { to: "/search", label: "Discover" },
  { to: "/appointments", label: "Appointments" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_4px_30px_-20px_rgba(0,0,0,0.25)]" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-1">
          <span className="font-display text-2xl tracking-wide text-primary">Raaga</span>
          <span className="font-display text-[0.65rem] tracking-[0.4em] uppercase text-muted-foreground">Boutique</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative text-[0.78rem] tracking-[0.18em] uppercase text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary [&_.nav-underline]:w-full" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              <span className="nav-underline absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/appointments"
            className="rounded-full border border-primary bg-primary px-5 py-2.5 text-[0.72rem] tracking-[0.2em] uppercase text-primary-foreground transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            Book Visit
          </Link>
        </div>
        <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-primary" aria-label="Menu">
          <Menu size={22} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ivory lg:hidden"
          >
            <div className="flex items-center justify-between p-5">
              <span className="font-display text-2xl text-primary">Raaga</span>
              <button onClick={() => setOpen(false)} className="p-2 text-primary"><X size={22} /></button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col items-center gap-6 pt-12"
            >
              {NAV.map((n) => (
                <motion.div key={n.to} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-primary"
                  >{n.label}</Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="container-luxe grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">Raaga</p>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            A house of couture for the modern woman. Hand-finished sarees, lehengas and bespoke creations crafted in our Mumbai atelier.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30 transition hover:bg-primary-foreground hover:text-primary">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.3em] uppercase opacity-70">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.slice(1).map((n) => (
              <li key={n.to}><Link to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.3em] uppercase opacity-70">Atelier</p>
          <ul className="mt-5 space-y-3 text-sm opacity-80">
            <li>14 Linking Road</li>
            <li>Bandra West, Mumbai 400050</li>
            <li>+91 98200 14000</li>
            <li>care@raagaboutique.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs opacity-70 md:flex-row">
          <p>© {new Date().getFullYear()} Raaga Boutique. All rights reserved.</p>
          <p>Crafted with intention in India.</p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="min-h-screen pt-0">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
