"use client";

import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! Welcome to Code&Bugs. How can I help you today?", sender: "bot" }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    
    const newUserMsg: Message = { id: Date.now(), text: userText, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      const botReply: Message = { id: Date.now() + 1, text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botReply]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorReply: Message = { id: Date.now() + 1, text: "Oops! Server connection issue. Try again later.", sender: "bot" };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="relative flex flex-col items-end">
      
      {/* Chat Window with SMOOTH ANIMATION */}
      <div 
        className={`absolute bottom-[75px] right-0 w-80 sm:w-96 h-[450px] bg-[#0a0f1e]/90 backdrop-blur-xl border border-[#06B6D4]/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible" : "opacity-0 scale-50 translate-y-10 pointer-events-none invisible"
        }`}
      >
        
        {/* Header */}
        <div className="bg-[#030712] border-b border-[#06B6D4]/20 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse"></div>
            <h3 className="text-[#F3F4F6] font-semibold tracking-wide">Code&Bugs AI</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.sender === "user" 
                ? "bg-[#3B82F6] text-white rounded-br-none" 
                : "bg-[#1f2937]/50 text-gray-200 border border-[#06B6D4]/20 rounded-bl-none"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1f2937]/50 border border-[#06B6D4]/20 text-gray-400 p-3 rounded-xl rounded-bl-none text-sm flex gap-1 items-center">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-[#06B6D4]/20 bg-[#030712]/50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#06B6D4] transition-colors disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center hover:scale-105 transition-transform duration-300"
      >
        {isOpen ? (
          <span className="text-white text-xl font-bold">✕</span>
        ) : (
          <span className="text-white text-2xl">💬</span>
        )}
      </button>
    </div>
  );
}