import { useState } from "react";
import { useNavigate } from "react-router";
import AuctionCard from "../components/AuctionCard";
import { useGetAuctions } from "../hooks/useAuction";
import LoadingScreen from "../components/LoadingScreen";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const AuctionList = () => {
  useDocumentTitle("Browse Auctions");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAuctions(page);

  if (isLoading) return <LoadingScreen />;

  const rawData = data || {};
  const auctions = Array.isArray(rawData) ? rawData : rawData.auctions || [];
  const pagination = Array.isArray(rawData) ? {} : rawData.pagination || {};

  const categories = [
    "all",
    ...new Set(auctions?.map((auction) => auction.itemCategory)),
  ];
  const filteredAuctions =
    filter === "all"
      ? auctions
      : auctions?.filter((auction) => auction.itemCategory === filter);

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 border-2 border-[#2a2421] px-4 py-1.5 hover:bg-[#2a2421]/10 text-[#2a2421] transition mb-6 uppercase font-bold text-xs"
        >
          &larr; BACK
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
            ACTIVE STREAMS
          </h1>
          <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
            BROWSING {pagination.total || 0} NETWORK LISTINGS
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 border-2 text-xs font-bold uppercase transition-all ${
                  filter === category
                    ? "bg-[#f2785d] text-[#fdfaf2] border-[#2a2421] shadow-[2px_2px_0px_0px_#2a2421]"
                    : "text-[#2a2421] border-[#2a2421] hover:bg-[#2a2421]/10 bg-[#fdfaf2]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-5">
          <p className="text-xs text-[#2a2421]/50 uppercase">
            FILTER: {filter} &gt;&gt; STREAM COUNT: {filteredAuctions.length}
          </p>
        </div>

        {filteredAuctions.length === 0 ? (
          <div className="text-center py-20 bg-[#fdfaf2] border-2 border-dashed border-[#2a2421]/30">
            <p className="text-xs text-[#f2785d] uppercase">NO SEQUENCES DETECTED IN THIS CATEGORY</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs font-bold uppercase border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] hover:bg-[#2a2421]/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              PREV
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 border-2 text-xs font-bold uppercase transition ${
                    p === page
                      ? "bg-[#f2785d] text-[#fdfaf2] border-[#2a2421] shadow-[2px_2px_0px_0px_#2a2421]"
                      : "bg-[#fdfaf2] text-[#2a2421] border-[#2a2421] hover:bg-[#2a2421]/10"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page === pagination.totalPages}
              className="px-3 py-1.5 text-xs font-bold uppercase border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] hover:bg-[#2a2421]/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
