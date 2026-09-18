import { FadeIn } from "@/components/shared/FadeIn";
import { Sunrise, Sunset, Plane } from "lucide-react";

const programs = [
  {
    icon: Sunrise,
    title: "Morning Gentle Yoga",
    time: "60 Minutes · Morning",
    description:
      "A slow, warming sequence designed to gently wake the body, improve circulation, and establish a calm focus for the day ahead. Perfect for guests seeking to start their morning with presence.",
  },
  {
    icon: Plane,
    title: "Travel Recovery & Restore",
    time: "60 Minutes · Custom Schedule",
    description:
      "Specifically structured for travelers recovering from long flights and jet lag. Focuses on releasing compression in the back, opening tight shoulders, and grounding the nervous system.",
  },
  {
    icon: Sunset,
    title: "Evening Restorative",
    time: "60 Minutes · Evening",
    description:
      "A deeply relaxing practice utilizing supportive props. Long-held, passive postures encourage the body's natural relaxation response, preparing guests for deep, restorative sleep.",
  },
];

export function HotelProgram() {
  return (
    <section id="program-details" className="bg-[#FCFAF7] py-16 md:py-36 border-t border-[#E8E1D7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">

        {/* Section Header */}
        <FadeIn>
          <div className="max-w-[620px] mb-16 md:mb-24">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#5E7052] mb-3 font-semibold">
              The Hotel Program
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.15]">
              A premium wellness amenity <br />
              <em className="italic">for your guests.</em>
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] leading-relaxed mt-6">
              Incorporate restorative yoga directly into your hotel&apos;s guest experience. We design sessions specifically tailored to help travelers unwind, Restore, and transition into a state of ease.
            </p>
          </div>
        </FadeIn>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {programs.map((prog, index) => {
            const IconComponent = prog.icon;
            return (
              <FadeIn key={prog.title} delay={index * 0.15}>
                <div className="group relative flex flex-col h-full bg-[#F8F5EF]/60 border border-[#E8E1D7] rounded-[28px] p-8 md:p-10 hover:border-[#5E7052]/40 hover:shadow-lg transition-all duration-700">
                  <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FCFAF7] border border-[#E8E1D7] text-[#5E7052]">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-serif text-2xl font-light text-[#262626]">
                      {prog.title}
                    </h3>
                    <span className="block font-sans text-xs tracking-wider text-[#5E7052] font-medium">
                      {prog.time}
                    </span>
                    <p className="font-sans text-sm text-[#6D6D6D] leading-[1.8]">
                      {prog.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
