import { Link } from "react-router";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const About = () => {
  useDocumentTitle("About");
  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="retro-card p-8">
          <h1 className="text-4xl font-bold text-[#2a2421] mb-8 crt-glow uppercase">
            ABOUT HAMMERTIME
          </h1>

          <div className="space-y-6 text-xs uppercase leading-relaxed">
            <p className="text-sm text-[#2a2421]">
              Welcome to HammerTime — a comprehensive web application designed
              to facilitate online bidding and real-time auctions.
            </p>

            <section className="border-t-2 border-[#2a2421] pt-6 mt-6">
              <h2 className="text-xl font-bold text-[#f2785d] mb-2">
                &gt; PROJECT PURPOSE
              </h2>
              <p className="text-[#2a2421]/85">
                HammerTime is a full-featured auction platform built with modern
                web technologies. It demonstrates real-time bidding, secure
                authentication, image uploads, and production-ready deployment
                patterns.
              </p>
            </section>

            <section className="border-t-2 border-[#2a2421] pt-6 mt-6">
              <h2 className="text-xl font-bold text-[#f2785d] mb-2">
                &gt; CAPABILITIES MATRIX
              </h2>
              <ul className="space-y-2 text-[#2a2421]/80">
                <li>[+] USER REGISTRATION & SECURITY AUTHENTICATION</li>
                <li>[+] WEBSOCKET DRIVEN REALTIME BIDDING</li>
                <li>[+] ASSET LISTING & IMAGE UPLOAD SEQUENCING</li>
                <li>[+] VENDOR AND BUYER PROFILE MANAGEMENT</li>
                <li>[+] ADMIN SYSTEM PLATFORM MANAGEMENT</li>
                <li>[+] MOBILE RESPONSIVE DISPLAY ADAPTATION</li>
              </ul>
            </section>

            <section className="border-t-2 border-[#2a2421] pt-6 mt-6">
              <h2 className="text-xl font-bold text-[#f2785d] mb-2">
                &gt; REPOSITORY LOCATION
              </h2>
              <p className="text-[#2a2421]/85">
                Source code and setup instructions are available on GitHub:
              </p>

              <div className="mt-4 p-4 bg-[#fdfaf2] border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_#2a2421]">
                <p>
                  <span className="font-bold text-[#f2785d]">REPO LINK:</span>{" "}
                  <a
                    href="https://github.com/akshkhator/HammerTime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2a2421] hover:text-[#7da89f] underline font-bold"
                  >
                    github.com/akshkhator/HammerTime
                  </a>
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t-2 border-[#2a2421] text-center">
              <p>
                Have questions or need support? Feel free to{" "}
                <Link
                  to="/contact"
                  className="text-[#7da89f] hover:underline font-bold"
                >
                  CONTACT US
                </Link>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
