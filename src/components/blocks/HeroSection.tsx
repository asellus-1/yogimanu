"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SoundToggle } from "@/components/shared/SoundToggle";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with very slow scale */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Mobile image – shown only on small screens */}
        <Image
          src="/images/photo1.jpg"
          alt="Yogi Manu"
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        {/* Desktop image – hidden on mobile */}
        <Image
          src="/images/photo1.jpg"
          alt="Yogi Manu"
          fill
          priority
          className="object-cover object-center hidden md:block"
          sizes="100vw"
        />
        {/* Overlay – strong at bottom, lighter at top so image still reads */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0904]/95 via-[#0d0904]/60 to-[#0d0904]/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[720px]">


          {/* Headline */}
          <motion.h1
            className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-light text-white leading-[1.1] mb-5 tracking-tight"
            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Walking the Path of Yoga,{" "}
            <br className="hidden md:block" />
            <em className="font-light italic">Devotion</em>{" "}
            &amp; Presence.
          </motion.h1>
          <motion.p
            className="font-sans text-[15px] md:text-[17px] text-white/95 leading-relaxed mb-10 max-w-[520px]"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
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

      {/* Animated Scroll Hint */}
      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 z-20 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        aria-label="Scroll down"
      >
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#FCFAF7]/50 group-hover:text-[#D79B42] transition-colors duration-500" style={{ writingMode: 'vertical-rl' }}>
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
