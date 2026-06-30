import { FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { House, User, Wrench } from "lucide-react";

const NavbarMobile = ({ onClose, toggleAuth, handleLogout }) => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  return (
    <div className="fixed inset-0 z-[999] flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="relative flex h-full w-[300px] flex-col border-l border-white/10 bg-[#0b1020]/95 px-6 py-8 text-white backdrop-blur-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-white transition hover:text-blue-400"
        >
          <FiX size={24} />
        </button>

        {/* Nav Links */}
        <div className="mt-14 flex flex-col gap-5">
          <NavLink to="/" end onClick={onClose}>
            <span className="flex items-center gap-2">
              <House />
              Home
            </span>
          </NavLink>

          <NavLink to="/about" onClick={onClose}>
            <span className="flex items-center gap-2">
              <User />
              About
            </span>
          </NavLink>

          <NavLink to="/services" onClick={onClose}>
            <span className="flex items-center gap-2">
              <Wrench />
              Services
            </span>
          </NavLink>
        </div>

        {/* User Section */}
        {isAuthenticated && user ? (
          <>
            <div className="border-t border-white/10 mt-5" />
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Signed in as
              </p>

              <h3 className="mt-2 text-lg font-semibold text-blue-300">
                {user.firstName} {user.lastName}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-400">
                {user.email}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate("/my-bookings");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
                >
                  📋 My Bookings
                </button>

                <button
                  onClick={() => {
                    onClose();
                    handleLogout();
                  }}
                  className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 transition hover:bg-red-500/20"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </>
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

        {/* Footer */}
        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Need Help?
          </p>

          <p className="mt-2 text-sm text-slate-300">Contact Support</p>

          <a
            href="mailto:support@repairmate.com"
            className="text-sm text-blue-300 transition hover:text-blue-200"
          >
            support@repairmate.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
