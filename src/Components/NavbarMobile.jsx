import { FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarMobile = ({ onClose }) => {
  const { currentUser, openAuthModal, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex justify-end">
      <div className="relative h-full w-[280px] border border-white/10 bg-black/55 px-6 py-8 text-white shadow-xl backdrop-blur-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-blue-400"
        >
          <FiX size={24} />
        </button>

        <div className="mt-12 flex flex-col gap-6 text-lg font-medium">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "text-left text-blue-400" : "text-left hover:text-blue-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "text-left text-blue-400" : "text-left hover:text-blue-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "text-left text-blue-400" : "text-left hover:text-blue-400"
            }
          >
            Services
          </NavLink>
          {currentUser?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "text-left text-blue-400" : "text-left hover:text-blue-400"
              }
            >
              Admin Panel
            </NavLink>
          )}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          {currentUser ? (
            <>
              <p className="font-semibold">{currentUser.name}</p>
              <p className="mt-1 text-sm text-slate-300 capitalize">{currentUser.role}</p>
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                openAuthModal({ mode: "signin", redirectTo: window.location.pathname });
              }}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold"
            >
             Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
