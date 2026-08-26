import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ContactProvider } from "@/components/shared/ContactProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yogimanu.com"),
  title: "Yogi Manu | Yoga, Kirtan & Spiritual Teachings",
  description:
    "Discover yoga, kirtan, meditation and spiritual teachings rooted in lived experience, devotion and daily practice.",
  openGraph: {
    title: "Yogi Manu | Yoga, Kirtan & Spiritual Teachings",
    description:
      "Discover yoga, kirtan, meditation and spiritual teachings rooted in lived experience, devotion and daily practice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper antialiased">
        <ContactProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContactProvider>
      </body>
    </html>
  );
}
