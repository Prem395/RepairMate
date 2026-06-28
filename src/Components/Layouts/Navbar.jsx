import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FcElectricalSensor } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { LogInIcon } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleAuth = () => {
    setIsAuthOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );

      console.log(res);
      setIsAuthenticated(false);
      setUser(null);
      toast.success(`You have been logged out.`, {
        // icon: "",
        icon: "✅",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(59,130,246,0.18)",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const navItems = [
    { label: "Home", to: "/", end: true },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
  ];

  return (
    <>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pb-2 pt-4">
        <nav
          data-main-navbar
          className="pointer-events-auto flex min-h-[64px] w-[92%] max-w-[1200px] items-center justify-between gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-lg sm:min-h-[70px] sm:gap-6 sm:px-6 sm:py-3"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 sm:gap-3"
          >
            <FcElectricalSensor
              size={38}
              className="mr-[-8px] sm:mr-[-10px] sm:text-[45px]"
            />
            <h1
              id="logo-text"
              className="text-[1.95rem] font-semibold leading-none sm:text-2xl"
            >
              Repair<span className="text-blue-400">Mate</span>
            </h1>
          </button>

          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-white/10 px-4 py-2 font-semibold text-blue-300"
                    : "rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-blue-300"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {isAuthenticated && user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                <span className="text-sm font-medium text-blue-300">
                  Hi, {user.firstName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-black/20 px-5 py-2 text-sm font-normal text-white transition hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={toggleAuth}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-normal text-white transition hover:bg-blue-300/20"
              >
                Sign In
              </button>
            </div>
          )}

          <div className="md:hidden">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      <div aria-hidden="true" className="h-[98px] sm:h-[106px]" />

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[999]">
          <NavbarMobile
            onClose={() => setIsOpen(false)}
            toggleAuth={toggleAuth}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
