'use client';
import { useEffect } from 'react';

// Scroll-reveal for .reveal elements, with reduced-motion respected.
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
