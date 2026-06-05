"use client";

import React, { useState } from 'react';

export default function ProofRail() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const processSteps = [
    { num: "01", title: "Discovery & Strategy", description: "Deep-dive into your vision, market, and goals. We map a clear roadmap before a single line of code is written." },
    { num: "02", title: "Design & Prototyping", description: "Crafting wireframes, UI/UX designs, and interactive prototypes to visualize the end product." },
    { num: "03", title: "Development & Build", description: "Writing clean, scalable code. Our engineers bring the designs to life using modern tech stacks." },
    { num: "04", title: "Testing & QA", description: "Rigorous quality assurance to squash bugs and ensure seamless performance across all devices." },
    { num: "05", title: "Deployment & Launch", description: "Smooth migration to production servers. We handle the heavy lifting of going live seamlessly." },
    { num: "06", title: "Growth & Support", description: "Post-launch maintenance, analytics tracking, and continuous feature scaling for your business." }
  ];

  return (
    <section id="process" className="py-24 border-t border-gray-200 dark:border-gray-900 bg-white dark:bg-[#02050B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            A Proven <span className="text-blue-600 dark:text-cyan-400">6-Step Process</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light text-base max-w-xl">
            From first conversation to live product — a clear, collaborative process that keeps you in the loop at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-2 relative z-10">
            {processSteps.map((step, index) => {
              const isActive = activeProcessStep === index;
              return (
                <div key={index} onClick={() => setActiveProcessStep(index)} className="cursor-pointer border-b border-gray-200 dark:border-gray-800/60 pb-4 last:border-0">
                  <div className="flex items-center gap-6 py-4 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold font-mono transition-all duration-300 ${isActive ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-gray-100 dark:bg-[#0b1120] border border-gray-200 dark:border-gray-800 text-gray-500'}`}>
                      {step.num}
                    </div>
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[200px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-18 ml-[4.5rem]">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 relative h-[500px] lg:h-[600px] w-full rounded-3xl border border-gray-200 dark:border-gray-800/80 bg-gray-50 dark:bg-[#050811] overflow-hidden shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div key={activeProcessStep} className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
              <div className="relative flex items-center justify-center w-[400px] h-[400px]">
                <div className="absolute w-[380px] h-[380px] rounded-full border border-gray-300 dark:border-gray-800/40 animate-spin" style={{ animationDuration: '25s' }} />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-gray-400 dark:border-gray-700/50 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_50px_rgba(59,130,246,0.4)] flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-tighter drop-shadow-md">{processSteps[activeProcessStep].num}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
