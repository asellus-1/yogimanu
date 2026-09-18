"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";

const offeringsList = [
  {
    id: "tarot",
    title: "Tarot & Mantra Reading",
    description:
      "Not to predict the future – but to illuminate the present. Each session begins with sacred chanting. As the mantra deepens, the cards reveal what the mind alone cannot see.",
    image: "/images/generic.jpg",
    cta: "Explore Sessions",
    href: "/tarot",
    accent: "#D79B42",
  },
  {
    id: "retreat",
    title: "Invite Manu to Your Retreat",
    description:
      "Bring something rare to your gathering – live kirtan that fills a space with devotion, yoga instruction rooted in real healing, and a teacher whose presence changes the room. Available worldwide.",
    image: "/images/kirtan2.jpg",
    cta: "Invite Manu",
    href: "/retreats",
    accent: "#8B6A4D",
  },
  {
    id: "onsite",
    title: "Onsite Yoga & Restore",
    description:
      "Bring professional, restorative yoga instruction directly to your hotel, residential community, or workplace. We provide everything needed – including mats, setup, and cleaning – to help guests and residents Restore.",
    image: "/yoga.jpeg",
    cta: "Explore Program",
    href: "/onsite",
    accent: "#5E7052",
  },
];

export function OfferingsSection() {
  return (
    <section
      id="bookings"
      className="bg-[#FCFAF7] border-t border-[#E8E1D7] py-16 md:py-36 overflow-hidden"
      aria-labelledby="offerings-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">

        {/* Section Header */}
        <FadeIn>
          <div className="max-w-[560px] mb-16 md:mb-24">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#D79B42] mb-3">
              Offerings &amp; Gatherings
            </span>
            <h2
              id="offerings-heading"
              className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.15]"
            >
              Quiet spaces for <em className="italic">practice</em> and presence.
            </h2>
          </div>
        </FadeIn>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {offeringsList.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.15}>
              <Link href={item.href} className="group relative flex flex-col h-full bg-[#F8F5EF] border border-[#E8E1D7] rounded-[28px] overflow-hidden hover:border-[#D79B42]/50 hover:shadow-lg transition-all duration-700">

                {/* Image Section */}
                <div className="relative h-[280px] md:h-[340px] overflow-hidden w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle Elegant Gradient on Top of Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-between flex-1 p-6 md:p-8 bg-white">
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-[#262626] leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-base text-[#6D6D6D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Call to Action Button */}
                  <div className="pt-6">
                    <div
                      className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-[#262626] group-hover:text-[#D79B42] transition-colors duration-500 font-medium"
                    >
                      <span>{item.cta}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="translate-x-0 group-hover:translate-x-2 transition-transform duration-500"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

