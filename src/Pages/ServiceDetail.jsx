import { useParams, Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { SERVICES } from "../data/servicesData";

const ServiceDetails = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    const bookingData = {
      serviceName: service.title,
      estimatedCost: service.price,
      serviceTime: service.serviceTime,
      bookingId: `RMX-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    navigate("/booking-success", { state: bookingData });
  };
  const { serviceId } = useParams();

  const service = SERVICES.find(
    (s) => s.slug === serviceId // Slug match for safety and accuracy
  );

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-xl">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <Link
          to="/services"
          className="flex items-center justify-start gap-1 text-white hover:text-black/50 text-lg mb-6"
        >
          <IoIosArrowBack size={22} className="hover:text-black/50" /> Back to
          Services
        </Link>

        <div className="text-center mb-8">
          <img
            src={service.icon}
            alt={service.title}
            className="w-24 h-24 mx-auto rounded-full shadow-lg mb-4 bg-white/20 p-2"
          />
          <h1 className="text-3xl font-bold">{service.title}</h1>
          <p className="text-gray-300 mt-2">{service.description}</p>

          {/* 👇 New Cost & Time Info */}
          <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-300">
            <p className="bg-white/10 px-4 py-2 rounded-full shadow">
              💰 <span className="font-medium text-white">Starting at:</span> ₹
              {service.price}
            </p>
            <p className="bg-white/10 px-4 py-2 rounded-full shadow">
              ⏱️ <span className="font-medium text-white">Service Time:</span>{" "}
              {service.serviceTime}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-between px-6 md:px-20 text-sm text-gray-200 text-left">
          <div>
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">
              What's Included:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {service.included?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-indigo-200 mb-2">
              Common Issues We Fix:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {service.issues?.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleBooking}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full text-white font-semibold transition"
          >
            Book this Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
