import type { Metadata } from "next";
import TopBar from "@/components/dashboard/TopBar";
import ShowcaseSection from "@/components/dashboard/ShowcaseSection";
import MonumentBand from "@/components/dashboard/MonumentBand";
import CoverageSection from "@/components/dashboard/CoverageSection";
import EverythingSection from "@/components/dashboard/EverythingSection";
import CalculatorSection from "@/components/dashboard/CalculatorSection";
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
        <EverythingSection id="features-more" />
      </div>

      <div className={s.tail} />
      <div className={s.archBottom} aria-hidden="true" />
    </div>
  );
}
