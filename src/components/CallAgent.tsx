"use client";

import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

interface CallAgentProps {
  onCallStart?: () => void;
  onCallEnd?: (data?: any) => void;
}

export default function CallAgent({ onCallStart, onCallEnd }: CallAgentProps) {
  const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Vapi Initialization
    const vapi = new Vapi("004af26e-7094-4690-9836-0bd2bb317929");
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      console.log("Call Connected!");
      setCallStatus("active");
      if (onCallStart) onCallStart();
    });

    // NAYA HISSA: Agent ki baaton aur tools ko monitor karna
    vapi.on("message", (message: any) => {
      if (message.type === "function-call" || message.type === "tool-calls") {
        const functionName = message.functionCall?.name || message.toolCallList?.[0]?.function?.name;
        const functionArgs = message.functionCall?.parameters || message.toolCallList?.[0]?.function?.arguments;

        if (functionName === "book_appointment") {
          // Agent ne jo details li hain wo nikal lein
          const args = typeof functionArgs === "string" ? JSON.parse(functionArgs) : functionArgs;
          
          // 4 second ka delay taake agent apni aakhri line poori bol sakay
          setTimeout(() => {
            try {
              vapiRef.current?.stop(); // Try-catch lagaya taake red screen na aaye
            } catch (err) {
              console.log("Call disconnected safely.");
            } finally {
              setCallStatus("inactive");
              if (onCallEnd) onCallEnd(args); // Data seedha pop-up ko bhej diya
            }
          }, 4000); 
        }
      }
    });

    vapi.on("call-end", () => {
      console.log("Call Ended.");
      setCallStatus("inactive");
    });

    vapi.on("error", (error: any) => {
      console.log("Vapi Call Note:", error);
      setCallStatus("inactive");
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, [onCallStart, onCallEnd]);

  const toggleCall = async () => {
    if (callStatus === "active") {
      vapiRef.current?.stop();
      setCallStatus("inactive");
      if (onCallEnd) onCallEnd(); 
    } else {
      setCallStatus("loading");
      try {
        await vapiRef.current?.start("cfe37ac3-fc7c-4b97-8f6f-ddb5094327b3");
      } catch (error) {
        console.error("Failed to start call:", error);
        setCallStatus("inactive");
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCall}
        disabled={callStatus === "loading"}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 ${
          callStatus === "active"
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : callStatus === "loading"
            ? "bg-yellow-500 cursor-wait"
            : "bg-gradient-to-br from-[#10B981] to-[#059669]"
        }`}
      >
        {callStatus === "active" ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" fill="currentColor" />
          </svg>
        ) : callStatus === "loading" ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
      </button>
    </div>
  );
}