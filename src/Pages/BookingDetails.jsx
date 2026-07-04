
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Layouts/Navbar";
import {
  Phone,
  Calendar,
  Hash,
  FileText,
  X,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
} from "lucide-react";

const statusConfig = {
  Pending: {
    icon: Clock,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  Confirmed: {
    icon: CheckCircle,
    color: "text-blue-300",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
  },
  Completed: {
    icon: CheckCircle,
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  Cancelled: {
    icon: XCircle,
    color: "text-rose-300",
    bg: "bg-rose-400/10",
    border: "border-rose-400/30",
  },
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/${id}`,
          { withCredentials: true },
        );
        setBooking(res.data.booking);
        if (res.data.booking.status === "Cancelled") setCancelled(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${id}/cancel`,
        {},
        { withCredentials: true },
      );
      setCancelled(true);
      setShowConfirm(false);
      setBooking((prev) => ({ ...prev, status: "Cancelled" }));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen text-white"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 60% 30%, #0b1e4a 0%, #060d24 55%, #03081a 100%)",
        }}
      >
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
        </div>
      </div>
    );
  }

  const st = statusConfig[booking.status] || statusConfig["Pending"];
  const StatusIcon = st.icon;
  const canCancel =
    !cancelled &&
    (booking.status === "Pending" || booking.status === "Confirmed");

  return (
    <div
      className="min-h-screen w-full text-white pb-10"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 60% 30%, #0b1e4a 0%, #060d24 55%, #03081a 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Navbar />

      {/* Ambient glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56,100,220,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto mt-6 sm:mt-10 max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-0">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-1.5 text-xs text-blue-300/50 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          Back to bookings
        </button>

        {/* Card */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.12)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(130,180,255,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Header */}
          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-blue-300/60 mb-1">
                Booking Details
              </p>
              <h2 className="text-white text-lg sm:text-xl font-semibold leading-tight">
                {booking.service || "View Details"}
              </h2>
            </div>

            <span
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${st.color} ${st.bg} ${st.border}`}
            >
              <StatusIcon size={12} strokeWidth={2.5} />
              {booking.status}
            </span>
          </div>

          {/* Divider */}
          <div
            className="mx-5 sm:mx-6 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* Device image + Customer */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-blue-950"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(130,180,255,0.15), 0 8px 20px rgba(0,0,0,0.5)",
                }}
              >
                {booking.imageUrl ? (
                  <img
                    src={booking.imageUrl}
                    alt="Device"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-300/30 text-2xl">
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
              <p className="text-white font-semibold text-base sm:text-lg leading-snug truncate">
                {booking.customerName}
              </p>
              <p
                className="text-blue-300/60 text-xs mt-0.5 truncate"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {booking.phoneNumber}
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="px-5 sm:px-6 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Phone — full width */}
            <div
              className="col-span-2 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                <Phone size={14} className="text-blue-300" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                  Phone Number
                </p>
                <p
                  className="text-white/90 text-sm font-medium truncate"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {booking.phoneNumber}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
                <Calendar
                  size={14}
                  className="text-violet-300"
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                  Created At
                </p>
                <p className="text-white/90 text-sm font-medium truncate">
                  {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  <br />
                  <span className="text-white/50 text-xs">
                    {new Date(booking.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>
            </div>

            {/* Booking ID */}
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center shrink-0">
                <Hash size={14} className="text-cyan-300" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-widest uppercase text-blue-300/50 mb-0.5">
                  Booking ID
                </p>
                <p
                  className="text-white/90 text-sm font-medium truncate"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  RMX-{booking._id.slice(-6).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Issue description */}
          <div className="px-5 sm:px-6 pt-2.5 sm:pt-3 pb-4 sm:pb-5">
            <div
              className="rounded-xl px-4 py-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-md bg-rose-500/15 flex items-center justify-center shrink-0">
                  <FileText
                    size={12}
                    className="text-rose-300"
                    strokeWidth={2}
                  />
                </div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-blue-300/50">
                  Issue Description
                </p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {booking.issueDescription}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-5 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p
              className="text-white/30 text-[11px] sm:text-xs truncate"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {booking._id}
            </p>

            {canCancel ? (
              showConfirm ? (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-white/50 text-xs">Are you sure?</span>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/60 border border-white/10 hover:border-white/20 transition-all"
                  >
                    Keep
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                  >
                    Yes, Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-rose-300 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/50 active:scale-95 transition-all duration-150"
                >
                  <X size={12} strokeWidth={2.5} />
                  Cancel Booking
                </button>
              )
            ) : cancelled ? (
              <span className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-rose-400/60 border border-rose-500/20 bg-rose-500/5">
                <XCircle size={12} strokeWidth={2} />
                Booking Cancelled
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
