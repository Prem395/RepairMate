import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
// import logo from "../assets/Logo2.png";
import NavbarMobile from "./NavbarMobile";
import { FcElectricalSensor } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="w-[90%] max-w-[1000px] h-[70px] border-2 border-white/5 bg-white/10 backdrop-blur-lg rounded-full px-6 shadow-lg mt-6 text-white flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          {/* <img src={logo} alt="logo" className="w-[40px]" /> */}
          <FcElectricalSensor size={45} className="mr-[-10px]" />
          <h1 id="logo-text" className="text-2xl font-semibold">
            Repair<span className="text-blue-400">Mate</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-md font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400 transition"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400 transition"
            }
          >
            Services
          </NavLink>
        </div>

        <div className="md:hidden">
          <button className="cursor-pointer" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[999]">
          <NavbarMobile onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
