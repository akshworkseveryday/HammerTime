import { use, useState } from "react";
import { Link } from "react-router";
import {
  CiCalendar,
  CiGlobe,
  CiMapPin,
  CiServer,
  CiMonitor,
} from "react-icons/ci";
import LoadingScreen from "../components/LoadingScreen";
import { useLoginHistory } from "../hooks/useUser";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Privacy() {
  useDocumentTitle("Security & Login History");
  const { data, isLoading } = useLoginHistory();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex bg-[#fdfaf2] text-[#2a2421] font-mono">
      {/* Page content */}
      <main className="p-4 sm:p-6 lg:p-8 mx-auto max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2a2421] crt-glow uppercase">
            Privacy & Security
          </h1>
          <p className="text-xs text-[#2a2421]/60 uppercase mt-1">
            View your login history and security settings
          </p>
        </div>

        {data && (
          <div className="flex flex-col gap-4 mb-8">
            {data.map((entry) => (
              <div
                key={entry.id}
                className="retro-card p-4"
              >
                <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                  <div className="flex items-center">
                    <CiCalendar className="size-4 text-[#2a2421]/50 mr-2" />
                    <span className="text-sm font-medium text-[#2a2421]">
                      Date & Time:
                    </span>
                    <span className="ml-2 text-sm text-[#2a2421]/80">
                      {entry.dateTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CiGlobe className="size-4 text-[#2a2421]/50 mr-2" />
                    <span className="text-sm font-medium text-[#2a2421]">
                      IP Address:
                    </span>
                    <span className="ml-2 text-sm text-[#2a2421]/80">
                      {entry.ipAddress}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CiMapPin className="size-4 text-[#2a2421]/50 mr-2" />
                    <span className="text-sm font-medium text-[#2a2421]">
                      Location:
                    </span>
                    <span className="ml-2 text-sm text-[#2a2421]/80">
                      {entry.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CiServer className="size-4 text-[#2a2421]/50 mr-2" />
                    <span className="text-sm font-medium text-[#2a2421]">
                      ISP:
                    </span>
                    <span className="ml-2 text-sm text-[#2a2421]/80">
                      {entry.isp}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CiMonitor className="size-4 text-[#2a2421]/50 mr-2" />
                    <span className="text-sm font-medium text-[#2a2421]">
                      Device:
                    </span>
                    <span className="ml-2 text-sm text-[#2a2421]/80">
                      {entry.device}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security settings */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#2a2421] mb-4 uppercase crt-glow">
            Security Settings
          </h2>
          <div className="retro-card overflow-hidden divide-y-2 divide-[#2a2421]">
            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#2a2421] uppercase">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-[#2a2421]/70 mt-1 uppercase">
                    Add an extra layer of security to your account by requiring
                    a verification code in addition to your password.
                  </p>
                </div>
                <div className="sm:ml-4">
                  <button
                    disabled
                    className="retro-btn opacity-50 cursor-not-allowed text-xs py-1.5 px-3"
                  >
                    Enable
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#2a2421] uppercase">
                    Password
                  </h3>
                  <p className="text-xs text-[#2a2421]/70 mt-1 uppercase">
                    Change your password
                  </p>
                </div>
                <div className="sm:ml-4">
                  <Link
                    to="/profile"
                    className="retro-btn-cyan text-xs py-1.5 px-3"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
