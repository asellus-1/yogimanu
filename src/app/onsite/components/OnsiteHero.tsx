"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const bannerSlides = [
  {
    src: "/images/banner1.jpeg",
    alt: "Onsite Yoga & Restore",
    position: "object-[center_30%] md:object-center",
  },
  {
    src: "/images/Maharajji-38.png",
    alt: "Neem Karoli Baba (Maharajji)",
    position: "object-[center_20%]",
  },
];

export function OnsiteHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center md:items-end overflow-hidden bg-[#0d0904] pt-28 pb-16 md:pt-0 md:pb-28"
      aria-label="Hero"
    >
      {/* Background Rotating Banner Images with 8s interval and smooth transition */}
      {bannerSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
              isActive ? "opacity-100 scale-100 z-0" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className={`object-cover ${slide.position} transition-transform duration-[7000ms] ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Dark overlay gradient for balanced contrast top & bottom */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0d0904]/75 via-[#0d0904]/55 to-[#0d0904]/90 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="max-w-[720px]">
          {/* Eyebrow badge */}
          <motion.span
            className="inline-block font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold text-[#D79B42] mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Onsite Yoga &amp; Restore
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.12] tracking-tight mb-4 sm:mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Bring restorative wellness{" "}
            <br className="hidden sm:block" />
            directly to your <em className="italic font-normal text-[#E5B56A]">property</em>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-sans text-base sm:text-lg text-white/90 font-normal leading-relaxed mb-8 sm:mb-10 max-w-[560px]"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Professional yoga instruction, commercial equipment setup, and tailored restorative programs for luxury hotels, residential communities, and workplaces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a
              href="#property-inquiry"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full font-sans text-xs tracking-wider uppercase font-semibold bg-[#D79B42] text-[#0d0904] hover:bg-[#e5b56a] active:scale-[0.98] transition-all duration-300 shadow-md shadow-black/30 text-center"
            >
              Partner With Us
            </a>

            <a
              href="#program-details"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full font-sans text-xs tracking-wider uppercase font-semibold border border-white/30 text-white hover:bg-white/10 backdrop-blur-xs active:scale-[0.98] transition-all duration-300 text-center"
            >
              Explore Program
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Indicator Dots */}
      <div className="absolute bottom-8 left-6 sm:left-12 md:left-auto md:right-32 z-20 flex items-center gap-2">
        {bannerSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentSlide ? "w-6 bg-[#D79B42]" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Animated Scroll Hint (desktop only to prevent mobile overlap) */}
      <motion.a
        href="#program-details"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#program-details")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hidden md:flex absolute bottom-8 right-8 md:right-12 flex-col items-center gap-2 z-20 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-label="Scroll down"
      >
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60 group-hover:text-[#D79B42] transition-colors duration-500"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="relative w-px h-16 bg-white/20 overflow-hidden mt-2">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#D79B42] to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.a>
    </section>
  );
}
