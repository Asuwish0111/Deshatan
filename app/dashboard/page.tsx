import type { Metadata } from "next";
import TopBar from "@/components/dashboard/TopBar";
import HeroSection from "@/components/dashboard/HeroSection";
import ShowcaseSection from "@/components/dashboard/ShowcaseSection";
import MonumentBand from "@/components/dashboard/MonumentBand";
import CoverageSection from "@/components/dashboard/CoverageSection";
import EverythingSection from "@/components/dashboard/EverythingSection";
import CalculatorSection from "@/components/dashboard/CalculatorSection";
import LiveTrackerSection from "@/components/dashboard/LiveTrackerSection";
import AapkiYatraSection from "@/components/dashboard/AapkiYatraSection";
import YatriBiradariSection from "@/components/dashboard/YatriBiradariSection";
import SiteFooter from "@/components/dashboard/SiteFooter";
import s from "@/components/dashboard/dashboard.module.css";

export const metadata: Metadata = {
  title: "Deshatan — Dashboard",
};

export default function DashboardPage() {
  return (
    <div className={s.page}>
      <TopBar />

      <div className={s.upper}>
        <div className={s.archCap} aria-hidden="true" />
        <div className={s.panel}>
          <div className={s.panelInner}>
            <HeroSection />
            <ShowcaseSection />
          </div>
        </div>
      </div>

      <MonumentBand />

      <div className={s.lower}>
        <div className={s.panelLower}>
          <div className={s.panelLowerInner}>
            <CoverageSection />
          </div>
        </div>
        <EverythingSection />
      </div>

      <div className={s.calcGap} />
      <div className={s.lower}>
        <CalculatorSection />
        <LiveTrackerSection />
        <AapkiYatraSection />
        {/* the cream plate the rust band's rounded corners sit on — the
            footer shares it, so the page closes on one surface */}
        <div className={s.closePanel}>
          <YatriBiradariSection />
          <SiteFooter />
        </div>
      </div>

      <div className={s.archBottom} aria-hidden="true" />
    </div>
  );
}
