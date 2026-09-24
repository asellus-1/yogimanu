"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";

function YTIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

// ── Replace with real YouTube channel URLs ────────────────────────────────
const YOUTUBE_YOGA = "https://www.youtube.com/@Onsiteyogaandrestore";
const YOUTUBE_KIRTAN = "https://www.youtube.com/@yogimanumusic";
const YOUTUBE_SPIRITUALITY = "https://www.youtube.com/@yogimanuawakens";
// ─────────────────────────────────────────────────────────────────────────

const channels = [
  {
    id: "yoga",
    title: "Yoga",
    subtitle: "For the body. For the breath.",
    description:
      "Simple practices to ease pain, build flexibility and reconnect with yourself. Whether you're just beginning or have practiced for years, these classes meet you exactly where you are.",
    cta: "Watch yoga classes",
    href: YOUTUBE_YOGA,
    image: "/yoga2.jpeg",
    accent: "#5E7052",
  },
  {
    id: "kirtan",
    title: "Kirtan",
    subtitle: "Devotion through song.",
    description:
      "Join in and chant together. Kirtan is not a performance – it is shared prayer. A space where voices become one and the heart naturally opens. No musical experience needed.",
    cta: "Listen to kirtan",
    href: YOUTUBE_KIRTAN,
    image: "/images/kirtan1.jpg",
    accent: "#D79B42",
  },
  {
    id: "spirituality",
    title: "Spirituality",
    subtitle: "Honest conversations on the path.",
    description:
      "Reflections on awareness, devotion, breath and what it means to live with more presence. Inspired by the teachings of Neem Karoli Baba – grounded, simple, and from lived experience.",
    cta: "Watch talks",
    href: YOUTUBE_SPIRITUALITY,
    image: "/images/generic3.jpg",
    accent: "#8B6A4D",
  },
];

export function ChannelsSection() {
  return (
    <section
      id="channels"
      className="bg-[#FCFAF7] pt-20 pb-24 md:pt-28 md:pb-36"
      aria-labelledby="channels-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">

        {/* Section intro */}
        <FadeIn>
          <div className="max-w-[560px] mb-16 md:mb-20">
            <h2
              id="channels-heading"
              className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light text-[#262626] leading-[1.1] mb-4"
            >
              Three channels.<br />
              <em className="italic">One path.</em>
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] leading-relaxed">
              Everything Yogi Manu shares lives on YouTube – freely available, offered with care.
              Find what calls to you.
            </p>
          </div>
        </FadeIn>

        {/* Channel cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {channels.map((ch, i) => (
            <FadeIn key={ch.id} delay={i * 0.1}>
              <a
                href={ch.href}
                id={`channel-${ch.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full bg-[#F8F5EF] border border-[#E8E1D7] rounded-xl overflow-hidden hover:border-[#D79B42]/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={ch.image}
                    alt={ch.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/60 to-transparent" />
                  {/* Channel label */}
                  <div className="absolute bottom-5 left-5">
                    <span className="font-serif text-2xl font-light text-white">
                      {ch.title}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-7 gap-4">
                  <p className="font-serif text-base italic text-[#262626]">
                    {ch.subtitle}
                  </p>
                  <p className="font-sans text-sm text-[#6D6D6D] leading-relaxed flex-1">
                    {ch.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ch.accent }}
                    >
                      <YTIcon size={13} className="text-white" />
                    </div>
                    <span
                      className="font-sans text-xs tracking-widest uppercase transition-colors duration-300"
                      style={{ color: ch.accent }}
                    >
                      {ch.cta}
                    </span>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
