import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import AuctionCard from "../../components/AuctionCard";
import LoadingScreen from "../../components/LoadingScreen";
import { getAdminDashboard } from "../../api/admin";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const statConfig = [
  {
    key: "activeAuctions",
    label: "Active Auctions",
    color: "text-[#7da89f]",
    bg: "bg-[#7da89f]/10",
    icon: (
      <svg
        className="w-5 h-5 text-[#7da89f]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    key: "totalAuctions",
    label: "Total Auctions",
    color: "text-[#f2785d]",
    bg: "bg-[#f2785d]/10",
    icon: (
      <svg
        className="w-5 h-5 text-[#f2785d]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    key: "totalUsers",
    label: "Total Users",
    color: "text-[#ffb09c]",
    bg: "bg-[#ffb09c]/10",
    icon: (
      <svg
        className="w-5 h-5 text-[#ffb09c]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
  },
  {
    key: "recentUsers",
    label: "Recent Signups",
    color: "text-[#e5b25d]",
    bg: "bg-[#e5b25d]/10",
    icon: (
      <svg
        className="w-5 h-5 text-[#e5b25d]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    ),
  },
];

export const AdminDashboard = () => {
  useDocumentTitle("Admin Dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const data = await getAdminDashboard();
      setDashboardData(data || {});
      setUsers(data.recentUsersList || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
      setDashboardData({});
      setUsers([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchDashboardData();
      } catch (error) {
        console.error("Error loading admin data:", error);
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-[#f2785d]/10 border-2 border-[#2a2421] text-[#f2785d] p-4 font-bold">
            [ALERT] {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2a2421] crt-glow uppercase">
              Admin Dashboard
            </h1>
            <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
              Manage auctions, users, and monitor activity
            </p>
          </div>
          <Link
            to="/admin/users"
            className="hidden sm:inline-flex items-center gap-2 retro-btn text-xs py-1.5 px-3"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
              />
            </svg>
            All Users
          </Link>
        </div>

        {/* Stats */}
        {dashboardData && dashboardData.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {statConfig.map((stat) => (
              <div
                key={stat.key}
                className="retro-card p-5 flex items-center gap-4"
              >
                <div className={`${stat.bg} p-3 shrink-0 border-2 border-[#2a2421]`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2a2421]/60 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-bold ${stat.color} tabular-nums mt-0.5`}
                  >
                    {dashboardData.stats[stat.key] || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Auctions */}
        {dashboardData && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#2a2421] crt-glow uppercase">
                Recent Active Auctions
              </h2>
              <Link
                to="/auction"
                className="text-xs font-bold text-[#7da89f] hover:underline uppercase"
              >
                View all &rarr;
              </Link>
            </div>

            {!dashboardData.recentAuctions ||
            dashboardData.recentAuctions.length === 0 ? (
              <div className="text-center py-16 bg-[#fdfaf2] border-2 border-dashed border-[#2a2421]/30">
                <p className="text-xs text-[#2a2421]/60 uppercase">
                  No active auctions at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dashboardData.recentAuctions.map((auction) => (
                  <AuctionCard key={auction._id} auction={auction} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Recent Users */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#2a2421] crt-glow uppercase">
              Recent Users
            </h2>
            <Link
              to="/admin/users"
              className="text-xs font-bold text-[#7da89f] hover:underline uppercase"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="retro-card overflow-hidden">
            {!users || users.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xs text-[#2a2421]/60 uppercase">No users found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-[#2a2421] bg-[#fdfaf2]">
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#2a2421]">
                    {(users || []).map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-[#2a2421]/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 border-2 border-[#2a2421] bg-[#7da89f] flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-[#fdfaf2]">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#2a2421]">
                                {user.name}
                              </p>
                              <p className="text-xs text-[#2a2421]/60">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex text-[11px] font-bold px-2.5 py-1 border border-[#2a2421] ${
                              user.role === "admin"
                                ? "bg-[#f2785d]/10 text-[#f2785d]"
                                : "bg-[#7da89f]/10 text-[#7da89f]"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2421]/80">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2421]/80">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString()
                            : "Never"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7da89f] bg-[#7da89f]/10 border border-[#2a2421] px-2.5 py-1">
                            <span className="w-1.5 h-1.5 bg-[#7da89f] rounded-full" />
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
