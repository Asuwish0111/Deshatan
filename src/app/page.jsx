import Ticker from '@/components/marketing/Ticker';
import SiteNav from '@/components/marketing/SiteNav';
import Hero from '@/components/marketing/Hero';
import Showcase from '@/components/marketing/Showcase';
import WarliBand from '@/components/marketing/WarliBand';
import Coverage from '@/components/marketing/Coverage';
import Features from '@/components/marketing/Features';
import NightSection from '@/components/marketing/NightSection';
import Calculator from '@/components/marketing/Calculator';
import Groups from '@/components/marketing/Groups';
import Community from '@/components/marketing/Community';
import FinalCTA from '@/components/marketing/FinalCTA';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/Reveal';

export default function HomePage() {
  return (
    <div id="site-marketing">
      <Ticker />
      <SiteNav />
      <main id="top">
        <Hero />
        <Showcase />
        <WarliBand />
        <Coverage />
        <Features />
        <NightSection />
        <Calculator />
        <Groups />
        <Community />
        <FinalCTA />
      </main>
      <SiteFooter />
      <Reveal />
    </div>
  );
}
