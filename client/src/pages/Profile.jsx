import { useState } from "react";
import { CiMail, CiUser, CiLock } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useChangePassword } from "../hooks/useUser";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Profile() {
  useDocumentTitle("Profile");
  const { user } = useSelector((state) => state.auth);
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useChangePassword({
    onSuccess: () => {
      setSuccessMessage("Password Changed Successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 10000);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error);
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setIsError("Please enter all fields");
      setTimeout(() => {
        setIsError("");
      }, 10000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setIsError("New password and confirm password do not match.");
      setTimeout(() => {
        setIsError("");
      }, 10000);
      return;
    }
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono py-12">
      <div className="max-w-4xl mx-auto p-4">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
              PROFILE SETTINGS
            </h1>
            <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
              Update password keys and review terminal metrics
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 bg-[#7da89f]/10 border-2 border-[#2a2421] text-[#7da89f] text-xs px-4 py-3 uppercase">
              [SUCCESS] {successMessage}
            </div>
          )}

          <div className="retro-card overflow-hidden">
            {/* Header info bar */}
            <div className="px-4 py-5 sm:px-6 border-b-2 border-[#2a2421] bg-[#fdfaf2]">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative mb-4 sm:mb-0">
                  <div className="h-16 w-16 border-2 border-[#2a2421] flex items-center justify-center text-2xl font-bold text-[#2a2421] bg-[#7da89f]">
                    {user.user.name?.charAt(0)?.toUpperCase()}
                  </div>
                </div>
                <div className="text-center sm:text-left font-mono">
                  <h2 className="text-lg font-bold text-[#2a2421] uppercase tracking-wider">
                    {user.user.name}
                  </h2>
                  <p className="text-xs text-[#2a2421]/70">{user.user.email}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="divide-y divide-[#2a2421]">
              {/* Personal Information */}
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase text-[#2a2421] mb-4 tracking-wider">
                  &gt;&gt; USER DETAILS
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1"
                    >
                      User Handle
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiUser className="h-5 w-5 text-[#2a2421]/40" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.user.name}
                        className="retro-input w-full pl-10 pr-3 py-2 opacity-65 cursor-not-allowed"
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1"
                    >
                      Network Endpoint (Email)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiMail className="h-5 w-5 text-[#2a2421]/40" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.user.email}
                        disabled
                        className="retro-input w-full pl-10 pr-3 py-2 opacity-65 cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password change */}
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase text-[#2a2421] mb-4 tracking-wider">
                  &gt;&gt; KEY ROTATION SEQUENCE
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1"
                    >
                      Current Password Key
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-[#2a2421]/40" />
                      </div>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="retro-input w-full pl-10 pr-3 py-2"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1"
                    >
                      New Password Key
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-[#2a2421]/40" />
                      </div>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="retro-input w-full pl-10 pr-3 py-2"
                        placeholder="Enter new password"
                        minLength={8}
                      />
                    </div>
                    <p className="mt-1 text-[9px] text-[#2a2421]/50 uppercase">
                      MIN LENGTH: 8 CHARACTERS
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1"
                    >
                      Confirm New Password Key
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiLock className="h-5 w-5 text-[#2a2421]/40" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="retro-input w-full pl-10 pr-3 py-2"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {isError && (
                    <div className="bg-[#f2785d]/10 border-2 border-[#2a2421] text-[#f2785d] text-xs px-4 py-2.5 uppercase">
                      [ALERT] {isError}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit actions */}
              <div className="px-4 py-5 sm:p-6 bg-[#fdfaf2] flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="retro-btn"
                >
                  {isPending ? "SAVING..." : "COMMIT CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
