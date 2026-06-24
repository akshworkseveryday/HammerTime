import { Link } from "react-router";

export const Footer = () => {
  return (
      <footer className="bg-[#fdfaf2] border-t-4 border-[#f2785d] py-8 text-[#2a2421] font-mono">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold tracking-wider crt-glow text-[#f2785d]">
                👾 HAMMERTIME
              </h3>
              <p className="text-[#2a2421]/70 text-xs">
                ARCADE AUCTION SYSTEM V2.0.2
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/about"
                className="text-[#2a2421]/80 hover:text-[#7da89f] uppercase transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-[#2a2421]/80 hover:text-[#7da89f] uppercase transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-[#2a2421]/20 mt-6 pt-6 text-center text-xs text-[#2a2421]/50">
            <p>
              © 2026 HAMMERTIME. ALL RIGHTS RESERVED. [SYSTEM READY]
            </p>
          </div>
        </div>
      </footer>
  );
};
