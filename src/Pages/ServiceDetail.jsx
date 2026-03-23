import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { SERVICES } from "../data/servicesData.js";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { currentUser, openAuthModal } = useAuth();
  const { addBooking } = useBookings();
  const [isBooking, setIsBooking] = useState(false);
  const bookingTimeoutRef = useRef(null);

  const service = SERVICES.find((item) => item.slug === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl">Service not found</p>
      </div>
    );
  }

  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) {
        window.clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  const handleBooking = () => {
    if (!currentUser) {
      openAuthModal({ mode: "signin", redirectTo: `/services/${serviceId}` });
      return;
    }

    if (isBooking) {
      return;
    }

    const booking = {
      serviceName: service.title,
      estimatedCost: service.price,
      serviceTime: service.serviceTime,
      bookingId: `RMX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      issue: service.issues?.[0] || "General repair request",
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      userId: currentUser.id,
    };

    addBooking(booking);
    setIsBooking(true);

    bookingTimeoutRef.current = window.setTimeout(() => {
      navigate("/booking-success", { state: booking });
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <Link
          to="/services"
          className="flex items-center justify-start gap-1 text-white hover:text-black/50 text-lg mb-6"
        >
          <IoIosArrowBack size={22} className="hover:text-black/50" /> Back to Services
        </Link>

        <div className="text-center mb-8">
          <img
            src={service.icon}
            alt={service.title}
            className="w-24 h-24 mx-auto rounded-full shadow-lg mb-4 bg-white/20 p-2"
          />
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="text-gray-300 mt-2">{service.description}</p>

          <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-300">
            <p className="bg-white/10 px-4 py-2 rounded-full shadow">
              💰 <span className="font-medium text-white">Starting at:</span> ₹{service.price}
            </p>
            <p className="bg-white/10 px-4 py-2 rounded-full shadow">
              ⏱️ <span className="font-medium text-white">Service Time:</span> {service.serviceTime}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-between px-6 md:px-20 text-sm text-gray-200 text-left">
          <div>
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">What's Included:</h3>
            <ul className="list-disc list-inside space-y-1">
              {service.included?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">Common Issues We Fix:</h3>
            <ul className="list-disc list-inside space-y-1">
              {service.issues?.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-5 text-center text-sm text-slate-300">
          {currentUser
            ? `Booking as ${currentUser.name}. Your request will be submitted right away.`
            : "Please sign in first to confirm this booking and store it in the dashboard."}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-500/70"
          >
            {isBooking
              ? "Processing Booking..."
              : currentUser
                ? "Book this Service"
                : "Sign In to Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
