import { Link } from "react-router-dom";

const NavbarMobile = ({ onClose }) => {
  return (
    <>
      <div className="fixed top-[80px] right-0 w-[150px] mx-7 mt-5 px-6 py-6 z-[999] bg-white/10 backdrop-blur-lg text-white shadow-xl flex flex-col gap-5 justify-center items-center rounded-xl border-2 border-white/10 md:hidden">
        <Link
          to="/"
          onClick={onClose}
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={onClose}
          className="hover:text-blue-400 transition"
        >
          About
        </Link>
        <Link
          to="/services"
          onClick={onClose}
          className="hover:text-blue-400 transition"
        >
          Services
        </Link>
      </div>
    </>
  );
};

export default NavbarMobile;
