"use client";

import React, { useState, useEffect } from 'react';
import { Video, Globe } from 'lucide-react';

export default function HeroSection() {
  const [videoSrc, setVideoSrc] = useState("/video1.mp4");
  const servicesToType = [
    "Web Development", "App Development", "AI Call & Chat Agents", 
    "Software Development", "Data Analytics", "Architectural Blueprints", 
    "Interior Designs", "Digital Marketing", "SEO Optimization"
  ];
  
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = servicesToType[currentServiceIndex];
    if (!isDeleting) {
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => setCurrentText(fullWord.slice(0, currentText.length + 1)), 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => setCurrentText(fullWord.slice(0, currentText.length - 1)), 50);
      } else {
        setIsDeleting(false);
        setCurrentServiceIndex((prev) => (prev + 1) % servicesToType.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentServiceIndex]);

  useEffect(() => {
    const videos = ["/video1.mp4", "/video2.mp4"];
    setVideoSrc(videos[Math.floor(Math.random() * videos.length)]);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 opacity-20 dark:opacity-50 pointer-events-none mix-blend-screen overflow-hidden">
        <video key={videoSrc} autoPlay muted playsInline onEnded={() => setVideoSrc(prev => prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4")} className="w-full h-full object-cover object-center scale-100 brightness-[0.5]">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3F4F6] dark:from-[#030712] via-transparent to-transparent" />
      </div>

      <section id="home" className="relative pt-20 pb-20 md:pt-28 md:pb-24 max-w-7xl mx-auto px-6">
        <div className="absolute top-[-10%] left-1/4 w-[800px] h-[400px] bg-blue-500/5 dark:bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none z-[1]" />
        <button onClick={() => setVideoSrc(prev => prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4")} className="absolute bottom-4 left-6 z-20 hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 hover:border-blue-500/40 text-[10px] font-mono uppercase tracking-wider text-gray-600 dark:text-gray-400 rounded-full backdrop-blur-md transition-all">
          <Video className="w-3 h-3 text-blue-500 dark:text-cyan-400" /> Switch Ambience
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" /> Available for projects
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]" style={{ minHeight: '135px' }}>
              We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 typewriter-cursor">
                {currentText}
              </span>
              <br />
              <span className="text-gray-400 dark:text-gray-700/60 font-black">That Scale.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl font-light leading-relaxed">
              From LLM fine-tuning to pixel-perfect interfaces — we engineer digital systems that automate workflows, delight users, and generate production value. Lahore-based. Global delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#services" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10">Explore Services</a>
              <a href="#contact" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-400 bg-transparent rounded-lg hover:text-blue-600 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-800">Let's Talk</a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="w-80 p-6 bg-white/80 dark:bg-[#0b1120]/80 border border-gray-200 dark:border-gray-800/80 rounded-2xl backdrop-blur-md shadow-2xl space-y-6 ml-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-cyan-600/10 border border-blue-100 dark:border-cyan-500/20 rounded-lg text-blue-600 dark:text-cyan-400">
                  <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Live Metrics</div>
                  <div className="text-[10px] font-mono text-gray-500">AI pipeline • production</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400 mb-1">
                    <span>MODEL ACCURACY</span><span className="text-gray-900 dark:text-white font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-900 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 dark:bg-cyan-500 h-full w-[94%]" /></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 text-[9px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md">● Production live</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md">Lahore HQ</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}