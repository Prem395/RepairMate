import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FcBarChart, FcElectricalSensor } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "../../context/AuthContext";
import {
  ChevronDown,
  ChevronUp,
  LogInIcon,
  UserCircleIcon,
} from "lucide-react";

import { useModal } from "../../context/AuthModalContext";
import { logoutUser } from "../../api/authService";
import { errorToast, successToast } from "../../utils/toastConfig";

const Navbar = () => {
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const [bookingModal, setbookingModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { openAuthModal } = useModal();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      console.log(res);
      setbookingModal(false);
      setIsAuthenticated(false);
      setUser(null);
      successToast("Logged out successfully", "bottom-center");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      errorToast("Something went wrong", error.message, "bottom-center");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setbookingModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Home", to: "/", end: true },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
  ];

  return (
    <>
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
            <FcElectricalSensor className="mr-[-8px] size-8 sm:mr-[-10px] sm:text-[45px]" />
            <h1
              id="logo-text"
              className="text-[20px] font-semibold leading-none sm:text-2xl"
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
          <div className="hidden md:flex items-center justify-end gap-3 w-[180px]">
            {isAuthenticated && user ? (
              <div ref={menuRef} className=" relative">
                <div
                  onClick={() => {
                    setbookingModal((prev) => !prev);
                  }}
                  className=" flex  rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 hover:bg-blue-500/15 transition"
                >
                  <button className="text-sm  text-blue-300">
                    <span
                      id="logo-text"
                      className="flex justify-center items-center gap-2 "
                    >
                      <UserCircleIcon size={22} className="text-blue-300" />
                      {user.firstName}
                    </span>
                  </button>

                  <ChevronDown
                    size={20}
                    className={`ml-1 transition-transform duration-200  ${
                      bookingModal ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {bookingModal && (
                  <div className="absolute right-0 top-[72px] w-64 overflow-hidden rounded-3xl border border-white/10 bg-[#13192d]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                    <div className="border-b border-white/10 px-5 py-4">
                      <h3 className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </h3>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          setbookingModal(false);
                          navigate("/my-bookings");
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                      >
                        📋
                        <span>My Bookings</span>
                      </button>
                      {user.role === "admin" && (
                        <button
                          onClick={() => {
                            setbookingModal(false);
                            navigate("/all-bookings");
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                        >
                          <FcBarChart size={20} />
                          <span>Dashboard</span>
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5"
                      >
                        🚪
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-normal text-white transition hover:bg-blue-300/20"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

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
            toggleAuth={openAuthModal}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
