import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext.jsx";
import { useModal } from "../context/AuthModalContext.jsx";
import { useServices } from "../context/serviceContext.jsx";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { services } = useServices();
  const { isAuthenticated } = useAuth();
  const { serviceId } = useParams();
  const [isBooking, setIsBooking] = useState(false);
  const bookingTimeoutRef = useRef(null);
  const { openAuthModal } = useModal();

  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) {
        window.clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  const service = services.find((item) => item.slug === serviceId);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-xl">Service not found</p>
      </div>
    );
  }

  const handleBooking = () => {
    const booking = {
      serviceName: service.title,
      estimatedCost: service.price,
      serviceTime: service.serviceTime,
      bookingId: `RMX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: "Guest Customer",
      customerEmail: "guest@repairmate.demo",
      issue: service.issues?.[0] || "General repair request",
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setIsBooking(true);

    bookingTimeoutRef.current = window.setTimeout(() => {
      navigate("/booking-success", { state: booking });
    }, 1400);
  };

  return (
    <div className="min-h-screen  px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg">
        <Link
          to="/services"
          className="mb-6 flex items-center justify-start gap-1 text-lg text-white hover:text-black/50"
        >
          <IoIosArrowBack size={22} className="hover:text-black/50" /> Back to
          Services
        </Link>

        <div className="mb-8 text-center">
          <img
            src={service.icon}
            alt={service.title}
            className="mx-auto mb-4 h-24 w-24 rounded-full bg-white/20 p-2 shadow-lg"
          />
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="mt-2 text-gray-300">{service.description}</p>

          <div className="mt-4 flex flex-col items-center justify-center gap-6 text-sm text-gray-300 sm:flex-row">
            <p className="rounded-full bg-white/10 px-4 py-2 shadow">
              <span className="font-medium text-white">Starting at:</span> Rs.{" "}
              {service.price}
            </p>
            <p className="rounded-full bg-white/10 px-4 py-2 shadow">
              <span className="font-medium text-white">Service Time:</span>{" "}
              {service.serviceTime}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 px-6 text-left text-sm text-gray-200 md:flex-row md:px-20">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-indigo-200">
              What's Included:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {service.included?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-indigo-200">
              Common Issues We Fix:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {service.issues?.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="mt-10 text-center">
            <button
              onClick={handleBooking}
              disabled={isBooking}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-500/70"
            >
              {isBooking ? "Processing Booking..." : "Book this Service"}
            </button>
          </div>
        ) : (
          <div className="mt-10 text-center">
            <button
              onClick={openAuthModal}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-500/70"
            >
              Login to Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
