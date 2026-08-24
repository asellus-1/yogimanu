import { FadeIn } from "@/components/shared/FadeIn";

const milestones = [
  {
    id: "construction",
    year: "2016",
    title: "Life Before Yoga",
    body: "I worked in construction – heavy lifting, long days, physical labor that pushed the body hard. Outside of work I was lifting weights intensely. Over time, chronic pain settled in: back, shoulders, knees. I thought it was just the cost of that life.",
    align: "right" as const,
  },
  {
    id: "discovery",
    year: "The First Session",
    title: "A Friend's Suggestion",
    body: "A friend suggested yoga – not for spirituality, simply for pain. I was skeptical. After one session, my pain eased and my mind grew quiet. I felt still for the first time in years.",
    align: "left" as const,
  },
  {
    id: "breakthrough",
    year: "Day Eight",
    title: "Something Broke Open",
    body: "On the eighth consecutive day of practice, I cried deeply. My thoughts became clear. It felt like my mind had been washed clean. The direction of my life quietly changed.",
    align: "right" as const,
  },
  {
    id: "devotion",
    year: "The Path Deepens",
    title: "From Movement to Mantra",
    body: "Yoga led to meditation. Meditation led to mantra. Mantra opened into devotion. Hours of chanting brought experiences of profound peace and unity – not as destinations, but as invitations to continue with humility.",
    align: "left" as const,
  },
  {
    id: "sharing",
    year: "Today",
    title: "Sharing What Was Given",
    body: "Today I share what practice has revealed – yoga, breathwork, mantra, kirtan, devotion and honest conversation – with one simple hope: that these practices may support your own journey toward peace.",
    align: "right" as const,
  },
];

export function JourneySection() {
  return (
    <section
      id="journey"
      className="bg-[#F8F5EF] py-16 md:py-36 overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <FadeIn>
          <div className="max-w-[520px] mb-20 md:mb-28">

            <h2
              id="journey-heading"
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-[#262626] leading-[1.1]"
            >
              A life changed by practice.
            </h2>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E8E1D7] hidden md:block"
            aria-hidden="true"
          />

          <ol className="space-y-16 md:space-y-0" aria-label="Yogi Manu's journey">
            {milestones.map((m) => (
              <li key={m.id} className="relative md:grid md:grid-cols-2 md:gap-16 md:mb-20">
                {/* Content – alternates sides on desktop */}
                <FadeIn
                  delay={0.1}
                  className={
                    m.align === "right"
                      ? "md:col-start-1 md:text-right md:pr-12"
                      : "md:col-start-2 md:row-start-1 md:pl-12"
                  }
                >
                  <div className="space-y-3">
                    <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#D79B42]">
                      {m.year}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-[#262626]">
                      {m.title}
                    </h3>
                    <p className="font-sans text-base text-[#6D6D6D] leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                </FadeIn>

                {/* Center dot */}
                <div
                  className="hidden md:block absolute left-1/2 top-3 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#D79B42] bg-[#F8F5EF]"
                  aria-hidden="true"
                />

                {/* Empty opposite column */}
                {m.align === "right" && <div className="md:col-start-2" />}
                {m.align === "left" && <div className="md:col-start-1 md:row-start-1" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
