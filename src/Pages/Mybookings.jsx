import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Layouts/Navbar";
import axios from "axios";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  X,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocomotivePage } from "../hooks/useLocomotivePage";

const Mybookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showConfirmId, setShowConfirmId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const pageScrollRef = useLocomotivePage();

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

  const handleCancel = async (bookingId) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}/cancel`,
        {},
        {
          withCredentials: true,
        },
      );
      setShowConfirmId(null);

      const updatedBooking = res.data.booking;

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking,
        ),
      );

      toast.success("Booking cancelled successfully", {
        icon: "✅",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(59,130,246,0.18)",
        },
      });
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to cancel booking", {
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
    }
  };

  return (
    <div
      className="min-h-screen text-white pb-10"
      style={{
        background:
          "radial-gradient(ellipse 100% 60% at 50% 0%, #0b1e4a 0%, #060d24 50%, #03081a 100%)",
      }}
    >
      <Navbar />

      {/* Page ambient glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,100,220,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        ref={pageScrollRef}
        data-scroll-container
        className="relative mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10"
      >
        {bookings?.length ? (
          <>
            {/* Outer container */}
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-7"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Container top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(130,180,255,0.3) 60%, transparent 100%)",
                }}
              />

              {/* Header */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-blue-300/50 mb-1">
                    My Bookings
                  </p>
                  <h2 className="text-xl font-semibold text-white">
                    Recent Bookings
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    View and manage your repair requests
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={scrollLeft}
                    className="rounded-full p-2.5 transition hover:scale-105 active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={scrollRight}
                    className="rounded-full p-2.5 transition hover:scale-105 active:scale-95"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div
                ref={scrollRef}
                className=" flex flex-col md:flex-row gap-4 md:gap-5 md:overflow-x-auto hide-scrollbar pb-2"
              >
                {bookings.map((item) => {
                  const canCancel =
                    item.status === "Pending" || item.status === "Confirmed";
                  const statusStyle =
                    item.status === "Pending"
                      ? {
                          color: "text-amber-300",
                          bg: "bg-amber-400/10",
                          border: "border-amber-400/30",
                        }
                      : item.status === "Completed"
                        ? {
                            color: "text-emerald-300",
                            bg: "bg-emerald-400/10",
                            border: "border-emerald-400/30",
                          }
                        : {
                            color: "text-rose-300",
                            bg: "bg-rose-400/10",
                            border: "border-rose-400/30",
                          };

                  return (
                    <div
                      key={item._id}
                      className="relative w-full md:min-w-[450px] md:max-w-[450px] rounded-2xl overflow-hidden transition-all duration-300 "
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.12)",
                        backdropFilter: "blur(24px)",
                      }}
                    >
                      {/* Top shimmer line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(130,180,255,0.35) 60%, transparent 100%)",
                        }}
                      />

                      {/* Header */}
                      <div className="px-5 pt-6 pb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-blue-300/60 mb-1">
                            Booking Details
                          </p>
                          <h2 className="text-white text-base font-semibold leading-tight">
                            {item.service}
                          </h2>
                        </div>
                        <span
                          className={`shrink-0 px-3 flex justify-center items-center gap-2 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${statusStyle.color} ${statusStyle.bg} ${statusStyle.border}`}
                        >
                          {" "}
                          {item.status}
                        </span>
                      </div>

                      {/* Divider */}
                      <div
                        className="mx-5 h-px"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      />

                      {/* Device + Customer */}
                      <div className="px-5 py-5 flex items-center gap-4">
                        <div className="relative shrink-0">
                          <div
                            className="w-14 h-14 rounded-xl overflow-hidden bg-blue-950"
                            style={{
                              boxShadow:
                                "0 0 0 1px rgba(130,180,255,0.15), 0 6px 16px rgba(0,0,0,0.5)",
                            }}
                          >
                            {item.deviceImage ? (
                              <img
                                src={item.deviceImage}
                                alt="Device"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-blue-300/40 text-2xl">
                                🖥
                              </div>
                            )}
                          </div>
                          <span
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide text-cyan-200 border border-cyan-400/25"
                            style={{
                              background: "rgba(6,20,50,0.9)",
                              backdropFilter: "blur(6px)",
                            }}
                          >
                            Device
                          </span>
                        </div>
                        <div className="pl-1 min-w-0">
                          <p className="text-[10px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                            Customer
                          </p>
                          <p className="text-white font-semibold text-sm leading-snug truncate">
                            {item.customerName || item.name || "—"}
                          </p>
                          <p className="text-blue-300/60 text-xs mt-0.5 truncate">
                            {item.deviceType}
                          </p>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="px-5 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Booking ID */}
                        <div
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5  "
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center shrink-0 text-cyan-300 text-xs">
                            #
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                              Booking ID
                            </p>
                            <p className="text-white/90 text-xs font-medium truncate">
                              RMX-{item._id.slice(-6).toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {/* Created At */}
                        <div
                          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0 text-violet-300 text-xs">
                            📅
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                              Created
                            </p>
                            <p className="text-white/90 text-xs font-medium truncate">
                              {new Date(item.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Issue Description */}
                      <div className="px-5 pt-2 pb-5">
                        <div
                          className="rounded-xl px-4 py-3"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <p className="text-[9px] font-medium tracking-widest uppercase text-blue-300/50 mb-1.5">
                            Issue Description
                          </p>
                          <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                            {item.issueDescription}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      {canCancel ? (
                        showConfirmId === item._id ? (
                          <div className="h-[70px] flex items-center justify-end py-3 px-4  gap-2 shrink-0">
                            <span className="text-white/50 text-xs">
                              Are you sure?
                            </span>
                            <button
                              onClick={() => setShowConfirmId(null)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/60 border border-white/10 hover:border-white/20 transition-all"
                            >
                              Keep
                            </button>
                            <button
                              onClick={() => handleCancel(item._id)}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                            >
                              Yes, Cancel
                            </button>
                          </div>
                        ) : (
                          <div className=" h-[70px] flex justify-end px-3 py-4">
                            <button
                              onClick={() => setShowConfirmId(item._id)}
                              className="shrink-0 flex items-center  gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/50 active:scale-95 transition-all duration-150"
                            >
                              <X size={12} strokeWidth={2.5} />
                              Cancel Booking
                            </button>
                          </div>
                        )
                      ) : item.status === "Cancelled" ? (
                        <div className="h-[70px] flex items-center justify-end py-3 px-4  gap-2 shrink-0">
                          <p className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 border border-slate-500/20 bg-slate-500/5">
                            <XCircle size={12} strokeWidth={2} />
                            Booking Cancelled
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-xl">
              <div className="mb-4 text-6xl">📋</div>

              <h2 className="text-2xl font-semibold text-white">
                No Bookings Yet
              </h2>

              <p className="mt-3 text-slate-400">
                You haven't created any repair requests yet. Start by booking a
                repair service.
              </p>

              <button
                onClick={() => navigate("/services")}
                className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Browse Services
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybookings;
