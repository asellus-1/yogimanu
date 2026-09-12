"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SoundToggle } from "@/components/shared/SoundToggle";

const heroSlides = [
  {
    src: "/images/banner1.jpeg",
    alt: "Yogi Manu - Banner",
    position: "object-[center_30%] md:object-center",
  },
  {
    src: "/images/photo1.jpg",
    alt: "Yogi Manu",
    position: "object-center",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Rotating Banner Images */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className={`object-cover ${slide.position} transition-transform duration-[4000ms] ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Overlay – strong at bottom, lighter at top so image still reads */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0d0904]/95 via-[#0d0904]/60 to-[#0d0904]/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[720px]">
          {/* Headline */}
          <motion.h1
            className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-light text-white leading-[1.1] mb-5 tracking-tight"
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Walking the Path of Yoga,{" "}
            <br className="hidden md:block" />
            <em className="font-light italic">Devotion</em> &amp; Presence.
          </motion.h1>
          <motion.p
            className="font-sans text-[15px] md:text-[17px] text-white/95 leading-relaxed mb-10 max-w-[520px]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            My journey began with pain.
            <br />
            Yoga became the doorway. Breath became the medicine.
            <br className="hidden sm:block" />
            These practices changed my life. I share them simply, with love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SoundToggle className="relative z-20 flex items-center h-11" />
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Indicator Dots */}
      <div className="absolute bottom-8 left-6 sm:left-12 md:left-auto md:right-32 z-20 flex items-center gap-2">
        {heroSlides.map((slide, index) => (
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

      {/* Animated Scroll Hint */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 z-20 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        aria-label="Scroll down"
      >
        <span
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#FCFAF7]/50 group-hover:text-[#D79B42] transition-colors duration-500"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="relative w-px h-16 bg-[#FCFAF7]/20 overflow-hidden mt-2">
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
