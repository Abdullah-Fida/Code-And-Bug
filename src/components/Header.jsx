'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReserve = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProof = () => {
    const el = document.getElementById('case-studies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 h-18 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-xl border-b border-white/5' :'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <AppLogo
        size={32}
        text="Signal"
        className="cursor-pointer"
      />

      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={handleProof}
          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted hover:text-silver transition-colors duration-200"
        >
          See the Proof
        </button>
        <button
          onClick={() => {
            const el = document.getElementById('methodology');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted hover:text-silver transition-colors duration-200"
        >
          Methodology
        </button>
      </nav>

      <button
        onClick={handleReserve}
        className="btn-gold px-7 py-3 text-[11px] rounded-sm"
      >
        <span>Reserve Your Slot</span>
      </button>
    </header>
  );
};

export default Header;