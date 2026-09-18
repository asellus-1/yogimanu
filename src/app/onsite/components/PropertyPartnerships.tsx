import { FadeIn } from "@/components/shared/FadeIn";
import { Building2, Briefcase } from "lucide-react";

export function PropertyPartnerships() {
  return (
    <section className="bg-[#F8F5EF] py-16 md:py-36 border-t border-[#E8E1D7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <FadeIn>
          <div className="max-w-[620px] mb-16 md:mb-24">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#5E7052] mb-3 font-semibold">
              Other Partnerships
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.15]">
              Expanding wellness to <br />
              <em className="italic">communities &amp; workplaces.</em>
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] leading-relaxed mt-6">
              While our primary program is built around hospitality wellness, we also provide professional, onsite instruction to residential spaces and corporate offices.
            </p>
          </div>
        </FadeIn>

        {/* Partnerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">

          {/* Card 1: Apartments */}
          <FadeIn>
            <div className="group relative flex flex-col h-full bg-[#FCFAF7] border border-[#E8E1D7] rounded-[28px] p-8 md:p-12 hover:border-[#5E7052]/40 hover:shadow-lg transition-all duration-700">
              <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F8F5EF] border border-[#E8E1D7] text-[#5E7052]">
                <Building2 size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-light text-[#262626]">
                  Residential Communities
                </h3>
                <span className="block font-sans text-xs tracking-wider text-[#5E7052] font-medium">
                  For Apartment Buildings &amp; Condominiums
                </span>
                <p className="font-sans text-sm text-[#6D6D6D] leading-[1.8] pt-2">
                  Enhance your community&apos;s residential amenities. We teach structured classes tailored to your residents&apos; experience levels, offering a convenient health and connection benefit right in their home building.
                </p>
                <ul className="space-y-2 pt-4 font-sans text-xs text-[#6D6D6D]" role="list">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Weekly, bi-weekly, or seasonal schedules
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Flexible styles (Vinyasa, Gentle, Restorative)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Open to all experience levels
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Workplaces */}
          <FadeIn delay={0.15}>
            <div className="group relative flex flex-col h-full bg-[#FCFAF7] border border-[#E8E1D7] rounded-[28px] p-8 md:p-12 hover:border-[#5E7052]/40 hover:shadow-lg transition-all duration-700">
              <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F8F5EF] border border-[#E8E1D7] text-[#5E7052]">
                <Briefcase size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-light text-[#262626]">
                  Workplace Wellness
                </h3>
                <span className="block font-sans text-xs tracking-wider text-[#5E7052] font-medium">
                  For Teams &amp; Organizations
                </span>
                <p className="font-sans text-sm text-[#6D6D6D] leading-[1.8] pt-2">
                  Support employee focus, posture, and stress management. We bring quiet sessions designed for office spaces, helping teams release desk-bound physical tension and settle the mind.
                </p>
                <ul className="space-y-2 pt-4 font-sans text-xs text-[#6D6D6D]" role="list">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Mid-day Restores or post-work sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Focused desk stretches &amp; breathwork
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7052]" />
                    Promotes workplace well-being
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
