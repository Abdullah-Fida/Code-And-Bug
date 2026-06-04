"use client";

import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Mail, MapPin, ArrowUpRight, Lock, Zap, PhoneCall, FileText } from 'lucide-react';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', project: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.project) setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 border-t border-gray-200 dark:border-gray-900 bg-white dark:bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-3">Start a conversation</h2>
          <p className="text-gray-600 dark:text-gray-400 font-light text-base">Fill in the form and we'll reply within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-gray-50 dark:bg-[#0b1120] border border-gray-200 dark:border-gray-800/80 rounded-[2rem] p-6 sm:p-10 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-[#030712] border border-gray-300 dark:border-gray-800 rounded-xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" placeholder="Your Name" />
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white dark:bg-[#030712] border border-gray-300 dark:border-gray-800 rounded-xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" placeholder="Email Address" />
                </div>
                <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-white dark:bg-[#030712] border border-gray-300 dark:border-gray-800 rounded-xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" placeholder="Subject (optional)" />
                <textarea required rows={6} value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="w-full bg-white dark:bg-[#030712] border border-gray-300 dark:border-gray-800 rounded-xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Tell us about your project..." />
                <button type="submit" className="w-full py-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/20">Send Message →</button>
              </form>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-6"><ShieldCheck className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Sent</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">We've received your details.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <a href="https://wa.me/923286403604" className="flex items-center justify-between p-6 bg-gray-50 dark:bg-[#0b1120] border border-gray-200 dark:border-gray-800/80 rounded-2xl hover:border-gray-300 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#030712] flex items-center justify-center border border-gray-200 dark:border-gray-800"><MessageCircle className="w-4 h-4 text-gray-500" /></div>
                <div><div className="text-[10px] text-gray-500 uppercase">WhatsApp</div><div className="text-sm font-bold text-gray-900 dark:text-white">+923286403604</div></div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}