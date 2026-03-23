import Navbar from "../Components/Navbar";
import { useBookings } from "../context/BookingContext";
import { useLocomotivePage } from "../hooks/useLocomotivePage";

const statusClasses = {
  Pending: "bg-amber-400/15 text-amber-200 border-amber-300/20",
  Confirmed: "bg-blue-400/15 text-blue-200 border-blue-300/20",
  Completed: "bg-emerald-400/15 text-emerald-200 border-emerald-300/20",
  Cancelled: "bg-rose-400/15 text-rose-200 border-rose-300/20",
};

const AdminPanel = () => {
  const scrollRef = useLocomotivePage();
  const { bookings, removeBooking, updateBookingStatus } = useBookings();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((booking) => booking.status === "Pending").length;
  const completedBookings = bookings.filter((booking) => booking.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white pb-10">
      <Navbar />

      <div ref={scrollRef} data-scroll-container className="mx-auto mt-10 w-[92%] max-w-7xl">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Total bookings", totalBookings],
            ["Pending review", pendingBookings],
            ["Completed jobs", completedBookings],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">{label}</p>
              <p className="mt-4 text-4xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Admin Panel</p>
              <h1 className="mt-2 text-3xl font-bold">Booking management dashboard</h1>
            </div>
            <p className="max-w-2xl text-sm text-slate-300">
              Review customer requests, update statuses, or remove outdated demo bookings.
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 bg-black/20 px-6 py-12 text-center mt-6">
              <p className="text-xl font-semibold">No bookings yet</p>
              <p className="mt-2 text-sm text-slate-400">
                Sign in as a customer and create a booking to see it appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5">
              {bookings.map((booking) => (
                <article
                  key={booking.bookingId}
                  className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 shadow-lg"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:flex-1">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Booking ID</p>
                        <p className="mt-2 font-semibold">#{booking.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Customer</p>
                        <p className="mt-2 font-semibold">{booking.customerName}</p>
                        <p className="text-sm text-slate-400">{booking.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Service</p>
                        <p className="mt-2 font-semibold">{booking.serviceName}</p>
                        <p className="text-sm text-slate-400">{booking.serviceTime}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Issue</p>
                        <p className="mt-2 text-sm text-slate-300">{booking.issue}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 xl:w-[260px]">
                      <span
                        className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm ${statusClasses[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                      <p className="text-sm text-slate-400">Estimated cost: ₹{booking.estimatedCost}</p>
                      <p className="text-sm text-slate-400">Created: {booking.createdAt}</p>
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          updateBookingStatus(booking.bookingId, event.target.value)
                        }
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                      >
                        {["Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
                          <option key={status} value={status} className="bg-slate-900">
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeBooking(booking.bookingId)}
                        className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
                      >
                        Delete booking
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
