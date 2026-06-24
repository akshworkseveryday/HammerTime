import { Link } from "react-router";
import { usePrefetchHandlers } from "../hooks/useAuction.js";

export default function AuctionCard({ auction }) {
  const daysLeft = Math.ceil(auction.timeLeft / (1000 * 60 * 60 * 24));
  const isActive = daysLeft > 0;
  const { prefetchAuction } = usePrefetchHandlers();

  // Scale prices by 100 for display
  const priceVal = (auction.currentPrice || auction.startingPrice || 0) * 100;

  return (
    <Link
      to={`/auction/${auction._id}`}
      viewTransition
      onMouseEnter={() => prefetchAuction(auction._id)}
      className="group block w-full bg-[#fdfaf2] border-2 border-[#2a2421] text-[#2a2421] shadow-[4px_4px_0px_0px_#f2785d] hover:shadow-[6px_6px_0px_0px_#7da89f] hover:border-[#7da89f] hover:text-[#7da89f] transition-all duration-150 font-mono"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden bg-white border-b-2 border-[#2a2421]">
        <img
          src={auction.itemPhoto || "https://picsum.photos/300"}
          alt={auction.itemName}
          className="h-full w-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase bg-white text-[#7da89f] border border-[#7da89f] px-2 py-0.5">
            {auction.itemCategory}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 uppercase border ${
              isActive
                ? "bg-white text-[#f2785d] border-[#f2785d]"
                : "bg-white text-[#2a2421]/60 border-[#2a2421]/40"
            }`}
          >
            {isActive ? `${daysLeft}d left` : "Ended"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-base uppercase mb-1 line-clamp-1 group-hover:text-[#2a2421] transition-colors crt-glow">
          {auction.itemName}
        </h3>
        <p className="text-[#2a2421]/70 text-xs mb-4 line-clamp-2 leading-relaxed">
          {auction.itemDescription}
        </p>

        <div className="flex items-end justify-between border-t border-[#2a2421]/20 pt-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-[#2a2421]/65">
              Current Bid
            </p>
            <p className="text-xl font-black text-[#2a2421] tabular-nums crt-glow">
              ₹{priceVal.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#7da89f]">
              <span className="inline-block w-2.5 h-2.5 bg-current border border-[#2a2421]"></span>
              {auction.bidsCount} BIDS
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-[#2a2421]/20 flex items-center justify-between text-[10px]">
          <p className="text-[#2a2421]/50 font-medium">
            BY: {auction?.sellerName || auction?.seller?.name}
          </p>
          <span className="font-bold text-[#7da89f] group-hover:underline">
            GO TO LOBBY &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
