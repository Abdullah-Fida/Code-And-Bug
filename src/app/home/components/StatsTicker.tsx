'use client';

import React from 'react';

const TICKER_ITEMS = [
  { value: '$28.6M', label: 'Revenue Generated' },
  { value: '6.8×', label: 'Avg ROAS' },
  { value: '340+', label: 'Creative Tests / Mo.' },
  { value: '$4.2M', label: 'Monthly Spend Managed' },
  { value: '18 days', label: 'To First Profitable Day' },
  { value: '23', label: 'Active Brands' },
  { value: '41%', label: 'Avg CAC Reduction' },
  { value: '14 mo.', label: 'Avg Client Lifespan' },
];

const StatsTicker: React.FC = () => {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="py-5 overflow-hidden relative"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(26,26,46,0.3)',
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg-void), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg-void), transparent)' }} />

      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10 mx-10 flex-shrink-0">
            <span className="font-display font-bold text-gold text-lg">{item.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted whitespace-nowrap">{item.label}</span>
            <span className="w-1 h-1 rounded-full bg-gold/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsTicker;