"use client";
 
import { FadeIn } from "@/components/shared/FadeIn";
import { useActionState } from "react";
import { submitOnsiteInquiry } from "@/app/actions";
 
export function OnsiteContact() {
  const [state, formAction, isPending] = useActionState(submitOnsiteInquiry, null);
 
  return (
    <section id="property-inquiry" className="bg-[#F8F5EF] py-16 md:py-36 border-t border-[#E8E1D7]">
      <div className="max-w-[760px] mx-auto px-6">
        
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#5E7052] mb-3 font-semibold">
              Get in Touch
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-light text-[#262626] leading-[1.1] mb-6">
              Bring Onsite Yoga &amp; Restore <br />
              <em className="italic">to your property.</em>
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] leading-relaxed max-w-[500px] mx-auto">
              Ready to enhance your guest or resident experience? Get in touch to discuss programming options, schedules, and custom packages.
            </p>
          </div>
        </FadeIn>
 
        <FadeIn delay={0.1}>
          {state?.success ? (
            <div className="text-center p-12 bg-[#FCFAF7] border border-[#E8E1D7] rounded-3xl shadow-sm">
              <p className="font-serif text-2xl text-[#262626] mb-3">Thank you.</p>
              <p className="font-sans text-sm text-[#6D6D6D]">
                Your partnership inquiry has been received peacefully. We will contact you soon to discuss creating a custom wellness program.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-8 bg-[#FCFAF7]/40 border border-[#E8E1D7] rounded-3xl p-5 md:p-12 shadow-sm">
              
              {state?.error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-sans">
                  {state.error}
                </div>
              )}
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D] font-medium">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#5E7052] transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="property" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D] font-medium">
                    Property / Organization Name
                  </label>
                  <input
                    type="text"
                    id="property"
                    name="property"
                    required
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#5E7052] transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D] font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#5E7052] transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
 
                <div className="space-y-2">
                  <label htmlFor="propertyType" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D] font-medium">
                    Property Type
                  </label>
                  <div className="relative">
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      defaultValue=""
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#6D6D6D] font-sans text-base focus:outline-none focus:border-[#5E7052] transition-colors duration-300 disabled:opacity-50 appearance-none rounded-none cursor-pointer"
                    >
                      <option value="" disabled>Select property type...</option>
                      <option value="hotel">Hotel / Resort / Hospitality</option>
                      <option value="apartment">Residential / Apartment Community</option>
                      <option value="workplace">Corporate / Workplace Office</option>
                      <option value="other">Other Space</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#6D6D6D]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="space-y-2">
                <label htmlFor="message" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D] font-medium">
                  Inquiry Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your property, space availability, estimated class frequencies, or any questions..."
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base placeholder-[#6D6D6D]/45 resize-none focus:outline-none focus:border-[#5E7052] transition-colors duration-300 disabled:opacity-50"
                ></textarea>
              </div>
 
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 font-sans text-xs tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-2xl hover:bg-[#5E7052] transition-colors duration-500 disabled:opacity-50 cursor-pointer text-center"
                >
                  {isPending ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
              </div>
 
            </form>
          )}
        </FadeIn>
 
      </div>
    </section>
  );
}
