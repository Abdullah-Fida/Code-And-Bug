"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Smartphone, Terminal, BarChart3, Compass, Home as HomeIcon, MessageSquareCode, TrendingUp, Search, ArrowRight } from 'lucide-react';

export default function Methodology() {
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisibleItems((prev) => ({ ...prev, [entry.target.id]: true }));
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-slide').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const capabilities = [
    { num: "01", icon: <Globe className="w-6 h-6" />, title: "Web Development", description: "Production-grade web apps with modern stacks — fast, scalable, and pixel-perfect.", features: ["React / Next.js", "Node.js / Express"] },
    { num: "02", icon: <Smartphone className="w-6 h-6" />, title: "App Development", description: "Cross-platform and native mobile experiences built for high performance and user delight.", features: ["React Native", "Flutter"] },
    { num: "03", icon: <Terminal className="w-6 h-6" />, title: "Software Development", description: "Engineering robust enterprise systems, desktop applications, and scalable backend infrastructures.", features: ["Enterprise Systems", "Custom Architectures"] },
    { num: "04", icon: <BarChart3 className="w-6 h-6" />, title: "Data Analyst", description: "Transforming raw production system metrics into live predictive workflows and trend dashboards.", features: ["Data Visualization", "Predictive Modeling"] },
    { num: "05", icon: <Compass className="w-6 h-6" />, title: "Architectural Designs", description: "Drafting high-precision industrial-grade structural blueprints and digital 3D schematics.", features: ["3D Modeling", "CAD Drafting"] },
    { num: "06", icon: <HomeIcon className="w-6 h-6" />, title: "Interior Designs", description: "Conceptualizing premium luxury visual layouts and ambient spatial mapping for modern spaces.", features: ["Material Selection", "3D Rendering"] }
  ];

  return (
    <section id="services" className="py-24 border-t border-gray-200 dark:border-gray-900 bg-[#F9FAFB] dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Services Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Engineering Excellence</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Every service we offer is enhanced by cutting-edge technology — from design research to deployment monitoring. One investment that compounds over time.
          </p>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-800/80 rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {capabilities.map((tech, index) => {
              const elementId = `tech-card-${index}`;
              const isVisible = visibleItems[elementId];
              return (
                <div key={index} id={elementId} className={`scroll-slide relative p-8 lg:p-10 bg-white dark:bg-[#0b1120] transition-all duration-500 group flex flex-col justify-between min-h-[400px] overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 80}ms` }}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 dark:via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 group-hover:border-blue-500/40 transition-colors">
                      <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">{tech.num}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#030712] text-gray-500 group-hover:border-blue-500/40 group-hover:text-blue-500 transition-all">
                      {tech.icon}
                    </div>
                  </div>
                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">{tech.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-8">{tech.description}</p>
                    <ul className="space-y-3.5">
                      {tech.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-[13px] text-gray-600 dark:text-gray-300 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-500" />{feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 flex justify-between items-center relative z-10">
                    <span className="text-[10px] font-mono tracking-widest text-blue-500 dark:text-cyan-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Learn More</span>
                    <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-blue-500 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 bg-gray-50 dark:bg-[#030712] transition-all">
                      <ArrowRight className="w-4 h-4 rotate-45" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}