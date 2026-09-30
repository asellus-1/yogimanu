"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { submitContactInquiry } from "@/app/actions";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#practice", label: "Practice" },
  { href: "/#journey", label: "Journey" },
  { href: "/#community", label: "Community" },
  { href: "/#support", label: "Support" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [state, formAction, isPending] = useActionState(submitContactInquiry, null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome) {
      e.preventDefault();
      const id = href.replace("/", ""); // e.g. "/#about" -> "#about"
      const el = document.querySelector(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <footer id="contact" className="bg-[#FCFAF7] border-t border-[#E8E1D7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex flex-col gap-4 font-serif text-2xl text-[#262626] hover:text-[#D79B42] transition-colors duration-300"
            >
              <Image
                src="/logo.png"
                alt="Yogi Manu Logo"
                width={80}
                height={80}
                className="rounded-[15%] object-cover"
              />
              <span>Yogi Manu</span>
            </Link>
            <p className="font-sans text-sm text-[#6D6D6D] leading-relaxed max-w-[220px]">
              Walking the path with gratitude.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className="font-sans text-sm text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Inquiry Form */}
          <div className="space-y-5">
            <div>
              <h3 className="font-serif text-xl text-[#262626] mb-2">Get in Touch</h3>
              <p className="font-sans text-sm text-[#6D6D6D]">
                If you have questions or feel called to connect, reach out below.
              </p>
            </div>
            
            {state?.success ? (
              <div className="p-5 bg-white/50 rounded-2xl border border-[#E8E1D7]">
                <p className="font-serif text-lg text-[#262626] mb-2">Thank you.</p>
                <p className="font-sans text-xs text-[#6D6D6D]">
                  Your message has been received peacefully. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                {state?.error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-sans">
                    {state.error}
                  </div>
                )}
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name *"
                    disabled={isPending}
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-sm placeholder-[#6D6D6D]/60 focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isPending}
                    placeholder="Email *"
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-sm placeholder-[#6D6D6D]/60 focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                  />
                  <textarea
                    name="message"
                    required
                    rows={2}
                    disabled={isPending}
                    placeholder="Message *"
                    className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-sm placeholder-[#6D6D6D]/60 resize-none focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center h-10 px-6 font-sans text-[10px] tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-xl hover:bg-[#D79B42] transition-colors duration-500 disabled:opacity-50 disabled:hover:bg-[#262626] cursor-pointer"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Closing line */}
        <div className="mt-12 pt-6 border-t border-[#E8E1D7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-serif text-lg italic text-[#6D6D6D]">
            Jai Maharaj Ji.
          </p>
          <p className="font-sans text-xs text-[#6D6D6D]">
            © {new Date().getFullYear()} Yogi Manu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
