import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useDashboardStats } from "../hooks/useAuction.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

const statConfig = [
  {
    key: "totalAuctions",
    label: "Total Listings",
    color: "#f2785d", // Coral
    icon: "📁",
  },
  {
    key: "activeAuctions",
    label: "Active Now",
    color: "#7da89f", // Teal
    icon: "📡",
  },
  {
    key: "userAuctionCount",
    label: "Your Terminal",
    color: "#e5b25d", // Gold
    icon: "👾",
  },
];

const Dashboard = () => {
  useDocumentTitle("Dashboard");
  const { data, isLoading } = useDashboardStats();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
              DASHBOARD
            </h1>
            <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
              System monitoring and network listing stream
            </p>
          </div>
          <Link
            to="/create"
            className="retro-btn"
          >
            + NEW LISTING
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {statConfig.map((stat) => (
            <div
              key={stat.key}
              className="bg-[#fdfaf2] border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_currentColor] p-5 flex items-center gap-4 transition-all duration-150"
              style={{
                color: stat.color
              }}
            >
              <div className="w-10 h-10 border-2 border-current flex items-center justify-center text-lg bg-white">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2a2421]/80">
                  {stat.label}
                </p>
                <p className="text-2xl font-black mt-0.5 tabular-nums crt-glow text-[#2a2421]">
                  {data[stat.key]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* All Auctions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5 border-b-2 border-[#2a2421]/20 pb-2">
            <h2 className="text-lg font-bold uppercase text-[#2a2421] tracking-wider">
              // LATEST AUCTION SEQUENCE
            </h2>
            <Link
              to="/auction"
              className="text-xs font-bold text-[#7da89f] uppercase hover:underline"
            >
              Browse all &rarr;
            </Link>
          </div>

          {data.latestAuctions.length === 0 ? (
            <div className="text-center py-16 bg-[#fdfaf2] border-2 border-dashed border-[#2a2421]/20">
              <p className="text-[#2a2421]/50 text-xs uppercase">NO ACTIVE SEQUENCES DETECTED</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.latestAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </section>

        {/* Your Auctions */}
        <section>
          <div className="flex items-center justify-between mb-5 border-b-2 border-[#2a2421]/20 pb-2">
            <h2 className="text-lg font-bold uppercase text-[#2a2421] tracking-wider">
              // YOUR LISTINGS LOG
            </h2>
            <Link
              to="/myauction"
              className="text-xs font-bold text-[#7da89f] uppercase hover:underline"
            >
              Browse all &rarr;
            </Link>
          </div>

          {data.latestUserAuctions.length === 0 ? (
            <div className="text-center py-12 bg-[#fdfaf2] border-2 border-dashed border-[#2a2421]/20 flex flex-col items-center justify-center gap-3">
              <p className="text-[#2a2421]/50 text-xs uppercase font-bold">
                NO REGISTERED TERMINAL LISTINGS FOUND.
              </p>
              <Link
                to="/create"
                className="retro-btn-pink text-xs uppercase"
              >
                Create your first listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.latestUserAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </section>

        {/* Mobile FAB */}
        <Link
          to="/create"
          className="sm:hidden fixed bottom-6 right-6 bg-[#f2785d] text-[#fdfaf2] p-4 border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_#2a2421] hover:bg-[#f2785d]/90 hover:scale-95 transition-all z-50 flex items-center justify-center font-bold text-lg"
        >
          +
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
