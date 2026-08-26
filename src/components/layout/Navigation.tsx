"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/shared/ContactProvider";

const navLinks = [
  { href: "/#channels", label: "Channels" },
  { href: "/#bookings", label: "Offerings" },
  { href: "/onsite", label: "Onsite Yoga" },
  { href: "/shop", label: "Shop" },
  { href: "/#community", label: "Community" },
];

function scrollToSection(id: string) {
  const el = document.querySelector(id.replace("/", ""));
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        scrollToSection(href);
      }
      // If not on home page, let next/link handle routing to /#id
    }
  };

  const isHome = pathname === "/";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav
        className="max-w-[1280px] mx-auto px-6 lg:px-16 h-16 md:h-[72px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={[
            "font-serif text-[23px] tracking-wide transition-colors duration-500 select-none",
            isHome ? "text-white hover:text-[#D79B42]/90" : "text-[#262626] hover:text-[#D79B42]",
          ].join(" ")}
          aria-label="Yogi Manu – home"
        >
          Yogi Manu
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-9" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className={[
                  "font-sans text-[11px] tracking-[0.18em] uppercase",
                  "transition-colors duration-300 relative",
                  isHome ? "text-white/80 hover:text-white" : "text-[#6D6D6D] hover:text-[#262626]",
                  "after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1px]",
                  "after:bg-[#D79B42] after:transition-[width] after:duration-300",
                  "hover:after:w-full",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={openContactModal}
              className={[
                "font-sans text-[11px] tracking-[0.18em] uppercase cursor-pointer bg-transparent border-none",
                "transition-colors duration-300 relative",
                isHome ? "text-white/80 hover:text-white" : "text-[#6D6D6D] hover:text-[#262626]",
                "after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[1px]",
                "after:bg-[#D79B42] after:transition-[width] after:duration-300",
                "hover:after:w-full",
              ].join(" ")}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className={[
            "md:hidden p-2 transition-colors duration-500",
            isHome ? "text-white" : "text-[#262626]",
          ].join(" ")}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen
            ? <X size={20} strokeWidth={1.5} />
            : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={[
          "md:hidden bg-[#FCFAF7] overflow-hidden transition-all duration-500",
          "border-b border-[#E8E1D7]",
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <ul className="px-6 pt-4 pb-6 flex flex-col gap-5" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="font-sans text-[11px] tracking-[0.18em] uppercase text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                openContactModal();
              }}
              className="font-sans text-[11px] tracking-[0.18em] uppercase text-[#6D6D6D] hover:text-[#262626] transition-colors duration-300 cursor-pointer bg-transparent border-none text-left"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
