"use client";

import React, { useState, useEffect } from "react";
import { useDeshatan } from "@/lib/context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Coverage from "@/components/sections/Coverage";
import Features from "@/components/sections/Features";
import Night from "@/components/sections/Night";
import Calculator from "@/components/sections/Calculator";
import Groups from "@/components/sections/Groups";
import Community from "@/components/sections/Community";
import Final from "@/components/sections/Final";

export default function Home() {
  const { language } = useDeshatan();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main>
      <Header />
      <Hero />
      <div className="showcase" id="showcase">
        <Showcase />
      </div>
      <div className="temple-border"></div>
      <section className="coverage" id="coverage">
        <div className="wrap">
          <Coverage />
        </div>
      </section>
      <section className="features" id="features">
        <div className="wrap">
          <Features />
        </div>
      </section>
      <section className="night" id="tracking">
        <div className="wrap">
          <Night />
        </div>
      </section>
      <section className="calc" id="calculator">
        <div className="wrap">
          <Calculator />
        </div>
      </section>
      <section className="groups" id="groups">
        <div className="wrap">
          <Groups />
        </div>
      </section>
      <section className="community">
        <div className="wrap">
          <Community />
        </div>
      </section>
      <section className="final">
        <div className="final-glow"></div>
        <div className="wrap">
          <Final />
        </div>
      </section>
      <Footer />
    </main>
  );
}
