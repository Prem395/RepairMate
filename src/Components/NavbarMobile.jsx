import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const NavbarMobile = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex justify-end">
      <div className="w-[250px] h-full bg-[#0f172a] text-white px-6 py-8 relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-blue-400"
        >
          <FiX size={24} />
        </button>

        <div className="mt-12 flex flex-col gap-6 text-lg font-medium">
          <Link to="/" onClick={onClose} className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" onClick={onClose} className="hover:text-blue-400">
            About
          </Link>
          <Link
            to="/services"
            onClick={onClose}
            className="hover:text-blue-400"
          >
            Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
