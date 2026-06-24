import React from "react";
import { FaClock, FaGavel, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaGavel className="text-xl text-[#f2785d]" />,
    title: "REAL TIME BIDDING",
    desc: "Submit atomic bids instantly over WebSockets. Automated race-condition handlers guarantee reliable bidding sequences.",
  },
  {
    icon: <FaShieldAlt className="text-xl text-[#7da89f]" />,
    title: "SECURE LOBBY",
    desc: "JWT-validated access controls and HttpOnly cookies shield vendor and buyer communications from intercept vectors.",
  },
  {
    icon: <FaClock className="text-xl text-[#ffb09c]" />,
    title: "CRON EXPIRY",
    desc: "24/7 autonomous timer protocols detect expired items, declare winners, and log auction terminations automatically.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#fdfaf2] text-[#2a2421] font-mono border-b-4 border-[#f2785d]/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#7da89f] font-bold text-xs uppercase tracking-widest mb-1">
            // SPECIFICATION MATRIX
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#2a2421] crt-glow">
            Core Features
          </h2>
          <p className="text-[#2a2421]/70 max-w-lg mx-auto text-xs mt-2 uppercase">
            A premium full-stack real-time bidding architecture optimized for secure transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-[#fdfaf2] border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_currentColor] p-7 transition-all duration-150"
              style={{
                color: i === 0 ? "#f2785d" : i === 1 ? "#7da89f" : "#2a2421"
              }}
            >
              <div className="w-10 h-10 border-2 border-[#2a2421] flex items-center justify-center mb-5 bg-white">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold uppercase text-[#2a2421] mb-2 tracking-wide crt-glow">
                {f.title}
              </h3>
              <p className="text-xs text-[#2a2421]/80 leading-relaxed uppercase">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
