import { Link } from "react-router-dom";

import { SERVICES } from "../data/servicesData.js";
import { useLocomotivePage } from "../hooks/useLocomotivePage";
import Navbar from "../Components/Layouts/Navbar.jsx";

const Services = () => {
  const scrollRef = useLocomotivePage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white pb-8">
      <Navbar />
      <div
        ref={scrollRef}
        data-scroll-container
        className="max-w-7xl mx-auto px-6 py-1 mt-5"
      >
        <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            return (
              <Link
                to={`/services/${service.slug}`}
                key={service.slug}
                className="hover:scale-105 transition"
              >
                <div className="bg-white/10 p-6 rounded-2xl w-full h-52 shadow-lg hover:bg-white/20 transition duration-300">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-16 h-16 mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-gray-300">{service.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
