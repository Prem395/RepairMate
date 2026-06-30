import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Layouts/Navbar";
import axios from "axios";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Mybookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const scrollRight = () => {
    const container = scrollRef.current;

    gsap.to(container, {
      scrollLeft: container.scrollLeft + 450,
      duration: 1.2,
      ease: "expo.out",
    });
  };

  const scrollLeft = () => {
    const container = scrollRef.current;

    gsap.to(container, {
      scrollLeft: container.scrollLeft - 450,
      duration: 1.2,
      ease: "expo.out",
    });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/my`,
          {
            withCredentials: true,
          },
        );

        setBookings(res.data.booking);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Failed to load bookings", {
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

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white pb-8">
      <Navbar />
      <div className="mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        <div className="rounded-3xl sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Recent Bookings
              </h2>

              <p className="text-sm text-slate-400">
                View and manage your repair requests
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="rounded-full border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:bg-white/10"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={scrollRight}
                className="rounded-full border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition hover:bg-white/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="
    flex flex-col
    md:flex-row
    gap-4
    md:gap-5
    md:overflow-x-auto
    hide-scrollbar
    pb-2
  "
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="
          w-full
          md:min-w-[420px]
          md:max-w-[420px]
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-4
          sm:p-6
          animate-pulse
        "
                  >
                    <div className="h-8 w-48 rounded-lg bg-white/10 shimmer" />

                    <div className="mt-3 h-5 w-32 rounded-lg bg-white/10 shimmer" />

                    <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                      <div className="flex justify-between">
                        <div className="h-4 w-20 rounded bg-white/10 shimmer" />
                        <div className="h-4 w-24 rounded bg-white/10 shimmer" />
                      </div>

                      <div className="flex justify-between">
                        <div className="h-4 w-16 rounded bg-white/10 shimmer" />
                        <div className="h-4 w-28 rounded bg-white/10 shimmer" />
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 p-4">
                      <div className="h-4 w-32 rounded bg-white/10 shimmer" />
                      <div className="mt-4 h-4 w-full rounded bg-white/10 shimmer" />
                      <div className="mt-2 h-4 w-5/6 rounded bg-white/10 shimmer" />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <div className="h-10 w-28 rounded-xl bg-white/10 shimmer" />
                      <div className="h-10 w-32 rounded-xl bg-white/10 shimmer" />
                    </div>
                  </div>
                ))
              : bookings.map((item) => (
                  <div
                    key={item._id}
                    className="
          w-full
          md:min-w-[420px]
          md:max-w-[420px]
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-white/[0.06]
          to-white/[0.03]
          p-4
          sm:p-6
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
          transition-all
          duration-300
          hover:border-blue-500/30
          hover:shadow-[0_0_40px_rgba(99,102,241,0.35),0_0_80px_rgba(59,130,246,0.2)]
        "
                  >
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                          {item.service}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : item.status === "Completed"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-2 text-slate-400">{item.deviceType}</p>
                    </div>

                    {/* Info */}
                    <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm text-slate-400">
                          Booking ID
                        </span>

                        <span className="font-medium text-blue-300">
                          {`RMX${item._id.slice(-6).toUpperCase()}`}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm text-slate-400">Created</span>

                        <span className="font-medium text-white">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Issue */}
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="mb-2 text-sm font-medium text-slate-400">
                        Issue Description
                      </p>

                      <p className="leading-relaxed text-slate-300">
                        {item.issueDescription}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium transition hover:bg-white/10">
                        View Details
                      </button>

                      <button className="w-full sm:w-auto rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20">
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mybookings;
