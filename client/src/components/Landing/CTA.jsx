import React from "react";
import { Link } from "react-router";

export const CTA = () => {
  return (
    <section className="relative bg-[#fdfaf2] py-20 sm:py-24 border-b-4 border-[#f2785d]/20 font-mono">
      <div className="max-w-3xl mx-auto px-4 text-center border-4 border-[#2a2421] p-8 bg-[#fdfaf2] shadow-[6px_6px_0px_0px_#f2785d]">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2a2421] uppercase tracking-wider mb-4 crt-glow">
          &gt;&gt; INITIATE ACCESS LOBBY
        </h2>
        <p className="text-sm text-[#2a2421]/80 mb-8 max-w-xl mx-auto uppercase">
          Register your credentials to start bidding. Discover rare hardware, digital components, and vintage items. Setup takes less than 30 seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="retro-btn"
          >
            CREATE PROFILE
          </Link>
          <Link
            to="/signup"
            className="retro-btn-cyan"
          >
            DISCOVER ITEMS
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CTA;
