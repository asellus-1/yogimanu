import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";

export function MaharajJiSection() {
  return (
    <section id="maharaj-ji" className="relative bg-[#FCFAF7] py-20 md:py-44 border-t border-[#E8E1D7]">
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Left: Clean Symmetrical Image Grid (6 cols on lg for larger pictures) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <FadeIn>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

                {/* Image 1 */}
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#F8F5EF] border border-[#E8E1D7] group shadow-sm hover:shadow-md transition-all duration-500">
                  <Image
                    src="/images/M 05 JLB 32.jpg"
                    alt="Neem Karoli Baba"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 2 */}
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#F8F5EF] border border-[#E8E1D7] group shadow-sm hover:shadow-md transition-all duration-500">
                  <Image
                    src="/images/M-05-0327.jpg"
                    alt="Neem Karoli Baba"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 3 */}
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#F8F5EF] border border-[#E8E1D7] group shadow-sm hover:shadow-md transition-all duration-500">
                   <Image
                    src="/images/Maharajji-38.png"
                    alt="Neem Karoli Baba"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Image 4 */}
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#F8F5EF] border border-[#E8E1D7] group shadow-sm hover:shadow-md transition-all duration-500">
                  <Image
                    src="/images/034-BRCD2-RT-min.jpg"
                    alt="Neem Karoli Baba"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-500" />
                </div>

              </div>
            </FadeIn>
          </div>

          {/* Right: Typography (6 cols on lg) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeIn delay={0.15}>
              <div className="max-w-[580px] lg:pl-6">
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4.2rem)] font-light text-[#262626] leading-[1.1] mb-10">
                  Neem Karoli Baba
                </h2>

              <blockquote className="border-l-[3px] border-[#D79B42] pl-6 sm:pl-8 mb-10 py-1">
                <p className="font-serif text-[clamp(1.5rem,3.2vw,2.3rem)] font-light text-[#262626] leading-[1.4] italic">
                  &ldquo;Love everyone. Serve everyone. Remember God.&rdquo;
                </p>
              </blockquote>

              <div className="space-y-6 text-[#6D6D6D] font-sans text-base sm:text-lg leading-[1.85]">
                <p>
                  Much of my journey has been quietly shaped by Maharaj Ji&apos;s
                  life and presence. He is not a theme on this website. He is the
                  ground beneath everything I do.
                </p>
                <p>
                  His teachings were simple yet infinite. He did not lecture, write books,
                  or build a formal organization. Instead, he met people exactly where they
                  were, transforming their hearts through unconditional love and presence.
                </p>
              </div>

          </div>
        </FadeIn>
      </div>

    </div>
      </div >
    </section >
  );
}
