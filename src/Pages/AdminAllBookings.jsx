import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Wrench,
  Cpu,
  FileText,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  Hash,
  Shield,
  User,
  Eye,
  Search,
  SlidersHorizontal,
  Trash2Icon,
} from "lucide-react";
import Navbar from "../Components/Layouts/Navbar";
import {
  deleteBooking,
  getAllUsersBookings,
  updateBookingStatus,
} from "../api/adminService";
import { successToast } from "../utils/toastConfig";

const STATUS_CFG = {
  Pending: {
    color: "text-amber-300",
    bg: "bg-amber-500/12",
    border: "border-amber-500/25",
    dot: "bg-amber-400",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Confirmed: {
    color: "text-blue-300",
    bg: "bg-blue-500/12",
    border: "border-blue-500/25",
    dot: "bg-blue-400",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  "In Progress": {
    color: "text-violet-300",
    bg: "bg-violet-500/12",
    border: "border-violet-500/25",
    dot: "bg-violet-400",
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  },
  Completed: {
    color: "text-emerald-300",
    bg: "bg-emerald-500/12",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Cancelled: {
    color: "text-rose-300",
    bg: "bg-rose-500/12",
    border: "border-rose-500/25",
    dot: "bg-rose-400",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const ALL_STATUSES = [
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

const AdminAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await getAllUsersBookings();
        setBookings(res.bookings);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllBookings();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
    setOpenDropdown(null);
    try {
      await updateBookingStatus(bookingId, newStatus);
      successToast("Booking status updated", "bottom-center");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await deleteBooking(bookingId);
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId),
      );
      successToast(
        res.message || "Booking deleted successfully.",
        "bottom-center",
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const counts = ALL_STATUSES.reduce((result, status) => {
    result[status] = bookings.filter(
      (booking) => booking.status === status,
    ).length;
    return result;
  }, {});

  const visible = bookings.filter((booking) => {
    const matchFilter = filter === "All" || booking.status === filter;
    const query = search.toLowerCase();
    const matchSearch =
      !query ||
      booking.customerName?.toLowerCase().includes(query) ||
      booking.deviceType?.toLowerCase().includes(query) ||
      booking.service?.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -bottom-48 left-1/3 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400/50" />
            <span className="text-[11px] text-blue-300/40 uppercase tracking-widest font-mono">
              Admin Panel
            </span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                All Bookings
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {bookings.length} total bookings · {counts["In Progress"] ?? 0}{" "}
                in progress
              </p>
            </div>
            <div
              className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 w-64"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer, device…"
                className="bg-transparent text-sm text-white placeholder-slate-600 outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 mr-1" />
          {["All", ...ALL_STATUSES].map((label) => {
            const cfg = label !== "All" ? STATUS_CFG[label] : null;
            const active = filter === label;
            const count =
              label === "All" ? bookings.length : (counts[label] ?? 0);
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                  active
                    ? cfg
                      ? `${cfg.color} ${cfg.bg} ${cfg.border}`
                      : "border-white/20 bg-white/10 text-white"
                    : "border-white/8 bg-white/[0.03] text-slate-500 hover:text-slate-300 hover:bg-white/6"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${active ? "bg-white/15" : "bg-white/5 text-slate-600"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((booking) => {
              const cfg = STATUS_CFG[booking.status];
              const isExpanded = expandedCards[booking._id] || false;
              const isOpen = openDropdown === booking._id;

              return (
                <div
                  key={booking._id}
                  className="relative flex flex-col rounded-3xl transition-all duration-300  "
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow:
                      "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-60 ${cfg.dot}`}
                  />

                  {/* Header */}
                  <div
                    className="px-6 pt-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Hash className="w-3 h-3 text-blue-400/35 flex-shrink-0" />
                          <span className="font-mono text-[10px] text-blue-300/35">
                            RMX-{booking._id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-white leading-tight truncate">
                          {booking.customerName}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Cpu className="w-3 h-3 text-slate-500" />
                          <span className="text-xs text-slate-400">
                            {booking.deviceType}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cfg.color} ${cfg.bg} ${cfg.border}`}
                      >
                        {cfg.icon}
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="px-6 py-4 grid grid-cols-2 gap-2.5">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Wrench className="w-3 h-3 text-blue-400/50" />
                        <p className="text-[9px] uppercase tracking-widest text-slate-500">
                          Service
                        </p>
                      </div>
                      <p className="text-sm font-medium text-white/90 leading-snug">
                        {booking.service}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Phone className="w-3 h-3 text-blue-400/50" />
                        <p className="text-[9px] uppercase tracking-widest text-slate-500">
                          Phone
                        </p>
                      </div>
                      <p className="text-sm font-medium text-white/90 font-mono leading-snug">
                        {booking.phoneNumber}
                      </p>
                    </div>
                  </div>

                  {/* Issue description */}
                  <div className="px-6 pb-4">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <FileText className="w-3 h-3 text-blue-400/50" />
                        <p className="text-[9px] uppercase tracking-widest text-slate-500">
                          Issue Description
                        </p>
                      </div>
                      <p
                        className={`text-sm text-slate-300/80 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}
                      >
                        {booking.issueDescription}
                      </p>
                      {booking.issueDescription?.length > 100 && (
                        <button
                          onClick={() =>
                            setExpandedCards((prev) => ({
                              ...prev,
                              [booking._id]: !prev[booking._id],
                            }))
                          }
                          className="mt-1.5 text-[11px] text-blue-400/60 hover:text-blue-300 transition-colors cursor-pointer"
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-auto px-6 py-4 flex items-center justify-between gap-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div>
                      <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">
                        Submitted
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Status dropdown — inline, no sub-component */}
                      <div
                        ref={isOpen ? dropdownRef : null}
                        className="relative"
                      >
                        <button
                          onClick={() =>
                            setOpenDropdown(isOpen ? null : booking._id)
                          }
                          className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer hover:brightness-110 ${cfg.color} ${cfg.bg} ${cfg.border}`}
                        >
                          {cfg.icon}
                          {booking.status}
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <div
                            className="absolute bottom-full mb-2 left-0 z-50 w-44 overflow-hidden rounded-2xl"
                            style={{
                              background: "rgba(6,15,50,0.92)",
                              backdropFilter: "blur(30px)",
                              WebkitBackdropFilter: "blur(30px)",
                              border: "1px solid rgba(255,255,255,0.11)",
                              boxShadow: "0 24px 60px rgba(0,0,0,0.65)",
                            }}
                          >
                            {ALL_STATUSES.map((s) => {
                              const c = STATUS_CFG[s];
                              return (
                                <button
                                  key={s}
                                  onClick={() =>
                                    handleStatusChange(booking._id, s)
                                  }
                                  className={`flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors duration-100 ${
                                    booking.status === s
                                      ? `${c.color} ${c.bg}`
                                      : "text-white/55 hover:bg-white/5 hover:text-white/85"
                                  }`}
                                >
                                  <span
                                    className={
                                      booking.status === s
                                        ? c.color
                                        : "text-white/25"
                                    }
                                  >
                                    {c.icon}
                                  </span>
                                  {s}
                                  {booking.status === s && (
                                    <CheckCircle2 className="ml-auto w-3 h-3 opacity-50" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          handleDeleteBooking(booking._id);
                        }}
                        className="flex items-center gap-1.5 rounded-xl border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs text-blue-300/80 transition-all duration-150 hover:bg-blue-500/15 hover:text-blue-200 cursor-pointer"
                      >
                        <Trash2Icon className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <User className="w-10 h-10 text-slate-700 mb-3" />
            <p className="text-slate-500 text-sm">
              No bookings match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllBookings;
