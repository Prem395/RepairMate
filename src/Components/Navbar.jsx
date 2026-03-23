import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FcElectricalSensor } from "react-icons/fc";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, openAuthModal, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

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
            <FcElectricalSensor size={38} className="mr-[-8px] sm:mr-[-10px] sm:text-[45px]" />
            <h1 id="logo-text" className="text-[1.95rem] font-semibold leading-none sm:text-2xl">
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
            {currentUser?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-white/10 px-4 py-2 font-semibold text-blue-300"
                    : "rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-blue-300"
                }
              >
                Admin Panel
              </NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center ">
            {currentUser ? (
              <>
                <div className="flex px-2 gap-1  items-center border border-white/10 bg-black/20 rounded-l-full overflow-hidden">
                  <HiOutlineUserCircle
                    size={27}
                    className="text-slate-200 mr-[-12px]"
                  />
                  <p className="px-3 mr-[-12px] h-11 text-sm font-semibold uppercase  flex items-center text-slate-200 truncate">
                    {currentUser.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="border border-white/10 bg-black/20 rounded-r-full px-2 py-[10px] text-sm font-medium transition hover:text-gray-600"
                >
                  <IoIosLogOut size={24} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  openAuthModal({
                    mode: "signin",
                    redirectTo: window.location.pathname,
                  })
                }
                className="rounded-full gap-2 flex justify-center items-center border border-white/10 bg-black/20 rounded-l-full px-5 py-2 text-sm font-semibold transition hover:bg-white/5"
              >
                Sign Up
                <IoIosLogIn size={24} className="text-slate-200 font-semibold " />
              </button>
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
          <NavbarMobile onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
