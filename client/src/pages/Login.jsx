import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Login = () => {
  useDocumentTitle("Log In");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error);
      setIsError(error || "something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] mb-4 text-xl shadow-[2px_2px_0px_0px_#f2785d]">
            👤
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
            AUTHENTICATE
          </h1>
          <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
            ESTABLISH LINK WITH NETWORK NODE
          </p>
        </div>

        {/* Card */}
        <div className="retro-card p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="retro-input w-full px-4 py-2.5"
                placeholder="USER@HOST.COM"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
              >
                Password Key
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="retro-input w-full px-4 py-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            {isError && (
              <div className="bg-[#f2785d]/10 border-2 border-[#2a2421] text-[#f2785d] text-xs px-4 py-2.5">
                [ALERT] {isError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="retro-btn w-full"
            >
              {loading ? "AUTHENTICATING..." : "LOG IN"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#2a2421]/75 mt-6 uppercase">
          No registered node?{" "}
          <Link
            to="/signup"
            className="text-[#7da89f] font-bold hover:underline"
          >
            CREATE PROFILE
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
