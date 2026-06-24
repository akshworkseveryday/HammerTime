import { FaClock, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const auctions = [
  {
    img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644725/miekytfqgwnlj4jqai5k.png",
    title: "Vintage Film Camera - Excellent Condition",
    price: "₹24,500",
    bids: 12,
    time: "2h 15m",
    color: "border-[#f2785d] text-[#f2785d]",
  },
  {
    img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644637/lk7l3ar3sptniptieyo3.png",
    title: "Luxury Swiss Watch - Gold Plated",
    price: "₹1,25,000",
    bids: 28,
    time: "5h 42m",
    color: "border-[#e5b25d] text-[#e5b25d]",
  },
  {
    img: "https://res.cloudinary.com/dhv8qx1qy/image/upload/v1750644675/tatznfsoekfp3vsoeswd.png",
    title: "Original Oil Painting - Abstract Art",
    price: "₹89,000",
    bids: 7,
    time: "1d 3h",
    color: "border-[#7da89f] text-[#7da89f]",
  },
];

export const Auction = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#fdfaf2] text-[#2a2421] border-t-4 border-b-4 border-[#f2785d]/20 font-mono">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10 border-b border-[#f2785d]/25 pb-4">
          <div>
            <p className="text-[#7da89f] font-bold text-xs uppercase tracking-widest mb-1">
              // ACTIVE SYSTEM STREAMS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#2a2421] crt-glow">
              Live Auctions
            </h2>
          </div>
          <Link
            to="/signup"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#7da89f] uppercase hover:underline"
          >
            Enter Lobby <FaChevronRight className="h-2.5 w-2.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((item) => (
            <Link
              key={item.title}
              to="/signup"
              className="group bg-[#fdfaf2] border-2 border-[#2a2421] text-[#2a2421] shadow-[4px_4px_0px_0px_#f2785d] hover:shadow-[6px_6px_0px_0px_#7da89f] hover:text-[#7da89f] overflow-hidden transition-all duration-150 animate-fade-in"
            >
              <div className="relative aspect-[3/2] bg-white overflow-hidden border-b-2 border-[#2a2421]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`bg-white text-xs font-bold px-2 py-0.5 border ${item.color} inline-flex items-center gap-1 uppercase`}
                  >
                    <FaClock className="h-2 w-2" />
                    {item.time}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm uppercase mb-3 line-clamp-1 group-hover:text-[#2a2421] transition-colors crt-glow">
                  {item.title}
                </h3>
                <div className="flex items-end justify-between border-t border-[#2a2421]/20 pt-3">
                  <div>
                    <p className="text-[9px] font-bold text-[#2a2421]/60 uppercase tracking-wider">
                      Current Bid
                    </p>
                    <p className="text-lg font-black text-[#2a2421] crt-glow">
                      {item.price}
                    </p>
                  </div>
                  <span className="text-xs text-[#7da89f] font-bold uppercase">
                    {item.bids} bids
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link to="/signup" className="text-xs font-bold text-[#7da89f] uppercase hover:underline">
            View all auctions &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Auction;
