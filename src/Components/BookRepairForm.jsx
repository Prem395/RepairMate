import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiShield,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/AuthModalContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useBookingModal } from "../context/BookingModalContext";

const BookRepairForm = () => {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useModal();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  const { setIsBookingFormOpen, bookingData } =
    useBookingModal();
  const [imageFile, setimageFile] = useState(null);
  const [formData, setformData] = useState({
    customerName: "",
    deviceType: "",
    phoneNumber: "",
    issueDescription: "",
    imageUrl: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsBookingFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsBookingFormOpen]);

  const handChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("customerName", formData.customerName);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("deviceType", formData.deviceType);
      data.append("issueDescription", formData.issueDescription);

      if (bookingData?.title) {
        data.append("serviceType", bookingData.title);
      }

      if (imageFile && imageFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      if (imageFile) {
        data.append("imageUrl", imageFile);
      }

      console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/createbooking`,
        data,
        {
          withCredentials: true,
        },
      );

      setformData({
        customerName: "",
        deviceType: "",
        phoneNumber: "",
        issueDescription: "",
        imageUrl: "",
      });
      toast.success(response.data.message, {
        icon: "✅",
        position: "top-center",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(250,250,250,0.20)",
          borderRadius: "18px",
          padding: "12px 20px",
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "⚠️",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(239,68,68,0.15)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#06111f]/80 px-4  py-6 backdrop-blur-[10px]">
      <Motion.div
        ref={modalRef}
        initial={{ y: 24, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative flex w-[440px] max-h-[98vh] flex-col sm:mx-auto sm:w-full sm:max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1324]/95 text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:rounded-[34px]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -right-20 top-36 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.09),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_32%)]" />

        <button
          type="button"
          onClick={() => setIsBookingFormOpen(false)}
          className="absolute right-3 top-4 z-20 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10"
        >
          <FiX size={20} />
        </button>

        <div className="relative min-h-0 flex-1 overflow-y-auto">
          <section className="relative px-4 pt-4 pb-4 sm:px-7 sm:pt-7 sm:pb-5 md:px-8 md:pt-8 md:pb-5 lg:px-9 lg:pt-9 lg:pb-5">
            <div className="mb-1">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                Repair Details
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                Tell us what needs fixing
              </h3>

              {bookingData?.title && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-medium text-cyan-300">
                    {bookingData.title}
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 grid-cols-2">
                <label className="block min-w-0 space-y-1">
                  <span className="text-sm text-slate-300">Full Name</span>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handChange}
                    required
                    className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block min-w-0 space-y-1">
                  <span className="text-sm text-slate-300">Phone Number</span>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handChange}
                    required
                    className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                    placeholder="Contact No."
                  />
                </label>
              </div>

              <label className="block min-w-0 space-y-1">
                <span className="text-sm text-slate-300">
                  {bookingData?.title ? "Company Name" : "Device Type"}
                </span>
                <input
                  type="text"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handChange}
                  required
                  className="block w-full min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                  placeholder="Laptop, refrigerator, AC..."
                />
              </label>

              <label className="block min-w-0 space-y-1">
                <span className="text-sm text-slate-300">
                  Describe the Issue
                </span>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handChange}
                  className=" block  w-full min-w-0 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 pt-1 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] min-h-[80px] sm:min-h-[110px] [&::-webkit-scrollbar]:hidden "
                  placeholder="Tell us what is the issue, when it occurred, and any visible symptoms."
                />
              </label>

              <div className="pt-2.5">
                <label
                  htmlFor="repair-image"
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 transition group-hover:scale-105">
                      <FiUpload size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-white">
                        Upload Device Image
                      </p>
                      <p className="text-[11px] text-slate-400">
                        JPG, PNG up to 5 MB
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 mt-1 self-start rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-300 sm:self-auto">
                    Choose File
                  </span>

                  <input
                    onChange={(e) => {
                      setimageFile(e.target.files[0]);
                    }}
                    id="repair-image"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2 pt-3 sm:flex-row">
                {isAuthenticated ? (
                  <>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:brightness-110 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Booking"
                      )}
                    </button>

                    {!loading && (
                      <button
                        type="button"
                        onClick={() => setIsBookingFormOpen(false)}
                        className="w-full sm:w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:brightness-110"
                  >
                    Login to Submit
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </Motion.div>
    </div>
  );
};

export default BookRepairForm;
