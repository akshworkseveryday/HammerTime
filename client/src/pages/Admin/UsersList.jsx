import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { getAllUsers } from "../../api/admin";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const UsersList = () => {
  useDocumentTitle("Manage Users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchUsers = async (
    page = 1,
    search = "",
    sort = "createdAt",
    order = "desc",
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllUsers(page, search, "all", 20, sort, order);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm, sortBy, sortOrder);
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLocation = (location) => {
    if (!location) return "Unknown";
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);
    if (location.country) parts.push(location.country);
    return parts.length > 0 ? parts.join(", ") : "Unknown";
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return (
        <svg
          className="w-3.5 h-3.5 text-[#2a2421]/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }
    return sortOrder === "asc" ? (
      <svg
        className="w-3.5 h-3.5 text-[#f2785d]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-3.5 h-3.5 text-[#f2785d]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2a2421] crt-glow uppercase">All Users</h1>
            <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
              {pagination.totalUsers
                ? `${pagination.totalUsers} registered users`
                : "Manage all users"}
            </p>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 retro-btn text-xs py-1.5 px-3"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2a2421]/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="retro-input w-full pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-[#f2785d]/10 border-2 border-[#2a2421] text-[#f2785d] text-sm p-4 mb-6 font-bold">
            [ALERT] {error}
          </div>
        )}

        {/* Table */}
        <div className="retro-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-[#2a2421] bg-[#fdfaf2]">
                  <th
                    className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider cursor-pointer hover:text-[#f2785d] transition"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1.5">
                      User <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider cursor-pointer hover:text-[#f2785d] transition"
                    onClick={() => handleSort("role")}
                  >
                    <div className="flex items-center gap-1.5">
                      Role <SortIcon field="role" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider cursor-pointer hover:text-[#f2785d] transition"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-1.5">
                      Joined <SortIcon field="createdAt" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider cursor-pointer hover:text-[#f2785d] transition"
                    onClick={() => handleSort("lastLogin")}
                  >
                    <div className="flex items-center gap-1.5">
                      Last Login <SortIcon field="lastLogin" />
                    </div>
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#2a2421] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#2a2421]">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-16 text-center text-[#2a2421]/60 uppercase text-xs"
                    >
                      No users found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => {
                    const avatarColors = [
                      "bg-[#7da89f]",
                      "bg-[#f2785d]",
                      "bg-[#ffb09c]",
                      "bg-[#e5b25d]",
                    ];
                    return (
                      <tr
                        key={user._id}
                        className="hover:bg-[#2a2421]/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-9 w-9 border-2 border-[#2a2421] ${avatarColors[i % avatarColors.length]} flex items-center justify-center shrink-0`}
                            >
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
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2421]/80">
                          {formatDate(user.lastLogin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2a2421]/80">
                          {formatLocation(user.location)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7da89f] bg-[#7da89f]/10 border border-[#2a2421] px-2.5 py-1">
                            <span className="w-1.5 h-1.5 bg-[#7da89f] rounded-full" />
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="border-t-2 border-[#2a2421] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fdfaf2]">
              <p className="text-xs text-[#2a2421]/60 uppercase">
                Showing{" "}
                <span className="font-bold text-[#2a2421]">
                  {(currentPage - 1) * pagination.limit + 1}
                </span>{" "}
                &ndash;{" "}
                <span className="font-bold text-[#2a2421]">
                  {Math.min(
                    currentPage * pagination.limit,
                    pagination.totalUsers,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#2a2421]">
                  {pagination.totalUsers}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] hover:bg-[#2a2421]/10 text-xs disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  PREV
                </button>
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum =
                      Math.max(
                        1,
                        Math.min(pagination.totalPages - 4, currentPage - 2),
                      ) + i;
                    if (pageNum > pagination.totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 font-bold transition ${
                          pageNum === currentPage
                            ? "bg-[#f2785d] text-[#fdfaf2] border-2 border-[#2a2421] shadow-[2px_2px_0px_0px_#2a2421]"
                            : "bg-[#fdfaf2] text-[#2a2421] border-2 border-[#2a2421] hover:bg-[#2a2421]/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(pagination.totalPages, currentPage + 1),
                    )
                  }
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] hover:bg-[#2a2421]/10 text-xs disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
