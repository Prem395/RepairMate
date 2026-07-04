import { Link } from "react-router-dom";
import { useLocomotivePage } from "../hooks/useLocomotivePage";
import Navbar from "../Components/Layouts/Navbar.jsx";
import { useServices } from "../context/serviceContext.jsx";

const Services = () => {
  const { services, loading } = useServices();
  const scrollRef = useLocomotivePage();

  if (loading) {
    return (
      <div
        className="min-h-screen text-white pb-8"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 60% 30%, #0b1e4a 0%, #060d24 55%, #03081a 100%)",
        }}
      >
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-1 mt-5">
          <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>

          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white pb-8">
      <Navbar />
      <div
        ref={scrollRef}
        data-scroll-container
        className="max-w-7xl mx-auto px-6 py-1 mt-5"
      >
        <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>

        {!loading && services.length === 0 && (
          <div className="text-center text-white mt-20">
            No services available
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => {
            return (
              <Link
                to={`/services/${service.slug}`}
                key={service.slug}
                className="hover:scale-105 transition"
              >
                <div className="bg-white/10 p-6 rounded-2xl w-full h-52 shadow-xl hover:bg-white/20 transition duration-300 border border-white/10">
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
