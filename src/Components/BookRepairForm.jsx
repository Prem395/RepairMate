import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";

const BookRepairForm = ({ setIsFormOpen }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { currentUser, openAuthModal } = useAuth();
  const { addBooking } = useBookings();
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || "",
    customerEmail: currentUser?.email || "",
    deviceType: "",
    issue: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsFormOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentUser) {
      setIsFormOpen(false);
      openAuthModal({ mode: "signin", redirectTo: "/" });
      return;
    }

    const booking = {
      bookingId: `RMX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      serviceName: formData.deviceType,
      estimatedCost: "Custom Quote",
      serviceTime: "Technician review required",
      issue: formData.issue,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      userId: currentUser.id,
    };

    addBooking(booking);
    setIsFormOpen(false);
    navigate("/booking-success", { state: booking });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
      <Motion.div
        ref={modalRef}
        initial={{ y: 24, opacity: 0, scale: 0.96 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

        <button
          type="button"
          onClick={() => setIsFormOpen(false)}
          className="absolute right-2 top-[12px] z-10  rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
        >
          <FiX size={20} />
        </button>

        <div className="grid gap-0 md:grid-cols-[0.82fr_1.18fr]">
          <section className="border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 p-6 md:border-b-0 md:border-r">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Quick Request
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              Book a repair in under a minute
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Share your device and the issue you are facing. We will save the
              request and surface it in the dashboard right away.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Fast booking flow with just a few details",
                "Works for appliances, gadgets, and general repair requests",
                currentUser
                  ? `Signed in as ${currentUser.name}`
                  : "Sign in to store your request in your account",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 md:p-7">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <label className="block min-w-0 space-y-2">
                  <span className="text-sm text-slate-300">Full Name</span>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block min-w-0 space-y-2">
                  <span className="text-sm text-slate-300">Email Address</span>
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block min-w-0 space-y-2">
                <span className="text-sm text-slate-300">Device Type</span>
                <input
                  type="text"
                  name="deviceType"
                  required
                  value={formData.deviceType}
                  onChange={handleChange}
                  className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Laptop, refrigerator, AC, washing machine..."
                />
              </label>

              <label className="block min-w-0 space-y-2">
                <span className="text-sm text-slate-300">
                  Describe the Issue
                </span>
                <textarea
                  rows="5"
                  name="issue"
                  required
                  value={formData.issue}
                  onChange={handleChange}
                  className="block w-full min-w-0 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                  placeholder="Tell us what is happening, when it started, and any visible symptoms."
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold tracking-wide text-white shadow-lg transition hover:bg-blue-700"
              >
                {currentUser ? "Submit Repair Request" : "Sign In to Continue"}
              </button>
            </form>
          </section>
        </div>
      </Motion.div>
    </div>
  );
};

export default BookRepairForm;
