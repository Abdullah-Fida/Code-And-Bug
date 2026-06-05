"use client";

import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

export default function CallAgent() {
  const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");
  // Vapi instance ko preserve karne ke liye useRef ka istemal
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Vapi ko Public Key ke sath initialize karna
    const vapi = new Vapi("004af26e-7094-4690-9836-0bd2bb317929");
    vapiRef.current = vapi;

    // Vapi Event Listeners (Army Style monitoring)
    vapi.on("call-start", () => {
      console.log("Call Connected!");
      setCallStatus("active");
    });

    vapi.on("call-end", () => {
      console.log("Call Ended.");
      setCallStatus("inactive");
    });

    vapi.on("error", (error: any) => {
      console.error("Vapi Error:", error);
      setCallStatus("inactive");
    });

    // Cleanup function jab component unmount ho
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const toggleCall = async () => {
    if (callStatus === "active") {
      vapiRef.current?.stop();
      setCallStatus("inactive");
    } else {
      setCallStatus("loading");
      try {
        // Aapka Assistant ID backend ko bhej kar call start karna
       await vapiRef.current?.start("cfe37ac3-fc7c-4b97-8f6f-ddb5094327b3");
      } catch (error) {
        console.error("Failed to start call:", error);
        setCallStatus("inactive");
      }
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      <button
        onClick={toggleCall}
        disabled={callStatus === "loading"}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 ${
          callStatus === "active"
            ? "bg-red-500 hover:bg-red-600 animate-pulse" // Call chal rahi hai toh Laal rang
            : callStatus === "loading"
            ? "bg-yellow-500 cursor-wait" // Load ho rahi hai toh Peela rang
            : "bg-gradient-to-br from-[#10B981] to-[#059669]" // Normal state mein Sabz rang
        }`}
      >
        {callStatus === "active" ? (
          // Stop Icon
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" fill="currentColor" />
          </svg>
        ) : callStatus === "loading" ? (
          // Loading Spinner
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          // Mic/Phone Icon
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
      </button>
    </div>
  );
}