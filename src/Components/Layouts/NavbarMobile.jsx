import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavbarMobile = ({ onClose, toggleAuth, handleLogout }) => {
  const { user, isAuthenticated } = useAuth();
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
              isActive
                ? "text-left text-blue-400"
                : "text-left hover:text-blue-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "text-left text-blue-400"
                : "text-left hover:text-blue-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "text-left text-blue-400"
                : "text-left hover:text-blue-400"
            }
          >
            Services
          </NavLink>
        </div>

        {isAuthenticated && user ? (
          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-2 ">
            <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 flex justify-center items-center">
              <span className="text-sm  font-medium text-blue-300">
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
          <div className="mt-10 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={toggleAuth}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;
