"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/shared/ContactProvider";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#practice", label: "Practice" },
  { href: "/#journey", label: "Journey" },
  { href: "/#community", label: "Community" },
  { href: "/#support", label: "Support" },
];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openContactModal } = useContactModal();

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
    <footer className="bg-[#FCFAF7] border-t border-[#E8E1D7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Brand */}
          <div className="space-y-5">
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

          {/* Newsletter / Closing */}
          <div className="space-y-4">
            <p className="font-sans text-sm text-[#6D6D6D]">
              Receive occasional reflections and teachings from the path.
            </p>
            <button
              onClick={openContactModal}
              id="footer-newsletter-link"
              className="inline-block font-sans text-sm text-[#262626] border-b border-[#262626] pb-px hover:text-[#D79B42] hover:border-[#D79B42] transition-colors duration-300 cursor-pointer bg-transparent text-left"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Closing line */}
        <div className="mt-16 pt-8 border-t border-[#E8E1D7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
