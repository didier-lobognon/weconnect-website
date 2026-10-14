import { ActivityStack } from "@/components/home/ActivityStack";
import { BranchesScroller } from "@/components/home/BranchesScroller";
import { Highlights } from "@/components/home/Highlights";
import { HomeHero } from "@/components/home/HomeHero";
import { Manifesto } from "@/components/home/Manifesto";
import { MentorshipFlow } from "@/components/home/MentorshipFlow";
import { PhotoMosaic } from "@/components/home/PhotoMosaic";
import { Marquee } from "@/components/motion/Marquee";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { keyMessages } from "@/lib/site";

/** Re-rendered hourly so "À la une" follows the event calendar. */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee items={keyMessages} className="marquee-orange" />
      <Manifesto />
      <PhotoMosaic />
      <BranchesScroller />
      <ActivityStack />
      <MentorshipFlow />
      <Highlights />
      <CtaBanner />
    </>
  );
}
