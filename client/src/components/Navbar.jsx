import { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { usePrefetchHandlers } from "../hooks/useAuction.js";
import {
  MdOutlineCreate,
  MdOutlineDashboard,
  MdMailOutline,
  MdAttachMoney,
  MdOutlineAccountCircle,
  MdOutlineHome,
  MdOutlinePrivacyTip,
  MdAdminPanelSettings,
} from "react-icons/md";
import {
  IoCloseSharp,
  IoLogOutOutline,
} from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiTarget } from "react-icons/fi";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    prefetchAuctions,
    prefetchMyAuctions,
    prefetchMyBids,
    prefetchDashboard,
  } = usePrefetchHandlers();

  const handlePrefetch = useCallback(
    (link) => {
      const prefetchMap = {
        "/": prefetchDashboard,
        "/auction": prefetchAuctions,
        "/myauction": prefetchMyAuctions,
        "/mybids": prefetchMyBids,
      };
      prefetchMap[link]?.();
    },
    [prefetchAuctions, prefetchMyAuctions, prefetchMyBids, prefetchDashboard],
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = user ? getNavLinks(user.user.role) : navMenu;
  const drawerItems = user ? getAllLinks(user.user.role) : navMenu;

  return (
    <>
      {/* Global CRT overlay inside layout */}
      <div className="crt-overlay" />

      <header className="sticky top-0 z-40 border-b-4 border-[#f2785d] bg-[#fdfaf2] text-[#2a2421]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-wider crt-glow text-[#f2785d] font-mono">
                👾 HAMMERTIME
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 font-mono">
              {navItems.map((item) => (
                <NavLink
                  to={item.link}
                  key={item.link}
                  end={item.link === "/"}
                  onMouseEnter={() => handlePrefetch(item.link)}
                  className={({ isActive }) =>
                    `px-3 py-1 text-sm font-semibold uppercase transition-all border-2 ${
                      isActive
                        ? "bg-[#f2785d] text-[#fdfaf2] border-[#2a2421] shadow-[2px_2px_0px_0px_#7da89f]"
                        : "text-[#2a2421] border-transparent hover:border-[#f2785d] hover:shadow-[2px_2px_0px_0px_rgba(242,120,93,0.3)]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3 font-mono">
              {/* Desktop auth buttons */}
              {!user && (
                <div className="hidden md:flex items-center gap-3">
                  <LoginSignup />
                </div>
              )}
              {user && (
                <div className="hidden md:flex items-center gap-2">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 border-2 transition-all ${
                        isActive
                          ? "bg-[#7da89f] text-[#fdfaf2] border-[#2a2421] shadow-[2px_2px_0px_0px_#f2785d]"
                          : "border-transparent text-[#7da89f] hover:border-[#7da89f] hover:bg-[#7da89f]/10"
                      }`
                    }
                  >
                    <div className="w-5 h-5 bg-[#7da89f] text-[#fdfaf2] flex items-center justify-center text-xs font-bold font-mono">
                      {user.user.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span>{user.user.name?.split(" ")[0]}</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 border-2 border-transparent text-[#f2785d] hover:border-[#f2785d] hover:bg-[#f2785d]/10 cursor-pointer"
                    title="Sign out"
                  >
                    <IoLogOutOutline className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Hamburger */}
              <button
                onClick={toggleMenu}
                className="p-1.5 border-2 border-[#2a2421] bg-transparent text-[#2a2421] hover:bg-[#2a2421]/10"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <HiOutlineMenuAlt3 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#fdfaf2] border-l-4 border-[#2a2421] text-[#2a2421] z-50 transform transition-transform duration-300 ease-out font-mono ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-5 h-16 border-b-2 border-[#2a2421]">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-lg font-bold tracking-wider text-[#f2785d] crt-glow">
              MENU
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1.5 border-2 border-[#f2785d] text-[#f2785d] hover:bg-[#f2785d]/10"
            aria-label="Close menu"
          >
            <IoCloseSharp className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="px-5 py-4 border-b-2 border-[#2a2421]/20 bg-[#fdfaf2]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 border-2 border-[#7da89f] flex items-center justify-center overflow-hidden bg-white">
                {user.user.avatar ? (
                  <img
                    src={user.user.avatar}
                    alt={user.user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#7da89f]">
                    {user.user.name?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#2a2421] text-sm truncate">
                  {user.user.name}
                </p>
                <p className="text-xs text-[#2a2421]/75 truncate">
                  {user.user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Links */}
        <nav
          className="px-3 py-3 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <div className="space-y-1">
            {drawerItems.map((item) => (
              <NavLink
                to={item.link}
                key={item.link}
                end={item.link === "/"}
                onMouseEnter={() => handlePrefetch(item.link)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 border-2 transition-all uppercase text-xs font-bold ${
                    isActive
                      ? "bg-[#f2785d] text-[#fdfaf2] border-[#2a2421] shadow-[2px_2px_0px_0px_#7da89f]"
                      : "border-transparent hover:border-[#f2785d]/50 hover:bg-[#f2785d]/5"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {user ? (
            <div className="mt-4 pt-4 border-t-2 border-[#2a2421]/20">
              <button
                className="flex items-center gap-3 w-full px-3 py-2.5 border-2 border-transparent text-[#f2785d] hover:border-[#f2785d] hover:bg-[#f2785d]/5 transition cursor-pointer font-bold uppercase text-xs"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                <IoLogOutOutline className="h-5 w-5" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t-2 border-[#2a2421]/20 space-y-3 px-1">
              <Link
                to="/login"
                className="block w-full py-2 px-4 text-center text-[#2a2421] border-2 border-[#2a2421] hover:bg-[#f2785d]/10 transition uppercase text-xs font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block w-full py-2 px-4 text-center bg-[#f2785d] text-[#fdfaf2] border-2 border-[#2a2421] hover:bg-[#f2785d]/90 transition uppercase text-xs font-bold shadow-[2px_2px_0px_0px_#7da89f]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export const LoginSignup = () => {
  return (
    <>
      <Link
        to="/login"
        className="px-3 py-1 border-2 border-[#2a2421] hover:bg-[#f2785d]/10 transition text-sm font-semibold uppercase"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="px-3 py-1 bg-[#f2785d] text-[#fdfaf2] border-2 border-[#2a2421] hover:bg-[#f2785d]/90 transition text-sm font-semibold uppercase shadow-[2px_2px_0px_0px_#7da89f]"
      >
        Sign up
      </Link>
    </>
  );
};

const navMenu = [
  {
    name: "Home",
    link: "/",
    icon: <MdOutlineHome className="h-5 w-5" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <MdOutlineAccountCircle className="h-5 w-5" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdMailOutline className="h-5 w-5" />,
  },
];

const protectedNavLink = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="h-5 w-5" />,
  },
  {
    name: "Auctions",
    link: "/auction",
    icon: <RiAuctionLine className="h-5 w-5" />,
  },
  {
    name: "My Auctions",
    link: "/myauction",
    icon: <MdAttachMoney className="h-5 w-5" />,
  },
  {
    name: "My Bids",
    link: "/mybids",
    icon: <FiTarget className="h-5 w-5" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <MdMailOutline className="h-5 w-5" />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <MdOutlineAccountCircle className="h-5 w-5" />,
  },
  {
    name: "Privacy",
    link: "/privacy",
    icon: <MdOutlinePrivacyTip className="h-5 w-5" />,
  },
];

const adminNavLink = [
  {
    name: "Admin Panel",
    link: "/admin",
    icon: <MdAdminPanelSettings className="h-5 w-5" />,
  },
  {
    name: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard className="h-5 w-5" />,
  },
  {
    name: "Create Auction",
    link: "/create",
    icon: <MdOutlineCreate className="h-5 w-5" />,
  },
  {
    name: "Auctions",
    link: "/auction",
    icon: <RiAuctionLine className="h-5 w-5" />,
  },
  {
    name: "My Auctions",
    link: "/myauction",
    icon: <MdAttachMoney className="h-5 w-5" />,
  },
  {
    name: "My Bids",
    link: "/mybids",
    icon: <FiTarget className="h-5 w-5" />,
  },
];

const getNavLinks = (userRole) => {
  if (userRole === "admin") {
    return adminNavLink;
  }
  return protectedNavLink.slice(0, 5);
};

const getAllLinks = (userRole) => {
  if (userRole === "admin") {
    return [
      ...adminNavLink,
      protectedNavLink[5], // Contact
      protectedNavLink[6], // Profile
      protectedNavLink[7], // Privacy
    ];
  }
  return protectedNavLink; // All 8 links
};
