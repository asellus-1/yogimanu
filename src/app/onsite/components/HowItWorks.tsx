import { FadeIn } from "@/components/shared/FadeIn";

const steps = [
  {
    num: "01",
    title: "Property Inquiry",
    description: "Submit a brief inquiry telling us about your property, guest profile, and space configuration.",
  },
  {
    num: "02",
    title: "Program Curation",
    description: "We work together to design a customized class schedule and style that fits your guests' habits.",
  },
  {
    num: "03",
    title: "Seamless Onsite Service",
    description: "Yogi Manu or a qualified instructor will travel to your property with all required equipment, handles setup, instruction, and clean-up.",
  },
  {
    num: "04",
    title: "Guest Relaxation",
    description: "Your guests enjoy a premium, restorative yoga session, feeling Restore and grounded.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#FCFAF7] py-16 md:py-36 border-t border-[#E8E1D7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <FadeIn>
          <div className="max-w-[560px] mb-16 md:mb-24">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#5E7052] mb-3 font-semibold">
              The Process
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.15]">
              Four simple steps <br />
              <em className="italic">to launch.</em>
            </h2>
          </div>
        </FadeIn>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <FadeIn key={step.num} delay={index * 0.1}>
              <div className="space-y-4 relative">
                <span className="block font-serif text-5xl lg:text-6xl font-light text-[#E8E1D7] select-none">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl font-light text-[#262626] pt-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#6D6D6D] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
