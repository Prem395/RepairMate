import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const BookRepairForm = ({ setIsFormOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsFormOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsFormOpen]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-3xl p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl text-white"
      >
        <button
          onClick={() => setIsFormOpen(false)}
          className="absolute top-5 right-5 text-white hover:text-red-500 transition"
        >
          <FiX size={26} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
          Book a Repair
        </h2>

        <form className="space-y-6">
          {["Full Name", "Email Address", "Device Type"].map((label, i) => (
            <div key={i} className="relative group">
              <input
                type="text"
                required
                placeholder=""
                className="w-full bg-transparent border border-white/30 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent transition"
              />
              <label className="absolute left-4 top-3 text-sm text-white/60 transition-all group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-blue-400">
                {label}
              </label>
            </div>
          ))}

          <div className="relative group">
            <textarea
              rows="4"
              required
              className="w-full bg-transparent border border-white/30 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent transition"
              placeholder=""
            />
            <label className="absolute left-4 top-3 text-sm text-white/60 transition-all group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-blue-400">
              Describe the Issue
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold tracking-wide shadow-lg transition"
          >
            Submit Request
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookRepairForm;
