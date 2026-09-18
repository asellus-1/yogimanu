import type { Metadata } from "next";
import { OnsiteHero } from "./components/OnsiteHero";
import { OnsiteConcept } from "./components/OnsiteConcept";
import { HotelProgram } from "./components/HotelProgram";
import { WhyHotels } from "./components/WhyHotels";
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PropertyPartnerships } from "./components/PropertyPartnerships";
import { HowItWorks } from "./components/HowItWorks";
import { OnsiteContact } from "./components/OnsiteContact";

export const metadata: Metadata = {
  title: "Onsite Yoga & Restore | Wellness Programs for Hotels & Properties",
  description:
    "Bring professional restorative yoga classes, guided Travel Recovery Restore sessions, and premium wellness amenities directly to your hotel guests, residents, or workplace.",
  openGraph: {
    title: "Onsite Yoga & Restore | Wellness Programs for Hotels & Properties",
    description:
      "Bring professional restorative yoga classes, guided Travel Recovery Restore sessions, and premium wellness amenities directly to your hotel guests, residents, or workplace.",
    type: "website",
    images: [
      {
        url: "/images/onsite%20sharing.png",
        width: 1200,
        height: 630,
        alt: "Onsite Yoga & Restore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onsite Yoga & Restore | Wellness Programs for Hotels & Properties",
    description:
      "Bring professional restorative yoga classes, guided Travel Recovery Restore sessions, and premium wellness amenities directly to your hotel guests, residents, or workplace.",
    images: ["/images/onsite%20sharing.png"],
  },
};

export default function OnsiteYogaPage() {
  return (
    <main className="bg-[#FCFAF7] min-h-screen">
      <OnsiteHero />
      <OnsiteConcept />
      <HotelProgram />
      <WhyHotels />
      <WhatsIncluded />
      <PropertyPartnerships />
      <HowItWorks />
      <OnsiteContact />
    </main>
  );
}
