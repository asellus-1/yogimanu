import type { Metadata } from "next";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ChannelsSection } from "@/components/blocks/ChannelsSection";
import { AboutSection } from "@/components/blocks/AboutSection";
import { ThreePillarsSection } from "@/components/blocks/ThreePillarsSection";
import { JourneySection } from "@/components/blocks/JourneySection";
import { MaharajJiSection } from "@/components/blocks/MaharajJiSection";
import { OfferingsSection } from "@/components/blocks/OfferingsSection";
import { BeginSection } from "@/components/blocks/BeginSection";
import { DailyPracticeSection } from "@/components/blocks/DailyPracticeSection";
import { CommunitySection } from "@/components/blocks/CommunitySection";
import { SupportSection } from "@/components/blocks/SupportSection";

export const metadata: Metadata = {
  title: "Yogi Manu | Yoga, Kirtan & Spiritual Teachings",
  description:
    "Discover yoga classes, kirtan and spiritual teachings from Yogi Manu – rooted in lived experience, devotion and daily practice.",
  openGraph: {
    title: "Yogi Manu | Yoga, Kirtan & Spiritual Teachings",
    description:
      "Discover yoga classes, kirtan and spiritual teachings from Yogi Manu – rooted in lived experience, devotion and daily practice.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ThreePillarsSection />
      <ChannelsSection />
      <JourneySection />
      <MaharajJiSection />
      <OfferingsSection />
      <BeginSection />
      <DailyPracticeSection />
      <CommunitySection />
      <SupportSection />
    </>
  );
}
