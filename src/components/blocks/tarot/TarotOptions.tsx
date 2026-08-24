"use client";
 
/* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import Script from "next/script";
 
// ─── Configure Cal.com Booking Links here ──────────────────────────────
// Live Session event attributes are embedded directly below.
// Other offerings are asynchronous and do not require scheduling.
// ───────────────────────────────────────────────────────────────────────
 
const offerings = [
  {
    id: "single",
    title: "Single Card Pull",
    price: "$25",
    duration: "Delivered in 24 hours",
    subtitle: "A direct answer to one sincere question.",
    description:
      "Share a focused question. I sit in mantra, hold your intention, and pull one card. You receive a thoughtful written reading directly in your inbox.",
    features: [
      "1 focused question",
      "Sincere mantra intention",
      "Detailed typed reading",
      "Delivered within 24 hours",
    ],
    cta: "Request Reading",
    featured: false,
  },
  {
    id: "fourCard",
    title: "Four Card Spread",
    price: "$50",
    duration: "Delivered in 48 hours",
    subtitle: "Spiritual guidance.",
    description:
      "Share your situation or question. I sit in mantra, pull 3 tarot cards and 1 oracle card for deeper spiritual counsel. You receive a photo of your cards and a typed reading.",
    features: [
      "3 Tarot cards",
      "1 Oracle card (Spiritual guidance)",
      "Mantra practice & intention holding",
      "Photo of the drawn cards",
      "Typed interpretation",
      "Delivered within 48 hours",
    ],
    cta: "Book Spread",
    featured: false,
  },
  {
    id: "video",
    title: "Recorded Reading",
    price: "$85",
    duration: "Delivered in 72 hours",
    subtitle: "A personal reading recorded in sacred space.",
    description:
      "I sit in quiet practice and chant on your behalf. I pull around 6 cards to explore your situation deeply, recording a personal video explaining the spread and messages.",
    features: [
      "Chanting and intention holding",
      "Around 6 cards drawn",
      "Private video recording (20-30 min)",
      "Deep card interpretation & advice",
      "Delivered within 72 hours",
    ],
    cta: "Book Video",
    featured: false,
  },
  {
    id: "live",
    title: "Live Session",
    price: "$150",
    duration: "45 Minutes · Live Video",
    subtitle: "A shared space of mantra and deep reflection.",
    description:
      "We sit together virtually. The session opens with sacred chanting. As the mind settles, cards are drawn in real-time with space for open conversation, guidance, and questions.",
    features: [
      "45-minute private video call",
      "Opening mantra & grounding",
      "Real-time card selection",
      "Q&A and open discussion",
    ],
    badge: "Most Immersive",
    cta: "Book Live",
    featured: true,
  },
];
 
export function TarotOptions() {
  const [stripeLoaded, setStripeLoaded] = useState(false);
 
  // Check if Stripe is already loaded on mount
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).customElements?.get("stripe-buy-button")) {
      setTimeout(() => {
        setStripeLoaded(true);
      }, 0);
    }
  }, []);
 
  // Initialize Cal.com Embed script
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window as any, "https://app.cal.com/embed/embed.js", "init");
 
    const Cal = (window as any).Cal;
    if (Cal) {
      Cal("init", "live-tarot-reading", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.ns["live-tarot-reading"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }
  }, []);
 
  // Shadow DOM styling to ensure Stripe Buy Buttons are stretched correctly once initialized.
  useEffect(() => {
    if (!stripeLoaded) return;
 
    const styleIframe = (btnId: string) => {
      const btn = document.getElementById(btnId);
      if (btn && btn.shadowRoot) {
        const iframe = btn.shadowRoot.querySelector("iframe");
        if (iframe) {
          if (iframe.getAttribute("data-styled") === "true") return true;
 
          const styleEl = document.createElement("style");
          styleEl.textContent = `
            iframe {
              width: 100% !important;
              height: 100% !important;
              min-height: 100% !important;
              max-height: 100% !important;
              min-width: 100% !important;
              max-width: 100% !important;
              display: block !important;
            }
            .stripe-buy-button-container, div, slot {
              width: 100% !important;
              height: 100% !important;
              display: block !important;
            }
          `;
          btn.shadowRoot.appendChild(styleEl);
          iframe.setAttribute("data-styled", "true");
          return true;
        }
      }
      return false;
    };
 
    const interval = setInterval(() => {
      const ids = ["stripe-btn-single", "stripe-btn-fourCard", "stripe-btn-video"];
      const allDone = ids.every(id => styleIframe(id));
      if (allDone) {
        clearInterval(interval);
      }
    }, 100);
 
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 8000);
 
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stripeLoaded]);
 
  const getMailtoLink = (offering: typeof offerings[0]) => {
    const subject = encodeURIComponent(`Request: ${offering.title} - Yogi Manu`);
    const body = encodeURIComponent(
      `Namaste Yogi Manu,\n\nI would like to request a ${offering.title} reading (${offering.price}).\n\nMy question/situation:\n[Please describe your situation or question here]\n\nThank you!`
    );
    return `mailto:contact@yogimanu.com?subject=${subject}&body=${body}`;
  };
 
  const defaultPublishableKey = "pk_live_51NgzQEIdvpDSvxu1Zb1Jk1a1WdIpcoUAQLcCFhMwzT8CkooM6HbhFvrjwDz588nUdaU6ejJCfwjpchR2RpTPgdfY00nmvldEA7";
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || defaultPublishableKey;
 
  return (
    <section className="bg-[#FCFAF7] py-16 md:py-36 border-t border-[#E8E1D7]">
      <Script 
        src="https://js.stripe.com/v3/buy-button.js" 
        onLoad={() => setStripeLoaded(true)}
        async 
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
 
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-20 md:mb-28">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#D79B42] mb-3">
              Offerings
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.1] tracking-tight mb-5">
              Four ways to connect.
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] max-w-[480px] mx-auto leading-relaxed">
              Choose the format that best supports your schedule, your questions, and your journey.
            </p>
          </div>
        </FadeIn>
 
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1280px] mx-auto items-stretch">
          {offerings.map((offering, i) => (
            <FadeIn key={offering.id} delay={i * 0.12}>
              <motion.div
                whileHover={{
                  y: -6,
                  borderColor: offering.featured ? "#D79B42" : "rgba(215, 155, 66, 0.5)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)"
                }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                {...(offering.id === "live"
                  ? {
                    "data-cal-link": "yogimanu/live-tarot-reading",
                    "data-cal-namespace": "live-tarot-reading",
                    "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
                  }
                  : {})}
                className={[
                  "relative flex flex-col h-full rounded-[32px] p-8 md:p-10 border",
                  offering.id === "live" ? "cursor-pointer" : "",
                  offering.featured
                    ? "bg-[#262626] border-[#262626] text-[#FCFAF7] xl:scale-[1.03]"
                    : "bg-white/40 backdrop-blur-md border-[#E8E1D7] text-[#262626]",
                ].join(" ")}
              >
                {/* Popular/Featured Badge */}
                {offering.featured && offering.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D79B42] text-[#1a1208] text-[9px] tracking-[0.2em] uppercase font-semibold px-4 py-1.5 rounded-full shadow-sm">
                    {offering.badge}
                  </span>
                )}
 
                {/* Card Title & Price Header */}
                <div className="border-b border-[#E8E1D7]/20 pb-6 mb-8 text-center">
                  <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D79B42] mb-3 font-semibold">
                    {offering.title}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-serif text-5xl md:text-6xl font-light tracking-tight">
                      {offering.price}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#D79B42] mt-2 tracking-wider">
                    {offering.duration}
                  </p>
                </div>
 
                {/* Package description */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="space-y-3">
                    <p className="font-serif text-lg italic leading-snug">
                      {offering.subtitle}
                    </p>
                    <p className={[
                      "font-sans text-sm leading-relaxed",
                      offering.featured ? "text-[#FCFAF7]/70" : "text-[#6D6D6D]"
                    ].join(" ")}>
                      {offering.description}
                    </p>
                  </div>
 
                  {/* Features list */}
                  <div className="pt-4 border-t border-[#E8E1D7]/10">
                    <ul className="space-y-3" role="list">
                      {offering.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3 font-sans text-xs">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: "#D79B42" }}
                            aria-hidden="true"
                          />
                          <span className={offering.featured ? "text-[#FCFAF7]/80" : "text-[#6D6D6D]"}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
 
                {/* Booking Button (Triggers Cal.com modal for Live Session, Stripe checkouts for Single Card Pull and Four Card Spread, mailto link for others) */}
                <div className="pt-10">
                  {offering.id === "live" ? (
                    <motion.button
                      data-cal-link="yogimanu/live-tarot-reading"
                      data-cal-namespace="live-tarot-reading"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      className={[
                        "flex items-center justify-center w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer transition-colors duration-200",
                        offering.featured
                          ? "bg-[#D79B42] text-[#1a1208] hover:bg-[#c08a38] hover:shadow-[0_8px_24px_rgba(215,155,66,0.35)]"
                          : "bg-[#262626] text-[#FCFAF7] hover:bg-[#D79B42] hover:text-[#1a1208] hover:shadow-[0_8px_24px_rgba(38,38,38,0.15)]",
                      ].join(" ")}
                    >
                      {offering.cta}
                    </motion.button>
                  ) : ["single", "fourCard", "video"].includes(offering.id) ? (
                    <div className="relative group/btn w-full min-h-[48px] rounded-2xl overflow-hidden cursor-pointer">
                      {/* Stripe Buy Button placed BEHIND with opacity 1 to bypass clickjacking protection */}
                      <div className="absolute inset-0 z-0">
                        {stripeLoaded ? (
                          <>
                            {offering.id === "single" && (
                              <stripe-buy-button
                                id="stripe-btn-single"
                                buy-button-id="buy_btn_1U4kUwIdvpDSvxu1H24nu5ik"
                                publishable-key={publishableKey}
                                style={{ width: "100%", height: "100%", display: "block" }}
                              />
                            )}
                            {offering.id === "fourCard" && (
                              <stripe-buy-button
                                id="stripe-btn-fourCard"
                                buy-button-id="buy_btn_1U5BeOIdvpDSvxu1ktSo4Y8x"
                                publishable-key={publishableKey}
                                style={{ width: "100%", height: "100%", display: "block" }}
                              />
                            )}
                            {offering.id === "video" && (
                              <stripe-buy-button
                                id="stripe-btn-video"
                                buy-button-id="buy_btn_1U5BfJIdvpDSvxu1RNEI0DBH"
                                publishable-key={publishableKey}
                                style={{ width: "100%", height: "100%", display: "block" }}
                              />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-[#262626] flex items-center justify-center text-[10px] text-white/50 uppercase tracking-widest animate-pulse">
                            Loading...
                          </div>
                        )}
                      </div>
 
                      {/* Our custom-styled button ON TOP with pointer-events-none */}
                      <div
                        aria-hidden="true"
                        className={[
                          "absolute inset-0 z-10 flex items-center justify-center w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 text-center pointer-events-none",
                          "group-hover/btn:scale-[1.02] group-active/btn:scale-[0.98]",
                          !stripeLoaded ? "opacity-40" : "",
                          offering.featured
                            ? "bg-[#D79B42] text-[#1a1208] group-hover/btn:bg-[#c08a38] group-hover/btn:shadow-[0_8px_24px_rgba(215,155,66,0.35)]"
                            : "bg-[#262626] text-[#FCFAF7] group-hover/btn:bg-[#D79B42] group-hover/btn:text-[#1a1208] group-hover/btn:shadow-[0_8px_24px_rgba(38,38,38,0.15)]",
                        ].join(" ")}
                      >
                        {stripeLoaded ? offering.cta : "Loading..."}
                      </div>
                    </div>
                  ) : (
                    <motion.a
                      href={getMailtoLink(offering)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      className={[
                        "flex items-center justify-center w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer transition-colors duration-200 text-center",
                        offering.featured
                          ? "bg-[#D79B42] text-[#1a1208] hover:bg-[#c08a38] hover:shadow-[0_8px_24px_rgba(215,155,66,0.35)]"
                          : "bg-[#262626] text-[#FCFAF7] hover:bg-[#D79B42] hover:text-[#1a1208] hover:shadow-[0_8px_24px_rgba(38,38,38,0.15)]",
                      ].join(" ")}
                    >
                      {offering.cta}
                    </motion.a>
                  )}
                </div>
 
              </motion.div>
            </FadeIn>
          ))}
        </div>
 
        {/* Legal Disclaimer */}
        <FadeIn delay={0.2}>
          <div className="mt-16 md:mt-24 pt-8 border-t border-[#E8E1D7] text-center max-w-[720px] mx-auto">
            <p className="font-sans text-xs md:text-sm text-[#8C827A] leading-relaxed">
              This is for entertainment purposes only and should not replace any professional medical, psychological, legal, or financial advice. You maintain full personal accountability for your own choices and actions.
            </p>
          </div>
        </FadeIn>
 
      </div>
    </section>
  );
}
