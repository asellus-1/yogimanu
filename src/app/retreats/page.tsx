"use client";
 
import { useActionState } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { submitRetreatInquiry } from "@/app/actions";
 
export default function RetreatsPage() {
  const [state, formAction, isPending] = useActionState(submitRetreatInquiry, null);
 
  return (
    <main className="bg-[#FCFAF7] min-h-screen">
      {/* Hero Header */}
      <section className="relative flex items-center justify-center overflow-hidden pt-32 pb-16 border-b border-[#E8E1D7]">
        {/* Decorative center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#E8E1D7] -translate-x-1/2" aria-hidden="true" />
 
        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <FadeIn>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#D79B42] mb-6">
              Collaborations
            </span>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#262626] leading-[1.1] mb-6">
              Invite Manu to a <em className="italic">Retreat</em>
            </h1>
            <p className="font-sans text-base md:text-lg text-[#6D6D6D] leading-relaxed max-w-[560px] mx-auto">
              Bring the depth of authentic yoga teachings, guided breathwork, and devotional live kirtan to your festival, workshop, or retreat – anywhere in the world. Reach out and let&apos;s explore what&apos;s possible.
            </p>
          </FadeIn>
        </div>
      </section>
 
      {/* Form Section */}
      <section className="py-12 md:py-28">
        <div className="max-w-[760px] mx-auto px-6">
          <FadeIn delay={0.1}>
            {state?.success ? (
              <div className="text-center p-12 bg-[#F8F5EF] border border-[#E8E1D7] rounded-2xl">
                <p className="font-serif text-2xl text-[#262626] mb-3">Thank you.</p>
                <p className="font-sans text-sm text-[#6D6D6D]">
                  Your booking inquiry has been received. We will be in touch soon.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-8 bg-[#F8F5EF]/40 border border-[#E8E1D7] rounded-3xl p-5 md:p-12 shadow-sm">
                
                {state?.error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-sans">
                    {state.error}
                  </div>
                )}
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="organization" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Organization / Retreat Name
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="eventType" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Event Type
                    </label>
                    <div className="relative">
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        defaultValue=""
                        disabled={isPending}
                        className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50 appearance-none rounded-none cursor-pointer"
                      >
                        <option value="" disabled>Select an event type...</option>
                        <option value="retreat">Retreat</option>
                        <option value="workshop">Workshop / Seminar</option>
                        <option value="festival">Festival</option>
                        <option value="private">Private Event</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6D6D6D]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="location" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Location (City, Country)
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dates" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                      Preferred Dates
                    </label>
                    <input
                      type="text"
                      id="dates"
                      name="dates"
                      required
                      disabled={isPending}
                      placeholder="e.g. Fall 2026 or Oct 12-14"
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50 placeholder-[#6D6D6D]/45"
                    />
                  </div>
                </div>
 
                <div className="space-y-2">
                  <label htmlFor="audienceSize" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                    Expected Audience Size
                  </label>
                  <input
                    type="text"
                    id="audienceSize"
                    name="audienceSize"
                    required
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
 
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                    Message / Event Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-3 text-[#262626] font-sans text-base resize-none focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                  ></textarea>
                </div>
 
                <div className="pt-2 text-center">
                  <p className="font-sans text-xs text-[#6D6D6D] tracking-wide bg-[#F8F5EF] inline-block px-4 py-2 border border-[#E8E1D7] rounded-md">
                    Currently accepting retreat and event bookings worldwide.
                  </p>
                </div>
 
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center justify-center min-h-[48px] px-8 font-sans text-xs tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-2xl hover:bg-[#D79B42] hover:text-[#1a1208] transition-colors duration-500 disabled:opacity-50 disabled:hover:bg-[#262626] cursor-pointer"
                  >
                    {isPending ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
