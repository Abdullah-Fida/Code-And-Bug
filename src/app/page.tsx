"use client";
import Chatbox from "../components/Chatbox";
import CallAgent from "../components/CallAgent";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Globe, Smartphone, BarChart, Compass, Home as HomeIcon, 
  MessageSquareCode, TrendingUp, Search, ArrowRight, ShieldCheck, Video, 
  CircleCheck, Network, Lock, MessageCircle, Mail, MapPin, ArrowUpRight,
  Calendar, Menu, X 
} from 'lucide-react';

// --- 1. REUSABLE REVEAL ANIMATION ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.classList.add('is-visible');
      } else {
        ref.current?.classList.remove('is-visible');
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-wrapper ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- 2. EXACT ORIGINAL TYPING EFFECT (SMOOTH & FIXED) ---
const SERVICES_LIST = [
  "Web Development", 
  "App Development", 
  "AI Call Agent", 
  "AI Chat Bot", 
  "Software Development", 
  "Architectural Designs", 
  "Interior Designs"
];

const TypingEffect = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = SERVICES_LIST[index];

    if (!isDeleting) {
      if (text.length < fullWord.length) {
        timer = setTimeout(() => setText(fullWord.slice(0, text.length + 1)), 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(fullWord.slice(0, text.length - 1)), 50);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % SERVICES_LIST.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 typing-cursor break-words">
      {text}
    </span>
  );
};


// --- MAIN HOME COMPONENT ---
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', project: '' });
  const [submitted, setSubmitted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/video1.mp4");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isTeamVisible, setIsTeamVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const videos = ["/video1.mp4", "/video2.mp4"];
    setVideoSrc(videos[Math.floor(Math.random() * videos.length)]);
  }, []);

  const handleVideoEnded = () => setVideoSrc(prev => prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4");
  const handleNextVideo = () => setVideoSrc(prev => prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4");

  // Scroll-Spy for 6-Step Process
  useEffect(() => {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveProcessStep(Number(entry.target.getAttribute('data-step')));
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    document.querySelectorAll('.process-step').forEach((el) => spyObserver.observe(el));
    return () => spyObserver.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    const el = document.getElementById(`process-step-${index}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.project) setSubmitted(true);
  };

  const capabilities = [
    { num: "01", icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, title: "Web Development", description: "Production-grade web apps with modern stacks.", features: ["React / Next.js", "Node.js / Express"] },
    { num: "02", icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6" />, title: "App Development", description: "Cross-platform native mobile experiences.", features: ["React Native", "Flutter"] },
    { num: "03", icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />, title: "Software Development", description: "Engineering robust enterprise systems.", features: ["Enterprise Systems", "Custom Architectures"] },
    { num: "04", icon: <BarChart className="w-5 h-5 md:w-6 md:h-6" />, title: "Data Analyst", description: "Transforming metrics into live predictive workflows.", features: ["Data Visualization", "Predictive Modeling"] },
    { num: "05", icon: <Compass className="w-5 h-5 md:w-6 md:h-6" />, title: "Architectural Designs", description: "High-precision industrial-grade structural blueprints.", features: ["3D Modeling", "CAD Drafting"] },
    { num: "06", icon: <HomeIcon className="w-5 h-5 md:w-6 md:h-6" />, title: "Interior Designs", description: "Conceptualizing premium luxury visual layouts.", features: ["Material Selection", "3D Rendering"] },
    { num: "07", icon: <MessageSquareCode className="w-5 h-5 md:w-6 md:h-6" />, title: "AI Bots", description: "Deploying conversational AI call agents.", features: ["Voice AI", "LLM Chatbots"] },
    { num: "08", icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />, title: "Digital Marketing", description: "Data-driven campaigns to build brand trust.", features: ["Social Media", "PPC"] },
    { num: "09", icon: <Search className="w-5 h-5 md:w-6 md:h-6" />, title: "SEO", description: "Strategic search engine optimization for rankings.", features: ["Keyword Research", "On-Page"] }
  ];

  const processSteps = [
    { num: "01", short: "Discovery", title: "Discovery & Strategy", description: "Deep-dive into your vision, market, and goals. We map a clear roadmap before a single line of code is written.", bullet: "Map competitive landscape and align on roadmap." },
    { num: "02", short: "Design", title: "Design & Prototyping", description: "Crafting wireframes, UI/UX designs, and interactive prototypes to visualize the end product.", bullet: "High-fidelity mockups ensuring intuitive experiences." },
    { num: "03", short: "Development", title: "Development & Build", description: "Writing clean, scalable code. Our engineers bring the designs to life using modern tech stacks.", bullet: "Agile sprints, continuous integration, and transparent tracking." },
    { num: "04", short: "Testing", title: "Testing & QA", description: "Rigorous quality assurance to squash bugs and ensure seamless performance across all devices.", bullet: "Automated & manual security and speed protocols." },
    { num: "05", short: "Deployment", title: "Deployment & Launch", description: "Smooth migration to production servers. We handle the heavy lifting of going live seamlessly.", bullet: "Zero-downtime deployment and live-environment checks." },
    { num: "06", short: "Growth", title: "Growth & Support", description: "Post-launch maintenance, analytics tracking, and continuous feature scaling for your business.", bullet: "Ongoing tech support, monitoring, and SLA maintenance." }
  ];

  const team = [
    { name: "Moazzam Sultan", role: "Lead Software Engineer", initials: "MS" },
    { name: "Muhammad Zaid", role: "AI Core & Data Architect", initials: "MZ" },
    { name: "Zaman Khan", role: "Full-Stack Developer", initials: "ZK" },
    { name: "Muzzamil Sultan", role: "Systems Consultant", initials: "MS" },
    { name: "Abdullah Faida", role: "Spatial Design Architect", initials: "AF" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      
      {/* CSS For Global Reveal Animations & Cursor */}
      <style dangerouslySetInnerHTML={{__html: `
        .reveal-wrapper {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-wrapper.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .typing-cursor::after {
          content: '|';
          color: #22d3ee;
          animation: blink 1s step-start infinite;
          margin-left: 2px;
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-dropdown { animation: slideDown 0.2s ease forwards; }
        * { -webkit-tap-highlight-color: transparent; }
      `}} />

      {/* Background Video Layer - Absolute viewport locked */}
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden max-w-full">
        <video key={videoSrc} autoPlay muted playsInline onEnded={handleVideoEnded} className="w-full h-full object-cover object-center scale-100 brightness-[0.4]">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
      </div>

      {/* Sticky Clean Navbar */}
      <div className="w-full sticky top-4 z-50 px-2 sm:px-4 max-w-full">
        <header className="max-w-5xl mx-auto h-14 rounded-full border border-gray-800/80 bg-gray-950/70 backdrop-blur-xl flex items-center justify-between px-3 sm:px-5 md:px-6 shadow-2xl shadow-black/50">
          <div className="flex items-center space-x-1.5 cursor-pointer shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center transform rotate-12">
              <Terminal className="w-2.5 h-2.5 text-white -rotate-12" />
            </div>
            <span className="font-bold tracking-tight text-white text-[11px] sm:text-sm md:text-base">
              Code<span className="text-cyan-400">&</span>Bugs
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 text-[11px] font-medium tracking-wide text-gray-400 uppercase">
            <a href="#home" className="hover:text-white px-3 py-1.5 rounded-full transition-colors">Home</a>
            <a href="#about" className="hover:text-white px-3 py-1.5 rounded-full transition-colors">About</a>
            <a href="#services" className="hover:text-white px-3 py-1.5 rounded-full transition-colors">Services</a>
            <a href="#process" className="hover:text-white px-3 py-1.5 rounded-full transition-colors">Process</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); setIsTeamVisible(true); setTimeout(() => { document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer">Team</a>
            <a href="#contact" className="hover:text-white px-3 py-1.5 rounded-full transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <a href="#contact" className="inline-flex items-center justify-center px-2.5 py-1.5 sm:px-4 sm:py-1.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-cyan-600 rounded-full hover:bg-cyan-500 transition-all duration-300">
              Start
            </a>
            {/* Mobile Navigation Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1 text-gray-400 hover:text-white bg-gray-900/60 rounded-full border border-gray-800 transition-all">
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown md:hidden mt-2 w-[calc(100vw-1.5rem)] max-w-sm mx-auto rounded-2xl border border-gray-800 bg-gray-950/95 backdrop-blur-2xl p-4 flex flex-col space-y-2 text-xs font-semibold uppercase tracking-wider text-gray-400 shadow-2xl transition-opacity">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all">Services</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all">Process</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setIsTeamVisible(true); setTimeout(() => { document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all cursor-pointer">Team</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white hover:bg-gray-900 px-4 py-2.5 rounded-xl transition-all">Contact</a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-6 pb-12 md:pt-24 md:pb-24 max-w-7xl mx-auto px-3 sm:px-6">
        <div className="absolute top-[-5%] left-1/4 w-[180px] sm:w-[600px] lg:w-[800px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none z-[1]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 w-full">
          <Reveal className="lg:col-span-7 space-y-4 md:space-y-7 text-center lg:text-left flex flex-col items-center lg:items-start w-full max-w-full overflow-hidden">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] md:text-xs font-medium uppercase tracking-wider mx-auto lg:mx-0">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Available for projects
            </div>
            
            {/* Super Responsive Text Layout to fit 281px screen wrap */}
            <h1 className="text-xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.2] sm:leading-[1.1] min-h-[90px] sm:min-h-[180px] lg:min-h-[140px] w-full break-words px-1">
              We Build <br className="hidden sm:block" />
              <TypingEffect />
              <br />
              <span className="text-gray-700/80 font-black">That Scale.</span>
            </h1>

            <p className="text-[11px] sm:text-sm md:text-lg text-gray-400 max-w-xl font-light leading-relaxed px-1 sm:px-0">
              From LLM fine-tuning to pixel-perfect interfaces — we engineer digital systems that automate workflows, delight users, and generate production value.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1 w-full sm:w-auto px-2 sm:px-0">
              <a href="#services" className="inline-flex items-center justify-center px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all">Explore Services</a>
              <a href="#contact" className="inline-flex items-center justify-center px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 bg-transparent rounded-lg hover:text-white transition-colors border border-gray-800">Let's Talk</a>
            </div>
          </Reveal>

          {/* Metric Panel Card */}
          <Reveal delay={200} className="hidden lg:block lg:col-span-5 relative w-full">
            <div className="w-full max-w-[340px] p-6 bg-[#0b1120]/80 border border-gray-800/80 rounded-2xl backdrop-blur-md shadow-2xl space-y-6 ml-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-600/10 border border-cyan-500/20 rounded-lg text-cyan-400">
                  <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Live Metrics</div>
                  <div className="text-[10px] font-mono text-gray-500">AI pipeline • production</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span>MODEL ACCURACY</span><span className="text-white font-bold">94%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full w-[94%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span>LATENCY REDUCTION</span><span className="text-white font-bold">78%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-400 h-full w-[78%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span>UPTIME SLA</span><span className="text-white font-bold">99%</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[99%]" /></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 text-[9px] font-mono uppercase tracking-wider text-gray-400">
                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md">● Production live</span>
                <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded-md">Lahore HQ</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-24 border-t border-gray-900 bg-[#02050B] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <Reveal className="space-y-4 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-[9px] font-mono uppercase tracking-widest text-gray-400">
                <span className="w-1 h-1 rounded-full bg-cyan-500" /> Who We Are
              </div>
              <h2 className="text-xl sm:text-4xl font-extrabold text-white leading-[1.2]">
                Where <span className="text-cyan-400">Intelligence</span><br />
                Meets Design Excellence
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                Code&Bugs is an AI-first engineering agency built for the intelligence era. We combine deep structural software expertise with sharp creative vision.
              </p>
              <ul className="space-y-2.5 pt-1 text-left inline-block lg:block max-w-sm lg:max-w-none mx-auto">
                {[
                  "Creative designs that tell your brand story",
                  "Smart AI-powered technology for business growth",
                  "Performance-driven system optimization strategies",
                  "End-to-end execution from concept to production launch"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                    <CircleCheck className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Radar UI Element */}
            <Reveal delay={200} className="relative w-full aspect-square max-w-[240px] sm:max-w-[420px] mx-auto flex items-center justify-center overflow-hidden">
              <div className="absolute w-full h-full rounded-full border border-gray-800/80 animate-spin" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              <div className="absolute w-[75%] h-[75%] rounded-full border border-gray-800/60 animate-spin" style={{ animationDuration: '40s', animationTimingFunction: 'linear', animationDirection: 'reverse' }} />

              <div className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#0b1120] border border-gray-700/80 rounded-2xl flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg mb-1"><Network className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400" /></div>
                <div className="text-[7px] sm:text-[9px] font-mono tracking-widest text-cyan-400 uppercase">AI Core</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-12 md:py-24 border-t border-gray-900 bg-[#030712] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="mb-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Services Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Engineering Excellence</span>
            </h2>
            <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
              Every service we offer is enhanced by cutting-edge technology. One investment that compounds over time.
            </p>
          </Reveal>

          <Reveal delay={100} className="border border-gray-800/60 rounded-3xl overflow-hidden bg-gray-800/10 shadow-2xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] w-full">
              {capabilities.map((tech, index) => (
                <div key={index} className="relative p-5 sm:p-8 bg-[#0b1120] transition-all duration-300 group flex flex-col justify-between min-h-[300px] sm:min-h-[400px] hover:bg-[#080c16] overflow-hidden w-full">
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="px-1.5 py-0.5 rounded-lg border border-gray-800 bg-[#030712]">
                      <span className="text-[9px] font-mono text-gray-500 group-hover:text-cyan-400">{tech.num}</span>
                    </div>
                    <div className="p-2 rounded-xl border border-gray-800 bg-[#030712] text-gray-500 group-hover:text-cyan-400 transition-all duration-300">
                      {tech.icon}
                    </div>
                  </div>

                  <div className="flex-1 relative z-10 w-full">
                    <h3 className="text-base sm:text-xl font-extrabold text-white break-words">{tech.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light mb-4 group-hover:text-gray-300 transition-colors duration-300 mt-1">{tech.description}</p>
                    <ul className="space-y-1.5">
                      {tech.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-200 font-light">
                          <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-cyan-400" />
                          <span className="break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex justify-between items-center relative z-10">
                    <span className="text-[8px] font-mono tracking-widest text-gray-600 group-hover:text-cyan-400 uppercase">Learn More</span>
                    <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center text-gray-600 bg-[#030712]">
                      <ArrowRight className="w-2.5 h-2.5 rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- FLEXIBLE 6-STEP PROCESS SECTION --- */}
      <section id="process" className="py-12 md:py-24 border-t border-gray-900 bg-[#02050B] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="mb-6 text-center lg:text-left">
            <h2 className="text-xl md:text-5xl font-extrabold text-white leading-tight mb-2">
              A Proven <span className="text-cyan-400">6-Step Process</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative w-full">
            <Reveal delay={100} className="lg:col-span-5 relative z-10 pb-2 w-full">
              <div className="absolute top-0 bottom-0 left-[23px] w-[2px] bg-gray-800 hidden sm:block" />
              {processSteps.map((step, index) => {
                const isActive = activeProcessStep === index;
                return (
                  <div key={index} id={`process-step-${index}`} data-step={index} onClick={() => scrollToStep(index)} className="process-step cursor-pointer relative pl-0 sm:pl-16 py-4 group border-b border-gray-900 sm:border-none w-full">
                    <div className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono bg-[#0b1120] border border-gray-800 text-gray-500">
                          {step.num}
                        </div>
                        <h3 className="text-sm sm:text-xl font-bold text-white tracking-wide break-words">{step.title}</h3>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- CTA VIDEO SECTION --- */}
      <section className="relative py-12 md:py-28 border-t border-gray-900 bg-[#02050B] overflow-hidden w-full">
        <Reveal className="relative z-10 max-w-4xl mx-auto px-3 text-center flex flex-col items-center w-full">
          <h2 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.2] mb-3">
            Ready to <span className="text-cyan-400">Transform</span> Your Business?
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto px-2 pt-4">
            <a href="https://wa.me/923286403604" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#25D366] rounded-xl">
              <MessageCircle className="w-3.5 h-3.5 shrink-0" /> WhatsApp Chat
            </a>
            <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs font-bold text-gray-300 border border-gray-700 rounded-xl">
              Send Message &rarr;
            </a>
          </div>
        </Reveal>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-12 md:py-24 border-t border-gray-900 bg-[#030712] w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full">
            
            {/* Input Form Box */}
            <Reveal delay={100} className="lg:col-span-7 bg-[#0b1120] border border-gray-800/80 rounded-3xl p-4 shadow-2xl w-full">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5 w-full">
                  <div className="grid grid-cols-1 gap-3.5">
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none placeholder:text-gray-600" placeholder="Your Name" />
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none placeholder:text-gray-600" placeholder="Email Address" />
                  </div>
                  <textarea required rows={4} value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none resize-none placeholder:text-gray-600" placeholder="Your project..." />
                  <button type="submit" className="w-full py-3 text-xs font-bold text-[#030712] bg-cyan-500 rounded-xl">Send Message</button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-base font-bold text-white">Message Sent!</h3>
                </div>
              )}
            </Reveal>

            {/* Quick Action Cards */}
            <Reveal delay={300} className="lg:col-span-5 space-y-3 w-full">
              <a href="https://wa.me/923286403604" className="flex items-center justify-between p-3.5 bg-[#0b1120] border border-gray-800/80 rounded-2xl w-full">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-7 h-7 rounded-full bg-[#030712] flex items-center justify-center border border-gray-800 shrink-0"><MessageCircle className="w-3.5 h-3.5 text-gray-400" /></div>
                  <div className="overflow-hidden"><div className="text-[8px] font-mono text-gray-500 uppercase">WhatsApp</div><div className="text-xs font-bold text-white truncate">+92 328 6403604</div></div>
                </div>
              </a>
              <a href="mailto:contact@codeandbugs.com" className="flex items-center justify-between p-3.5 bg-[#0b1120] border border-gray-800/80 rounded-2xl w-full">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-7 h-7 rounded-full bg-[#030712] flex items-center justify-center border border-gray-800 shrink-0"><Mail className="w-3.5 h-3.5 text-cyan-400" /></div>
                  <div className="overflow-hidden"><div className="text-[8px] font-mono text-gray-500 uppercase">Email</div><div className="text-xs font-bold text-white truncate">contact@codeandbugs.com</div></div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-[#02050B] pt-10 pb-6 px-3">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-[10px] font-light">© 2026 Code&Bugs. All rights reserved.</p>
        </div>
      </footer>
      <Chatbox />
      <CallAgent/>
    </div>
  );
}