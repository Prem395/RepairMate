import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext.jsx";
import { useModal } from "../context/AuthModalContext.jsx";
import { useServices } from "../context/ServiceContext.jsx";
import { useBookingModal } from "../context/BookingModalContext.jsx";
import AuthModal from "../Components/Auth/AuthModal.jsx";
import {
  Book,
  Loader2,
  LucideLoader2,
  MoreHorizontal,
  PenIcon,
  Trash2,
} from "lucide-react";
import { deleteServiceById } from "../api/serviceService.js";
import { successToast } from "../utils/toastConfig.js";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { services, setServices } = useServices();
  const { isAuthenticated, user } = useAuth();
  const { serviceId } = useParams();
  const bookingTimeoutRef = useRef(null);
  const { setIsBookingFormOpen, setBookingData } = useBookingModal();
  const { openAuthModal } = useModal();

  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        window.clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  const service = services.find((item) => item.slug === serviceId);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white gap-2">
        <LucideLoader2 size={40} className="animate-spin" />
        Loading service details...
      </div>
    );
  }

  const handleDeleteService = async (serviceId) => {
    try {
      const res = await deleteServiceById(serviceId);
      console.log(res);
      navigate("/services");
      successToast("Service deleted successfully!", "bottom-center");
      setServices((prev) =>
        prev.filter((service) => service._id !== serviceId),
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditService = (serviceId) => {
    navigate(`/create-service/${serviceId}`);
  };

  return (
    <div className="min-h-screen  px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl bg-blue-900/10 border border-white/10 p-8 shadow-xl backdrop-blur-lg">
        <div className="flex justify-between items-center mb-6 gap-3">
          <Link
            to="/services"
            className="flex items-center bg-white/10 justify-center  text-base text-slate-200 hover:bg-white/20 px-2 py-2 rounded-md"
          >
            <IoIosArrowBack size={20} />
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditService(service._id)}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <PenIcon size={18} />
                Edit
              </button>

              <button
                onClick={() => handleDeleteService(service._id)}
                className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 flex justify-center items-center gap-2"
              >
                <Trash2 color="rgba(248, 113, 113, 1)" size={18} />
                Delete
              </button>
            </div>
          )}
        </div>
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
          <div className="mt-10 text-center flex justify-center">
            <button
              onClick={() => {
                setBookingData({
                  title: service.title,
                  serviceTime: service.serviceTime,
                });
                setIsBookingFormOpen(true);
              }}
              className="bg-blue-600 shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] w-[50%] py-3 rounded-lg text-sm "
            >
              Book this Service
            </button>
          </div>
        ) : (
          <div className="mt-10 text-center">
            <button
              onClick={openAuthModal}
              className="bg-blue-600 shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] w-[50%] py-3 rounded-lg text-sm"
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
