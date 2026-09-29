"use client";

import { FadeIn } from "@/components/shared/FadeIn";
import { useActionState } from "react";
import { submitContactInquiry } from "@/app/actions";

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, null);

  return (
    <section id="contact" className="bg-[#FCFAF7] py-24 md:py-36 border-t border-[#E8E1D7] relative overflow-hidden">
      {/* Subtle ambient warm glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D79B42]/5 rounded-full blur-3xl pointer-events-none -mr-48"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8E1D7]/20 rounded-full blur-2xl pointer-events-none -ml-32"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column (5 cols): Editorial introduction & context */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn>
              <span className="block font-sans text-[11px] tracking-[0.25em] uppercase text-[#D79B42] font-semibold mb-4">
                Inquiries &amp; Connection
              </span>
              <h2 className="font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] font-light text-[#262626] leading-[1.08] tracking-tight">
                Get in touch <br />
                <em className="italic text-[#D79B42]">from the heart.</em>
              </h2>
              <p className="font-sans text-base text-[#6D6D6D] leading-[1.85] mt-6">
                Whether you have questions regarding the daily practices, teachings, retreat collaborations, or simply feel called to share a personal reflection, every message is received with quiet attention and care.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="pt-6 border-t border-[#E8E1D7] space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#E8E1D7]/50 flex items-center justify-center text-[#D79B42] flex-shrink-0 mt-0.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-wider uppercase text-[#6D6D6D] font-medium">Thoughtful Replies</p>
                    <p className="font-sans text-sm text-[#262626] mt-0.5 leading-relaxed">
                      Every message is personally read and responded to in peaceful time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#E8E1D7]/50 flex items-center justify-center text-[#D79B42] flex-shrink-0 mt-0.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-wider uppercase text-[#6D6D6D] font-medium">Sacred &amp; Private</p>
                    <p className="font-sans text-sm text-[#262626] mt-0.5 leading-relaxed">
                      Feel free to speak honestly – all shares and questions are held in confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <blockquote className="font-serif italic text-lg text-[#6D6D6D] border-l-2 border-[#D79B42]/50 pl-4 py-1">
                  “Love everyone. Serve everyone. Remember God.”
                </blockquote>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (7 cols): Expansive Aesthetic Form Card */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              {state?.success ? (
                <div className="text-center py-20 px-8 bg-[#F8F5EF] border border-[#E8E1D7] rounded-3xl shadow-sm">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#D79B42]/10 text-[#D79B42] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-serif text-3xl font-light text-[#262626] mb-3">Thank you.</p>
                  <p className="font-sans text-base text-[#6D6D6D] max-w-[420px] mx-auto leading-relaxed">
                    Your message has been received peacefully. We will get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="bg-[#F8F5EF] border border-[#E8E1D7] rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm relative">
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-[#262626]">
                      Send a Message
                    </h3>
                    <p className="font-sans text-sm text-[#6D6D6D] mt-1.5">
                      Fill out the form below and we will be in touch with you.
                    </p>
                  </div>

                  <form action={formAction} className="space-y-6">
                    {state?.error && (
                      <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 font-sans text-center">
                        {state.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block font-sans text-[11px] tracking-[0.16em] uppercase text-[#6D6D6D] font-medium">
                          Your Name <span className="text-[#D79B42]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g. Maya Sharma"
                          disabled={isPending}
                          className="w-full bg-[#FCFAF7] border border-[#E8E1D7] rounded-2xl px-5 py-3.5 text-[#262626] font-sans text-base placeholder-[#6D6D6D]/40 focus:outline-none focus:bg-white focus:border-[#D79B42] focus:ring-2 focus:ring-[#D79B42]/15 transition-all duration-300 disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block font-sans text-[11px] tracking-[0.16em] uppercase text-[#6D6D6D] font-medium">
                          Email Address <span className="text-[#D79B42]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="maya@example.com"
                          disabled={isPending}
                          className="w-full bg-[#FCFAF7] border border-[#E8E1D7] rounded-2xl px-5 py-3.5 text-[#262626] font-sans text-base placeholder-[#6D6D6D]/40 focus:outline-none focus:bg-white focus:border-[#D79B42] focus:ring-2 focus:ring-[#D79B42]/15 transition-all duration-300 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block font-sans text-[11px] tracking-[0.16em] uppercase text-[#6D6D6D] font-medium">
                        Your Message or Reflection <span className="text-[#D79B42]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Share your thoughts, questions about the practices, or how these teachings have met you on your path..."
                        disabled={isPending}
                        className="w-full bg-[#FCFAF7] border border-[#E8E1D7] rounded-2xl px-5 py-4 text-[#262626] font-sans text-base placeholder-[#6D6D6D]/40 resize-none focus:outline-none focus:bg-white focus:border-[#D79B42] focus:ring-2 focus:ring-[#D79B42]/15 transition-all duration-300 disabled:opacity-50"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="font-sans text-xs text-[#6D6D6D] order-2 sm:order-1">
                        Responses typically sent within 24–48 hours.
                      </span>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 font-sans text-xs tracking-[0.16em] uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-full hover:bg-[#D79B42] hover:shadow-lg hover:shadow-[#D79B42]/20 transition-all duration-300 disabled:opacity-50 cursor-pointer group order-1 sm:order-2"
                      >
                        <span>{isPending ? "Sending..." : "Send Message"}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
