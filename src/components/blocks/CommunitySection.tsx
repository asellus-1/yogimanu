"use client";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";

export function CommunitySection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="community"
      className="bg-[#FCFAF7] py-16 md:py-36 border-t border-[#E8E1D7]"
      aria-labelledby="community-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left */}
          <FadeIn>
            <div className="space-y-6">

              <h2
                id="community-heading"
                className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light text-[#262626] leading-[1.1]"
              >
                Whether you&apos;ve been practicing for years or are taking
                your very first breath with intention –
              </h2>
              <p className="font-serif text-xl italic text-[#262626]">
                you&apos;re warmly welcome here.
              </p>
            </div>
          </FadeIn>

          {/* Right */}
          <FadeIn delay={0.15}>
            <div className="space-y-6">
              <p className="font-sans text-base text-[#6D6D6D] leading-relaxed">
                This community is simply a place to learn, practice and grow
                together. No hierarchy. No performance. Only sincere practice
                and mutual support.
              </p>

              <ul className="space-y-4" role="list">
                {[
                  { label: "Watch on YouTube", href: "https://www.youtube.com/@yogimanuawakens", external: true },
                  { label: "Follow on Instagram", href: "https://www.instagram.com/yogimanuawakens", external: true },
                  { label: "Join the newsletter", href: "#support", external: false },
                  { label: "Host Manu for a Retreat", href: "#bookings", external: false },
                  { label: "Support the journey", href: "https://donate.stripe.com/00w14naBE6qd97b9mB18c00", external: true, isRoute: false },
                ].map(({ label, href, external, isRoute }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        id={`community-${label.toLowerCase().replace(/\s+/g, "-")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-sans text-sm text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 group"
                      >
                        <span className="w-8 h-px bg-[#E8E1D7] group-hover:bg-[#D79B42] transition-colors duration-300" aria-hidden="true" />
                        {label}
                      </a>
                    ) : isRoute ? (
                      <Link
                        href={href}
                        id={`community-${label.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 font-sans text-sm text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 group"
                      >
                        <span className="w-8 h-px bg-[#E8E1D7] group-hover:bg-[#D79B42] transition-colors duration-300" aria-hidden="true" />
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        id={`community-${label.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                        className="flex items-center gap-3 font-sans text-sm text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 group"
                      >
                        <span className="w-8 h-px bg-[#E8E1D7] group-hover:bg-[#D79B42] transition-colors duration-300" aria-hidden="true" />
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
