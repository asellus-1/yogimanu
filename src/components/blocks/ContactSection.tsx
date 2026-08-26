"use client";

import { FadeIn } from "@/components/shared/FadeIn";
import { useActionState } from "react";
import { submitContactInquiry } from "@/app/actions";

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, null);

  return (
    <section id="contact" className="bg-[#FCFAF7] py-16 md:py-36 border-t border-[#E8E1D7]">
      <div className="max-w-[760px] mx-auto px-6 lg:px-16">
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light text-[#262626] leading-[1.1] mb-6">
              Get in touch.
            </h2>
            <p className="font-sans text-base text-[#6D6D6D] leading-relaxed max-w-[480px] mx-auto">
              If you have questions about the practices, or simply want to connect, feel free to reach out. We will get back to you soon.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {state?.success ? (
            <div className="text-center p-12 bg-[#F8F5EF] border border-[#E8E1D7] rounded-lg">
              <p className="font-serif text-2xl text-[#262626] mb-3">Thank you.</p>
              <p className="font-sans text-sm text-[#6D6D6D]">Your message has been received peacefully.</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-8">
              {state?.error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-sans text-center">
                  {state.error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                    Name
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
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block font-sans text-xs tracking-widest uppercase text-[#6D6D6D]">
                  Message
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
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 font-sans text-xs tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-2xl hover:bg-[#D79B42] transition-colors duration-500 disabled:opacity-50 disabled:hover:bg-[#262626]"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
