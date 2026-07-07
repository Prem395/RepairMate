import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FcAbout,
  FcBarChart,
  FcBriefcase,
  FcBusinessman,
  FcBusinesswoman,
  FcFinePrint,
  FcHome,
  FcSupport,
} from "react-icons/fc";

const NavbarMobile = ({ onClose, toggleAuth, handleLogout }) => {
  const { user, isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: {
      x: "100%",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end bg-black/50 backdrop-blur-sm">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        // className="mt-14 flex flex-col //"
        className="relative flex h-full w-[85%] max-w-sm flex-col border-l border-white/10 bg-[#0b1020]/95 px-6 py-8 text-white backdrop-blur-xl"
      >
        {/* General */}
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            General
          </p>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 text-white transition hover:text-blue-400"
          >
            <FiX size={24} />
          </button>

          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <NavLink
                to="/"
                end
                onClick={onClose}
                className="flex items-center gap-3"
              >
                {/* <House size={20} /> */}
                <FcHome size={20} />
                <span>Home</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink
                to="/services"
                onClick={onClose}
                className="flex items-center gap-3"
              >
                <FcSupport size={20} />
                <span>Services</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink
                to="/about"
                onClick={onClose}
                className="flex items-center gap-3"
              >
                <FcAbout size={20} />
                <span>About us</span>
              </NavLink>
            </motion.div>
          </div>
        </div>

        {/* Account */}
        {isAuthenticated && user && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Account
            </p>

            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <NavLink
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3"
                >
                  <FcBusinessman size={20} />
                  <span>My Profile</span>
                </NavLink>
              </motion.div>

              <motion.div variants={itemVariants}>
                <NavLink
                  to="/my-bookings"
                  onClick={onClose}
                  className="flex items-center gap-3"
                >
                  <FcFinePrint size={20} />
                  <span>My Bookings</span>
                </NavLink>
              </motion.div>
            </div>
          </div>
        )}

        {/* Admin */}
        {isAuthenticated && user?.role === "admin" && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>

            <motion.div variants={itemVariants}>
              <NavLink
                to="/all-bookings"
                onClick={onClose}
                className="flex items-center gap-3"
              >
                <FcBarChart size={20} />
                <span>Dashboard</span>
              </NavLink>
            </motion.div>
          </div>
        )}

        {/* User Section */}
        {isAuthenticated && user ? (
          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="w-full rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3 text-sm text-white transition hover:bg-red-600/20"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              onClick={toggleAuth}
              className="w-full rounded-xl border border-blue-600/20 bg-blue-600/10 px-4 py-3 text-sm text-white transition hover:bg-blue-600/20"
            >
              Log in
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NavbarMobile;
