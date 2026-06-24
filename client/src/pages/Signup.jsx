import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Signup = () => {
  useDocumentTitle("Sign Up");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Signup Failed", error);
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
            🤖
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
            CREATE PROFILE
          </h1>
          <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
            REGISTER NEW NODE ON NETWORK
          </p>
        </div>

        {/* Card */}
        <div className="retro-card p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="retro-input w-full px-4 py-2.5"
                placeholder="JOHN DOE"
                required
              />
            </div>

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
                minLength={8}
              />
              <p className="mt-1 text-[10px] text-[#2a2421]/50 uppercase">
                MIN LENGTH: 8 CHARACTERS
              </p>
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
              {loading ? "INITIALIZING..." : "SIGN UP"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#2a2421]/75 mt-6 uppercase">
          Already have a node?{" "}
          <Link
            to="/login"
            className="text-[#7da89f] font-bold hover:underline"
          >
            AUTHENTICATE
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
