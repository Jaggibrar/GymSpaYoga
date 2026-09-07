import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, HeartPulse, Sparkles, ArrowRight } from "lucide-react";

const STORAGE_KEY = "gsy_motivation_overlay_dismissed_v1";

const MotivationOverlay = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // storage may be unavailable (private mode) — treat as not dismissed
    }
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="motivation-overlay-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* backdrop */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close welcome message"
            tabIndex={-1}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
          />

          {/* panel */}
          <motion.div
            className="relative w-full max-w-xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card p-8 shadow-soft sm:p-10">
              {/* decorative glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-gold/15 blur-3xl" aria-hidden />

              {/* close */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close welcome message"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative flex flex-col items-start gap-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> A note from GymSpaYoga
                </span>

                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                    <HeartPulse className="h-6 w-6" />
                  </span>
                  <h2
                    id="motivation-overlay-title"
                    className="font-display text-2xl font-extrabold leading-tight text-foreground sm:text-[28px]"
                  >
                    Stay fit. Stay inspired.
                  </h2>
                </div>

                <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  <p>
                    Movement is the kindest gift you can give your body. Whether it's
                    a morning stretch, an evening session, or simply a calmer breath —
                    every small step adds up to a stronger, happier you. Prioritise
                    your wellbeing today, and let it ripple into every part of life.
                  </p>
                  <p className="text-foreground/90">
                    We're building{" "}
                    <span className="font-semibold text-primary">GymSpaYoga</span> into
                    India's No. 1 fitness & wellness hub — a place where anyone can
                    discover, retreat, and thrive in a complete fitness ecosystem. Your
                    support, listings, and presence help that vision grow. Join us, and
                    let's make wellness effortless to find.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
                  <Link
                    to="/explore"
                    onClick={handleClose}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-soft hover:brightness-110"
                  >
                    Explore the ecosystem
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/register-business"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    List your business
                  </Link>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationOverlay;
