import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useViewAuction, usePlaceBid } from "../hooks/useAuction.js";
import { useSocket } from "../hooks/useSocket.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import toast from "react-hot-toast";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

export const ViewAuction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const currentUserId = user?.user?._id;
  const inputRef = useRef();
  const [bidding, setBidding] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { data: fetchedData, isLoading } = useViewAuction(id);
  const { mutateAsync: placeBidMutation } = usePlaceBid();
  const { activeUsers, liveAuction, socketError, isConnected } = useSocket(
    id,
    currentUserId,
  );

  const data = liveAuction || fetchedData;
  useDocumentTitle(data?.itemName ? data.itemName : "Auction Details");

  // Live countdown timer
  useEffect(() => {
    if (!data?.itemEndDate) return;
    const updateCountdown = () => {
      const diff = Math.max(0, new Date(data.itemEndDate) - new Date());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data?.itemEndDate]);

  if (isLoading || !data) return <LoadingScreen />;

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const bidAmount = e.target.bidAmount.value.trim();
    if (!bidAmount) return;

    setBidding(true);
    try {
      // Divide input Rupees by 100 to submit to the backend dollar base
      await placeBidMutation({ bidAmount: Number(bidAmount) / 100, id });
      toast.success("Bid placed successfully!");
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      let msg = err.response?.data?.message || "Failed to place bid";
      // Format server error messages displaying "Rs X" to Rupees ₹(X * 100)
      msg = msg.replace(/Rs\s*([0-9.]+)/gi, (match, p1) => {
        return "₹" + (Number(p1) * 100).toLocaleString();
      });
      toast.error(msg);
    } finally {
      setBidding(false);
    }
  };

  const timeLeft = Math.max(0, new Date(data.itemEndDate) - new Date());
  const isActive = timeLeft > 0;
  const isSeller = data.seller._id === currentUserId;
  const winnerData = data.winner;

  const otherUsers = activeUsers.filter((u) => u.userId !== currentUserId);

  const getAvatarColor = (name) => {
    const avatarColors = [
      "border-[#7da89f] text-[#7da89f]",
      "border-[#f2785d] text-[#f2785d]",
      "border-[#e5b25d] text-[#e5b25d]",
    ];
    const hash = (name || "")
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0);
    return avatarColors[hash % avatarColors.length];
  };

  const BidHistoryList = () =>
    data.bids.length === 0 ? (
      <div className="py-10 text-center border-2 border-dashed border-[#2a2421]/20">
        <p className="text-[#2a2421]/50 text-sm">NO BIDS YET</p>
        <p className="text-[#2a2421]/40 text-xs mt-1">
          INITIATE FIRST BID SEQUENCE
        </p>
      </div>
    ) : (
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {data.bids.map((bid, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2.5 border-2 ${
              index === 0
                ? "bg-[#f2785d]/5 border-[#f2785d]"
                : "border-[#2a2421]/20 hover:border-[#2a2421]/50"
            } transition`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold ${getAvatarColor(bid.bidder?.name)} bg-white`}
              >
                {bid.bidder?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="text-xs font-bold text-[#2a2421] uppercase">
                  {bid.bidder?.name}
                  {index === 0 && (
                    <span className="ml-2 text-[8px] font-bold bg-[#f2785d] text-[#fdfaf2] px-1 py-0.2">
                      LEADER
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-[#2a2421]/50">
                  {new Date(bid.bidTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <span className="text-xs font-black text-[#f2785d] tabular-nums">
              ₹{(bid.bidAmount * 100).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <button
          onClick={() => {
            if (document.startViewTransition) {
              document.startViewTransition(() => navigate(-1));
            } else {
              navigate(-1);
            }
          }}
          className="inline-flex items-center gap-2 border-2 border-[#2a2421] px-4 py-1.5 hover:bg-[#2a2421]/10 transition mb-8 uppercase font-bold text-xs bg-white"
        >
          &larr; BACK TO LOBBY
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Image + Bid History */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Image Container */}
              <div className="relative border-4 border-[#2a2421] bg-white shadow-[4px_4px_0px_0px_#f2785d]">
                <div className="aspect-[4/3] overflow-hidden flex items-center justify-center">
                  <img
                    src={data.itemImage?.url || "https://picsum.photos/601"}
                    alt={data.itemName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {/* Floating status badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 uppercase border-2 ${
                      isActive
                        ? "bg-white text-[#f2785d] border-[#f2785d]"
                        : "bg-white text-[#2a2421]/50 border-[#2a2421]/40"
                    }`}
                  >
                    {isActive ? "LIVE AUCTION" : "ENDED"}
                  </span>
                  {isConnected && isActive && (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#7da89f] bg-white border-2 border-[#7da89f] px-2 py-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-[#7da89f] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 bg-[#7da89f]" />
                      </span>
                      {activeUsers.length} WATCHING
                    </span>
                  )}
                </div>
              </div>

              {/* Bid History — Desktop */}
              <div className="hidden lg:block bg-[#fdfaf2] border-2 border-[#2a2421] p-5 shadow-[4px_4px_0px_0px_#f2785d]">
                <h3 className="text-sm font-bold uppercase text-[#2a2421] mb-4 tracking-wider border-b border-[#2a2421]/20 pb-2">
                  &gt; BID HISTORY STREAM
                </h3>
                <BidHistoryList />
              </div>
            </div>
          </div>

          {/* Right — Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Category */}
            <div className="bg-[#fdfaf2] border-2 border-[#2a2421] p-5 shadow-[4px_4px_0px_0px_#f2785d]">
              <div className="mb-2">
                <span className="text-[10px] font-bold text-[#7da89f] border border-[#7da89f] bg-[#7da89f]/5 px-2 py-0.5 uppercase">
                  {data.itemCategory}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#2a2421] uppercase tracking-wide crt-glow">
                {data.itemName}
              </h1>
              <p className="mt-4 text-[#2a2421]/80 text-xs leading-relaxed border-t border-[#2a2421]/20 pt-4">
                {data.itemDescription}
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-[#fdfaf2] border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_#f2785d] overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-[#2a2421]/65 uppercase tracking-wider">
                      Current Price
                    </p>
                    <p className="text-4xl font-black text-[#2a2421] mt-1.5 tabular-nums crt-glow">
                      ₹{(data.currentPrice * 100).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-[#2a2421]/50 mt-1 uppercase">
                      Base rate: ₹{(data.startingPrice * 100).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#7da89f] border border-[#7da89f] px-2.5 py-1 bg-white">
                      {data.bids.length} BIDS
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Remaining Bar */}
              {isActive ? (
                <div className="bg-[#f2785d]/10 border-t-2 border-[#f2785d] text-[#f2785d] px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      TIME LEFT SEQUENCE
                    </span>
                    <div className="flex items-center gap-1">
                      {countdown.days > 0 && (
                        <span className="bg-white border border-[#f2785d] text-xs font-bold px-1.5 py-0.5 tabular-nums">
                          {countdown.days}D
                        </span>
                      )}
                      <span className="bg-white border border-[#f2785d] text-xs font-bold px-1.5 py-0.5 tabular-nums">
                        {String(countdown.hours).padStart(2, "0")}H
                      </span>
                      <span className="bg-white border border-[#f2785d] text-xs font-bold px-1.5 py-0.5 tabular-nums">
                        {String(countdown.minutes).padStart(2, "0")}M
                      </span>
                      <span className="bg-white border border-[#f2785d] text-xs font-bold px-1.5 py-0.5 tabular-nums">
                        {String(countdown.seconds).padStart(2, "0")}S
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 border-t-2 border-gray-300 px-5 py-3 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    SYSTEM OFFLINE AUCTION ENDED
                  </p>
                </div>
              )}
            </div>

            {/* Winner Section */}
            {!isActive && winnerData && (
              <div className="bg-[#fdfaf2] border-2 border-[#e5b25d] shadow-[4px_4px_0px_0px_#e5b25d] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="border-2 border-[#e5b25d] text-[#e5b25d] p-1 bg-white">
                    👑
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#e5b25d] uppercase tracking-wider">
                      Winner declared
                    </p>
                    <p className="text-lg font-black text-[#2a2421] uppercase crt-glow">
                      {winnerData.name}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#e5b25d]">
                  Winning bid registered at:{" "}
                  <span className="font-bold text-[#2a2421]">₹{(data.currentPrice * 100).toLocaleString()}</span>
                </p>
                {winnerData._id === currentUserId && (
                  <div className="mt-3 bg-[#e5b25d] text-[#fdfaf2] text-xs font-bold px-3 py-2 text-center uppercase tracking-wide shadow-[2px_2px_0px_0px_#2a2421]">
                    🏆 You are the winner of this auction!
                  </div>
                )}
              </div>
            )}

            {!isActive && !winnerData && data.bids.length === 0 && (
              <div className="bg-[#fdfaf2] border-2 border-gray-300 p-5 text-center shadow-[4px_4px_0px_0px_gray]">
                <p className="text-xs text-gray-500">
                  No bids were registered. Listing closed.
                </p>
              </div>
            )}

            {/* Bid Form */}
            {!isSeller && isActive && (
              <form
                onSubmit={handleBidSubmit}
                className="bg-[#fdfaf2] border-2 border-[#7da89f] shadow-[4px_4px_0px_0px_#7da89f] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="bidAmount"
                    className="text-xs font-bold text-[#7da89f] uppercase tracking-wider"
                  >
                    Place your bid
                  </label>
                  <span className="text-[10px] text-[#7da89f] font-semibold">
                    LIMITS: ₹{((data.currentPrice + 1) * 100).toLocaleString()} – ₹{((data.currentPrice + 10) * 100).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7da89f] text-sm font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="bidAmount"
                      id="bidAmount"
                      ref={inputRef}
                      min={(data.currentPrice + 1) * 100}
                      max={(data.currentPrice + 10) * 100}
                      className="w-full pl-7 pr-3 py-2 bg-white border-2 border-[#2a2421] text-[#2a2421] font-bold text-lg focus:outline-none focus:border-[#f2785d] transition font-mono"
                      placeholder={String((data.currentPrice + 1) * 100)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={bidding}
                    className="retro-btn-cyan"
                  >
                    {bidding ? "SENDING..." : "SUBMIT BID"}
                  </button>
                </div>
              </form>
            )}

            {/* Socket Error */}
            {socketError && (
              <div className="border-2 border-[#f2785d] bg-[#f2785d]/5 text-[#f2785d] text-xs px-4 py-2.5">
                [ALERT] {socketError}
              </div>
            )}

            {/* Active Users */}
            {otherUsers.length > 0 && (
              <div className="bg-[#fdfaf2] border-2 border-[#7da89f]/30 p-4 shadow-[4px_4px_0px_0px_rgba(125,168,159,0.1)]">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#7da89f] mb-3">
                  // CONNECTED NODES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {otherUsers.map((u) => (
                    <div
                      key={u.userId}
                      className="flex items-center gap-1.5 border border-[#7da89f]/25 bg-white px-2 py-0.5 text-[10px]"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-[#7da89f]"></span>
                      <span className="text-[#2a2421] uppercase font-bold">
                        {u.userName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller */}
            <div className="bg-[#fdfaf2] border-2 border-[#2a2421] p-5 shadow-[4px_4px_0px_0px_#f2785d]">
              <h3 className="text-xs font-bold uppercase text-[#2a2421] mb-3 tracking-wider">
                &gt; CREATOR PROFILE
              </h3>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 border-2 flex items-center justify-center text-sm font-bold ${getAvatarColor(data.seller.name)} bg-white`}
                >
                  {data.seller.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2a2421] uppercase">
                    {data.seller.name}
                  </p>
                  <p className="text-[10px] text-[#2a2421]/50">VENDOR NODE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bid History — Mobile */}
        <div className="mt-8 lg:hidden bg-[#fdfaf2] border-2 border-[#2a2421] p-5 shadow-[4px_4px_0px_0px_#f2785d]">
          <h3 className="text-sm font-bold uppercase text-[#2a2421] mb-4 tracking-wider border-b border-[#2a2421]/20 pb-2">
            &gt; BID HISTORY STREAM
          </h3>
          <BidHistoryList />
        </div>
      </div>
    </div>
  );
};
