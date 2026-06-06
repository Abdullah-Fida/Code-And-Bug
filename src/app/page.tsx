"use client";
import Chatbox from "../components/Chatbox";
import CallAgent from "../components/CallAgent";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Globe, Smartphone, BarChart, Compass, Home as HomeIcon, 
  MessageSquareCode, TrendingUp, Search, ArrowRight, ShieldCheck, Video, 
  CircleCheck, Network, Lock, MessageCircle, Mail, MapPin, ArrowUpRight,
  Calendar 
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
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 typing-cursor">
      {text}
    </span>
  );
};


// --- MAIN HOME COMPONENT ---
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', project: '' });
  const [submitted, setSubmitted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/video1.mp4");
  
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
    { num: "01", icon: <Globe className="w-6 h-6" />, title: "Web Development", description: "Production-grade web apps with modern stacks.", features: ["React / Next.js", "Node.js / Express"] },
    { num: "02", icon: <Smartphone className="w-6 h-6" />, title: "App Development", description: "Cross-platform native mobile experiences.", features: ["React Native", "Flutter"] },
    { num: "03", icon: <Terminal className="w-6 h-6" />, title: "Software Development", description: "Engineering robust enterprise systems.", features: ["Enterprise Systems", "Custom Architectures"] },
    { num: "04", icon: <BarChart className="w-6 h-6" />, title: "Data Analyst", description: "Transforming metrics into live predictive workflows.", features: ["Data Visualization", "Predictive Modeling"] },
    { num: "05", icon: <Compass className="w-6 h-6" />, title: "Architectural Designs", description: "High-precision industrial-grade structural blueprints.", features: ["3D Modeling", "CAD Drafting"] },
    { num: "06", icon: <HomeIcon className="w-6 h-6" />, title: "Interior Designs", description: "Conceptualizing premium luxury visual layouts.", features: ["Material Selection", "3D Rendering"] },
    { num: "07", icon: <MessageSquareCode className="w-6 h-6" />, title: "AI Bots", description: "Deploying conversational AI call agents.", features: ["Voice AI", "LLM Chatbots"] },
    { num: "08", icon: <TrendingUp className="w-6 h-6" />, title: "Digital Marketing", description: "Data-driven campaigns to build brand trust.", features: ["Social Media", "PPC"] },
    { num: "09", icon: <Search className="w-6 h-6" />, title: "SEO", description: "Strategic search engine optimization for rankings.", features: ["Keyword Research", "On-Page"] }
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
          transform: translateY(40px);
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
      `}} />

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 opacity-50 pointer-events-none mix-blend-screen overflow-hidden">
        <video key={videoSrc} autoPlay muted playsInline onEnded={handleVideoEnded} className="w-full h-full object-cover object-center scale-100 brightness-[0.5]">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
      </div>

      {/* Floating Navbar */}
      <div className="w-full sticky top-5 z-50 px-4 sm:px-6">
        <header className="max-w-5xl mx-auto h-14 rounded-full border border-gray-800/80 bg-gray-950/60 backdrop-blur-xl flex items-center justify-between px-6 shadow-2xl shadow-black/40">
          <div className="flex items-center space-x-2.5 cursor-pointer">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center transform rotate-12">
              <Terminal className="w-3 h-3 text-white -rotate-12" />
            </div>
            <span className="font-bold tracking-tight text-white text-base">
              Code<span className="text-cyan-400">&</span>Bugs
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
            <a href="#home" className="hover:text-white px-4 py-2 rounded-full transition-colors">Home</a>
            <a href="#about" className="hover:text-white px-4 py-2 rounded-full transition-colors">About</a>
            <a href="#services" className="hover:text-white px-4 py-2 rounded-full transition-colors">Services</a>
            <a href="#process" className="hover:text-white px-4 py-2 rounded-full transition-colors">Process</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); setIsTeamVisible(true); setTimeout(() => { document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-white px-4 py-2 rounded-full transition-colors cursor-pointer">Team</a>
            <a href="#contact" className="hover:text-white px-4 py-2 rounded-full transition-colors">Contact</a>
          </nav>

          <a href="#contact" className="inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-cyan-600 rounded-full hover:bg-cyan-500 shadow-lg shadow-cyan-500/20 transition-all duration-300">
            Start Project
          </a>
        </header>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-20 md:pt-28 md:pb-24 max-w-7xl mx-auto px-6">
        <div className="absolute top-[-10%] left-1/4 w-[800px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none z-[1]" />

        <button onClick={handleNextVideo} className="absolute bottom-4 left-6 z-20 hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/40 border border-gray-800 hover:border-cyan-500/40 text-[10px] font-mono uppercase tracking-wider text-gray-400 hover:text-white rounded-full backdrop-blur-md transition-all duration-300">
          <Video className="w-3 h-3 text-cyan-400" /> Switch Ambience
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <Reveal className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for projects
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] min-h-[160px] sm:min-h-[135px]">
              We Build <br />
              <TypingEffect />
              <br />
              <span className="text-gray-700/60 font-black">That Scale.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-xl font-light leading-relaxed">
              From LLM fine-tuning to pixel-perfect interfaces — we engineer digital systems that automate workflows, delight users, and generate production value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#services" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/10">Explore Services</a>
              <a href="#contact" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 bg-transparent rounded-lg hover:text-white transition-colors border border-gray-800">Let's Talk</a>
            </div>
          </Reveal>

          <Reveal delay={200} className="hidden lg:block lg:col-span-5 relative">
            <div className="w-80 p-6 bg-[#0b1120]/80 border border-gray-800/80 rounded-2xl backdrop-blur-md shadow-2xl space-y-6 ml-auto">
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

      {/* About Section - Orbiting Radar */}
      <section id="about" className="py-24 border-t border-gray-900 bg-[#02050B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]">
                Where <span className="text-cyan-400">Intelligence</span><br />
                Meets Design Excellence
              </h2>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                Code&Bugs is an AI-first engineering agency built for the intelligence era. We combine deep structural software expertise with sharp creative vision.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Creative designs that tell your brand story",
                  "Smart AI-powered technology for business growth",
                  "Performance-driven system optimization strategies",
                  "End-to-end execution from concept to production launch"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-300 font-light">
                    <CircleCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200} className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center scale-[0.85] sm:scale-100 origin-center">
              <div className="absolute w-full h-full rounded-full border border-gray-800/80 animate-spin" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_#06B6D4] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-[14.6%] left-[85.3%] w-0 h-0">
                  <div className="animate-spin w-full h-full" style={{ animationDuration: '30s', animationTimingFunction: 'linear', animationDirection: 'reverse' }}>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#0b1120]/90 border border-gray-800 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg whitespace-nowrap text-center">
                      <div className="text-[8px] text-gray-500 font-mono uppercase tracking-wider mb-0.5">LLM Ready</div>
                      <div className="text-xs font-bold text-cyan-400">GPT-4o</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[85.3%] left-[14.6%] w-0 h-0">
                  <div className="animate-spin w-full h-full" style={{ animationDuration: '30s', animationTimingFunction: 'linear', animationDirection: 'reverse' }}>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#0b1120]/90 border border-gray-800 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg whitespace-nowrap text-center">
                      <div className="text-[8px] text-gray-500 font-mono uppercase tracking-wider mb-0.5">Accuracy</div>
                      <div className="text-xs font-bold text-white">97.3%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute w-[75%] h-[75%] rounded-full border border-gray-800/60 animate-spin" style={{ animationDuration: '40s', animationTimingFunction: 'linear', animationDirection: 'reverse' }}>
                <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3B82F6] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-[14.6%] left-[14.6%] w-0 h-0">
                  <div className="animate-spin w-full h-full" style={{ animationDuration: '40s', animationTimingFunction: 'linear', animationDirection: 'normal' }}>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#0b1120]/90 border border-gray-800 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg whitespace-nowrap text-center">
                      <div className="text-[8px] text-gray-500 font-mono uppercase tracking-wider mb-0.5">Response</div>
                      <div className="text-xs font-bold text-white">&lt; 1ms</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[85.3%] left-[85.3%] w-0 h-0">
                  <div className="animate-spin w-full h-full" style={{ animationDuration: '40s', animationTimingFunction: 'linear', animationDirection: 'normal' }}>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#0b1120]/90 border border-gray-800 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg whitespace-nowrap text-center">
                      <div className="text-[8px] text-gray-500 font-mono uppercase tracking-wider mb-0.5">Uptime</div>
                      <div className="text-xs font-bold text-cyan-400">99.9%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute w-[50%] h-[50%] rounded-full border border-gray-800/40 animate-spin" style={{ animationDuration: '20s', animationTimingFunction: 'linear' }}>
                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#06B6D4] -translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative z-10 w-36 h-36 bg-[#0b1120] border border-gray-700/80 rounded-2xl flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
                <div className="p-3 bg-cyan-500/10 rounded-xl mb-3"><Network className="w-6 h-6 text-cyan-400" /></div>
                <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">AI Core</div>
                <div className="text-xs text-gray-400 mt-1">Always Learning</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 border-t border-gray-900 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-20 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Services Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Engineering Excellence</span>
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
              Every service we offer is enhanced by cutting-edge technology — from design research to deployment monitoring. One investment that compounds over time.
            </p>
          </Reveal>

          <Reveal delay={100} className="border border-gray-800/80 rounded-[2rem] overflow-hidden bg-gray-800/40 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
              {capabilities.map((tech, index) => (
                <div key={index} className="relative p-8 lg:p-10 bg-[#0b1120] transition-all duration-300 group flex flex-col justify-between min-h-[420px] hover:bg-[#080c16] overflow-hidden">
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:24px_24px] transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="px-3 py-1.5 rounded-lg border border-gray-800 bg-[#030712] group-hover:border-cyan-500/30 transition-colors duration-300">
                      <span className="text-[11px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">{tech.num}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl border border-gray-800 bg-[#030712] text-gray-500 group-hover:border-cyan-500/40 group-hover:text-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300">
                      {tech.icon}
                    </div>
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="relative inline-block mb-6">
                      <h3 className="text-2xl font-extrabold text-white">{tech.title}</h3>
                      <div className="absolute -bottom-3 left-0 w-3/4 h-[1px] bg-gradient-to-r from-cyan-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 mt-2 group-hover:text-gray-300 transition-colors duration-300">{tech.description}</p>
                    <ul className="space-y-3.5">
                      {tech.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-[13px] text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 flex justify-between items-center relative z-10">
                    <span className="text-[10px] font-mono tracking-widest text-gray-600 group-hover:text-cyan-400 uppercase transition-colors duration-300">Learn More</span>
                    <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-600 group-hover:border-cyan-500 group-hover:text-cyan-400 bg-[#030712] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- STICKY 6-STEP PROCESS SECTION --- */}
      <section id="process" className="py-24 border-t border-gray-900 bg-[#02050B]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              A Proven <span className="text-cyan-400">6-Step Process</span>
            </h2>
            <p className="text-gray-400 font-light text-base max-w-xl">
              Scroll down to explore how we transition from first conversation to live product.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
            
            <Reveal delay={100} className="lg:col-span-5 relative z-10 pb-32">
              <div className="absolute top-0 bottom-0 left-[23px] w-[2px] bg-gray-800" />
              {processSteps.map((step, index) => {
                const isActive = activeProcessStep === index;
                return (
                  <div key={index} id={`process-step-${index}`} data-step={index} onClick={() => scrollToStep(index)} className="process-step cursor-pointer relative pl-16 py-16 group">
                    <div className={`absolute left-[13px] top-[74px] w-[22px] h-[22px] rounded-full border-4 border-[#02050B] transition-colors duration-500 z-10 ${isActive ? 'bg-cyan-400 shadow-[0_0_15px_#06B6D4]' : 'bg-gray-700 group-hover:bg-gray-500'}`} />
                    
                    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4 group-hover:opacity-70 group-hover:translate-x-0'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono transition-colors duration-500 ${isActive ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#0b1120] border border-gray-800 text-gray-500'}`}>
                          {step.num}
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed font-light mb-4">{step.description}</p>
                      
                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 rounded-xl border border-gray-800/80 bg-[#0b1120]/50 shadow-inner mt-4">
                          <div className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                            <p className="text-[13px] text-gray-300 leading-relaxed font-light">{step.bullet}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>

            <div className="lg:col-span-7 lg:sticky lg:top-24 w-full mt-10 lg:mt-0">
              <Reveal delay={200} className="h-[400px] sm:h-[500px] lg:h-[600px] w-full border border-gray-800/80 bg-[#050811] shadow-2xl overflow-hidden rounded-3xl flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                <div className="relative flex items-center justify-center w-[400px] h-[400px] scale-[0.65] sm:scale-90 md:scale-100 origin-center">
                  <div className="absolute w-[380px] h-[380px] rounded-full border border-gray-800/40 animate-spin" style={{ animationDuration: '40s', animationTimingFunction: 'linear' }} />
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-gray-700/50 animate-spin" style={{ animationDuration: '25s', animationTimingFunction: 'linear', animationDirection: 'reverse' }} />
                  <div className="absolute w-[180px] h-[180px] rounded-full border border-gray-600/50 animate-spin" style={{ animationDuration: '15s', animationTimingFunction: 'linear' }} />

                  {processSteps.map((step, index) => {
                    const badgePositions = [
                      { top: '0%', left: '50%' },      
                      { top: '25%', left: '93.3%' },   
                      { top: '75%', left: '93.3%' },   
                      { top: '100%', left: '50%' },    
                      { top: '75%', left: '6.7%' },    
                      { top: '25%', left: '6.7%' },    
                    ];
                    const pos = badgePositions[index];
                    const isActive = activeProcessStep === index;

                    return (
                      <div key={index} className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 z-30 ${isActive ? 'scale-110' : 'scale-90 opacity-40 hover:opacity-80'}`} style={{ top: pos.top, left: pos.left }}>
                        <div className={`px-4 py-2 rounded-xl border backdrop-blur-md whitespace-nowrap flex items-center gap-2 transition-colors duration-500 ${isActive ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-[#0b1120]/90 border-gray-800'}`}>
                          <span className={`text-[10px] font-mono ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>{step.num}</span>
                          <span className={`text-xs font-bold tracking-wide ${isActive ? 'text-white' : 'text-gray-500'}`}>{step.short}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#0b1120] to-[#02050b] shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center transition-all duration-500 border border-gray-800">
                    <div className="absolute inset-1 rounded-full bg-[#030712] opacity-80" />
                    <div className="relative z-20 text-center animate-in zoom-in-90 duration-500" key={activeProcessStep}>
                      <span className="block text-4xl font-black text-cyan-400 tracking-tighter drop-shadow-md">
                        {processSteps[activeProcessStep].num}
                      </span>
                      <span className="block text-[8px] font-mono text-gray-500 mt-1 uppercase tracking-widest">Phase</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW CTA SECTION --- */}
      <section className="relative py-32 border-t border-gray-900 bg-[#02050B] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none mix-blend-screen">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover object-center">
            <source src="/video3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#030712]/60" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />
        </div>

        <Reveal className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-[#0b1120]/80 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">AI Systems Ready • Let's Build</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Ready to <span className="text-cyan-400">Transform</span><br />
            Your Business with AI?
          </h2>

          <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl leading-relaxed mb-10">
            One conversation. We'll map where AI creates the most leverage in your business and hand you a concrete plan — no fluff, no jargon, no sales pitch.
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4">
            <a href="https://wa.me/923286403604" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-gray-300 bg-transparent border border-gray-700 hover:border-gray-500 hover:text-white rounded-xl transition-all">
              Send a Message &rarr;
            </a>
          </div>
        </Reveal>
      </section>

      {/* TEAM SECTION */}
      {isTeamVisible && (
        <section id="team" className="py-24 border-t border-gray-900 bg-[#030712]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The Minds Behind Code&Bugs</h2>
              <p className="text-gray-400 font-light text-sm sm:text-base">A multi-disciplinary collective of developers, system engineers, and space planners.</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-center">
              {team.map((member, index) => (
                <Reveal key={index} delay={index * 100} className="bg-[#0b1120]/40 border border-gray-900 rounded-2xl overflow-hidden group hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300 ease-out flex flex-col justify-between h-full p-8 text-center shadow-lg">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#121b2e] to-[#080d1a] border border-gray-800 flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300 shadow-inner mb-8">
                    <span className="text-2xl font-bold tracking-wider text-gray-400 group-hover:text-cyan-400 transition-colors font-mono">{member.initials}</span>
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                    <p className="text-[12px] text-gray-500 font-mono tracking-wider uppercase pb-4">{member.role}</p>
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-900 w-full text-xs text-gray-600 font-mono">
                      <span className="hover:text-cyan-400 cursor-pointer transition-colors text-[10px] tracking-wider uppercase">LinkedIn</span>
                      <span>|</span>
                      <span className="hover:text-cyan-400 cursor-pointer transition-colors text-[10px] tracking-wider uppercase">GitHub</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT SECTION WITH CALENDLY WIDGET */}
      <section id="contact" className="py-24 border-t border-gray-900 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-3">Start a conversation</h2>
            <p className="text-gray-400 font-light text-base">Fill in the form and we'll reply within 24 hours with a detailed response.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <Reveal delay={100} className="lg:col-span-7 bg-[#0b1120] border border-gray-800/80 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600" placeholder="Your Name" />
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600" placeholder="Email Address" />
                  </div>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600" placeholder="Subject (optional)" />
                  <textarea required rows={6} value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-[#030712] border border-gray-800 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none placeholder:text-gray-600" placeholder="Tell us about your project..." />
                  <button type="submit" className="w-full py-4 text-sm font-bold text-[#030712] bg-cyan-500 hover:bg-cyan-400 rounded-xl transition-colors shadow-lg shadow-cyan-500/20">Send Message →</button>
                  <p className="text-center text-xs text-gray-500 font-light mt-4">Or chat directly on <a href="https://wa.me/923286403604" className="text-cyan-400 hover:underline">WhatsApp</a></p>
                </form>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto text-cyan-400 mb-6"><ShieldCheck className="w-8 h-8" /></div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                  <p className="text-gray-400 text-base font-light max-w-md mx-auto">We've received your details. Our team will get back to you shortly.</p>
                </div>
              )}
            </Reveal>

            <Reveal delay={300} className="lg:col-span-5 space-y-4">
              
              <div className="p-6 bg-gradient-to-br from-[#0b1120] to-[#080d1a] border border-cyan-500/30 rounded-2xl mb-4 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />
                 <div className="flex items-center gap-4 mb-4 relative z-10">
                   <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                     <Calendar className="w-4 h-4 text-cyan-400" />
                   </div>
                   <div>
                     <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">Direct Booking</div>
                     <div className="text-sm font-bold text-white">Schedule a Call</div>
                   </div>
                 </div>
                 <p className="text-xs text-gray-400 font-light mb-4 relative z-10">Pick a 30-min slot on our calendar to discuss your project requirements in detail.</p>
                 <a href="https://calendly.com/dev-moazamsultan/30min" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center py-3 text-xs font-bold text-[#030712] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)] relative z-10">
                   Book a Time <ArrowUpRight className="w-3 h-3 ml-1" />
                 </a>
              </div>

              <a href="https://wa.me/923286403604" className="flex items-center justify-between p-6 bg-[#0b1120] border border-gray-800/80 rounded-2xl hover:border-gray-700 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#030712] flex items-center justify-center border border-gray-800"><MessageCircle className="w-4 h-4 text-gray-300" /></div>
                  <div><div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">WhatsApp</div><div className="text-sm font-bold text-white">+92 328 6403604</div></div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>

              <a href="mailto:contact@codeandbugs.com" className="flex items-center justify-between p-6 bg-[#0b1120] border border-gray-800/80 rounded-2xl hover:border-gray-700 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#030712] flex items-center justify-center border border-gray-800"><Mail className="w-4 h-4 text-cyan-400" /></div>
                  <div><div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Email</div><div className="text-sm font-bold text-white">contact@codeandbugs.com</div></div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>

            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-[#02050B] pt-20 pb-8 px-6">
        <Reveal className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="space-y-6 lg:pr-8">
              <div className="flex items-center space-x-2.5 cursor-pointer">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center transform rotate-12"><Terminal className="w-3.5 h-3.5 text-white -rotate-12" /></div>
                <span className="text-2xl font-bold tracking-tight text-white">Code<span className="text-cyan-400">&</span>Bugs</span>
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed">Full-service AI & software agency. From concept to production — we build digital products that win markets.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Services</h4>
              <ul className="space-y-4">
                {['AI Development', 'Web Applications', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing'].map((link, idx) => (
                  <li key={idx}><a href="#" className="text-gray-400 hover:text-cyan-400 text-sm font-light transition-colors flex items-center gap-2"><span className="text-gray-700">-</span> {link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Our Work', 'Blog', 'Careers', 'Contact'].map((link, idx) => (
                  <li key={idx}><a href="#" className="text-gray-400 hover:text-cyan-400 text-sm font-light transition-colors flex items-center gap-2"><span className="text-gray-700">-</span> {link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Contact</h4>
              <ul className="space-y-4">
                <li><a href="https://wa.me/923286403604" className="text-gray-400 hover:text-cyan-400 text-sm font-light transition-colors flex items-center gap-2"><span className="text-gray-700">-</span> WhatsApp: +92 328 6403604</a></li>
                <li><a href="mailto:contact@codeandbugs.com" className="text-gray-400 hover:text-cyan-400 text-sm font-light transition-colors flex items-center gap-2"><span className="text-gray-700">-</span> contact@codeandbugs.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-light"> © 2026 Code&Bugs. All rights reserved.</p>
          </div>
        </Reveal>
      </footer>
         <Chatbox />
         <CallAgent/>
    </div>
  );
}