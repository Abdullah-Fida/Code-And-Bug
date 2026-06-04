"use client";

import React, { useState, useEffect } from 'react';
import { 
  Terminal, Code2, Bot, Cpu, ArrowRight, ShieldCheck, Sparkles, BarChart3, 
  Smartphone, Compass, Home as HomeIcon, Globe, Video, CheckCircle2, Network, 
  MessageSquareCode, TrendingUp, Search, Lock, Zap, PhoneCall, FileText, 
  MessageCircle, Mail, MapPin, ArrowUpRight 
} from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', project: '' });
  const [submitted, setSubmitted] = useState(false);
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});
  const [videoSrc, setVideoSrc] = useState("/video1.mp4");
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isTeamVisible, setIsTeamVisible] = useState(false);

  // --- UPDATED TYPING CATEGORIES ---
  const servicesToType = [
    "Web Development",
    "App Development",
    "AI Call Agent",
    "AI Chat Bot",
    "Software Development",
    "Architectural Designs",
    "Interior Designs"
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = servicesToType[currentServiceIndex];

    if (!isDeleting) {
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentServiceIndex((prev) => (prev + 1) % servicesToType.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentServiceIndex]);

  useEffect(() => {
    const videos = ["/video1.mp4", "/video2.mp4"];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setVideoSrc(randomVideo);
  }, []);

  const handleVideoEnded = () => {
    setVideoSrc((prev) => (prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4"));
  };

  const handleNextVideo = () => {
    setVideoSrc((prev) => (prev === "/video1.mp4" ? "/video2.mp4" : "/video1.mp4"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.project) {
      setSubmitted(true);
    }
  };

  const capabilities = [
    { num: "01", icon: <Globe className="w-6 h-6" />, title: "Web Development", description: "Production-grade web apps with modern stacks — fast, scalable, and pixel-perfect.", features: ["React / Next.js", "Node.js / Express", "Custom APIs", "E-Commerce Portals"] },
    { num: "02", icon: <Smartphone className="w-6 h-6" />, title: "App Development", description: "Cross-platform and native mobile experiences built for high performance and user delight.", features: ["React Native", "Flutter", "iOS & Android", "UI/UX Integrated"] },
    { num: "03", icon: <Terminal className="w-6 h-6" />, title: "Software Development", description: "Engineering robust enterprise systems, desktop applications, and scalable backend infrastructures.", features: ["Enterprise Systems", "Custom Architectures", "Cloud Integration", "Legacy Migration"] },
    { num: "04", icon: <BarChart3 className="w-6 h-6" />, title: "Data Analyst", description: "Transforming raw production system metrics into live predictive workflows and trend dashboards.", features: ["Data Visualization", "Predictive Modeling", "Business Intelligence", "Custom Dashboards"] },
    { num: "05", icon: <Compass className="w-6 h-6" />, title: "Architectural Designs", description: "Drafting high-precision industrial-grade structural blueprints and digital 3D schematics.", features: ["3D Modeling", "Structural Blueprints", "CAD Drafting", "Space Planning"] },
    { num: "06", icon: <HomeIcon className="w-6 h-6" />, title: "Interior Designs", description: "Conceptualizing premium luxury visual layouts and ambient spatial mapping for modern spaces.", features: ["Material Selection", "Lighting Design", "Furniture Layout", "3D Rendering"] },
    { num: "07", icon: <MessageSquareCode className="w-6 h-6" />, title: "AI Chat & Call Bots", description: "Deploying next-gen conversational AI agents and autonomous voice calling systems for 24/7 support.", features: ["Voice AI Call Agents", "Custom LLM Chatbots", "Automated Lead Gen", "CRM Integrations"] },
    { num: "08", icon: <TrendingUp className="w-6 h-6" />, title: "Digital Marketing", description: "Data-driven campaigns that grow your audience, build brand trust, and multiply revenue.", features: ["Social Media Mgt", "PPC Campaigns", "Content Strategy", "Email Automation"] },
    { num: "09", icon: <Search className="w-6 h-6" />, title: "SEO", description: "Strategic search engine optimization to boost organic rankings and dominate search results.", features: ["Keyword Research", "On-Page SEO", "Technical Audits", "Link Building"] }
  ];

  const processSteps = [
    { num: "01", title: "Discovery & Strategy", description: "Deep-dive into your vision, market, and goals. We map a clear roadmap before a single line of code is written.", bullet: "We map your competitive landscape, define success metrics, and align on a clear roadmap before a single line of code is written." },
    { num: "02", title: "Design & Prototyping", description: "Crafting wireframes, UI/UX designs, and interactive prototypes to visualize the end product.", bullet: "High-fidelity mockups and user flow mapping to ensure an intuitive, friction-less user experience." },
    { num: "03", title: "Development & Build", description: "Writing clean, scalable code. Our engineers bring the designs to life using modern tech stacks.", bullet: "Agile sprints, continuous integration, and transparent weekly progress tracking." },
    { num: "04", title: "Testing & QA", description: "Rigorous quality assurance to squash bugs and ensure seamless performance across all devices.", bullet: "Automated and manual testing protocols for security, speed, and cross-platform reliability." },
    { num: "05", title: "Deployment & Launch", description: "Smooth migration to production servers. We handle the heavy lifting of going live seamlessly.", bullet: "Zero-downtime deployment, server configuration, and final live-environment health checks." },
    { num: "06", title: "Growth & Support", description: "Post-launch maintenance, analytics tracking, and continuous feature scaling for your business.", bullet: "Ongoing technical support, performance monitoring, and SLA-backed maintenance." }
  ];

  const team = [
    { name: "Moazzam Sultan", role: "Lead Software Engineer", initials: "MS" },
    { name: "Muhammad Zaid", role: "AI Core & Data Architect", initials: "MZ" },
    { name: "Zaman Khan", role: "Full-Stack Developer", initials: "ZK" },
    { name: "Muzzamil Sultan", role: "Systems Consultant", initials: "MS" },
    { name: "Abdullah Faida", role: "Spatial Design Architect", initials: "AF" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 font-sans grid-bg relative selection:bg-cyan-500 selection:text-white">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 opacity-50 pointer-events-none mix-blend-screen overflow-hidden">
        <video key={videoSrc} autoPlay muted playsInline onEnded={handleVideoEnded} className="w-full h-full object-cover object-center scale-100 brightness-[0.5]"><source src={videoSrc} type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
      </div>

      {/* Navbar */}
      <div className="w-full sticky top-5 z-50 px-4 sm:px-6">
        <header className="max-w-5xl mx-auto h-14 rounded-full border border-gray-800/80 bg-gray-950/60 backdrop-blur-xl flex items-center justify-between px-6 shadow-2xl shadow-black/40">
          <div className="flex items-center space-x-2.5 cursor-pointer">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center transform rotate-12"><Terminal className="w-3 h-3 text-white -rotate-12" /></div>
            <span className="font-bold tracking-tight text-white text-base">Code<span className="text-cyan-400">&</span>Bugs</span>
          </div>
          <nav className="hidden md:flex space-x-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
            <a href="#home" className="hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-full transition-all duration-300">Home</a>
            <a href="#about" className="hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-full transition-all duration-300">About</a>
            <a href="#services" className="hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-full transition-all duration-300">Services</a>
            <a href="#process" className="hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-full transition-all duration-300">Process</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); setIsTeamVisible(true); setTimeout(() => { document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="hover:text-white hover:bg-gray-800/60 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer">Team</a>
          </nav>
          <a href="#cta" className="inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300">Start Project</a>
        </header>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-20 md:pt-28 md:pb-24 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]" style={{ minHeight: '135px' }}>
          We Build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 typewriter-cursor">{currentText}</span><br />
          <span className="text-gray-700/60 font-black">That Scale.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-xl font-light leading-relaxed mt-7">From LLM fine-tuning to pixel-perfect interfaces — we engineer digital systems that automate workflows, delight users, and generate production value. Lahore-based. Global delivery.</p>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#services" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/10">Explore Services</a>
            <a href="#cta" className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 bg-transparent rounded-lg hover:text-white transition-colors border border-gray-800">Let's Talk</a>
        </div>
      </section>

      {/* (Include remaining sections: About, Services, Process, Team, Contact, Footer here from the previous full master code) */}
      {/* I have provided the essential parts above. You can keep the remaining sections as they are in your code editor. */}
    </div>
  );
}