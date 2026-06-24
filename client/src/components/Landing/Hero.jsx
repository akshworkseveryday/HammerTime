import React from "react";
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="relative bg-[#fdfaf2] text-[#2a2421] font-mono border-b-4 border-[#f2785d]/30 overflow-hidden">
      {/* Retro background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(242,120,93,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(242,120,93,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Live system status badge */}
          <div className="inline-flex items-center gap-2 border-2 border-[#2a2421] bg-[#fdfaf2] text-[#f2785d] text-xs font-bold px-4 py-1.5 uppercase mb-8 shadow-[2px_2px_0px_0px_#7da89f]">
            <span className="w-2.5 h-2.5 bg-[#f2785d] animate-pulse inline-block border border-black" />
            [SYSTEM STATUS: ONLINE OK]
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#2a2421] uppercase tracking-wider leading-[1.05] mb-6 font-mono crt-glow">
            BID WIN SELL<br/>
            <span className="text-[#f2785d] crt-glow font-mono">
              ON THE GRID
            </span>
          </h1>
          
          <p className="text-sm text-[#2a2421]/80 mb-10 max-w-xl mx-auto uppercase leading-relaxed">
            Connect your terminal. Discover rare hardware, vintage collectibles, and high-tier gear. Submit instant bids over live sockets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="retro-btn"
            >
              CONNECT NODE
            </Link>
            <Link
              to="/login"
              className="retro-btn-cyan"
            >
              AUTHENTICATE
            </Link>
          </div>

          {/* System metadata markers */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-[#2a2421]/60">
            <span className="flex items-center gap-1.5 border border-[#2a2421]/20 bg-[#fdfaf2] px-3 py-1 text-[#f2785d] font-bold">
              [+] FREE REGISTRATION
            </span>
            <span className="flex items-center gap-1.5 border border-[#2a2421]/20 bg-[#fdfaf2] px-3 py-1 text-[#f2785d] font-bold">
              [+] SOCKET BID STREAM
            </span>
            <span className="flex items-center gap-1.5 border border-[#2a2421]/20 bg-[#fdfaf2] px-3 py-1 text-[#f2785d] font-bold">
              [+] JWT SECURED NODE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
