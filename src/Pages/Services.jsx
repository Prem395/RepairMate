import { Link } from "react-router-dom";
import { useLocomotivePage } from "../hooks/useLocomotivePage";
import Navbar from "../Components/Layouts/Navbar.jsx";
import { useServices } from "../context/ServiceContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { IndianRupee, MoreVertical } from "lucide-react";

const Services = () => {
  const { services, loading } = useServices();
  const scrollRef = useLocomotivePage();
  const { user } = useAuth();

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
    <div
      className="min-h-screen text-white pb-8"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 60% 30%, #0b1e4a 0%, #060d24 55%, #03081a 100%)",
      }}
    >
      <Navbar />

      <div
        ref={scrollRef}
        data-scroll-container
        className="max-w-7xl mx-auto px-6 py-1 mt-1"
      >
        <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>

        {user && user.role === "admin" && (
          <div className="flex justify-end mb-3">
            <Link
              to={`/create-service`}
              className="px-4 py-2 rounded-xl bg-transparent border border-white/10 hover:bg-white/10 transition text-sm font-medium"
            >
              + Create Service
            </Link>
          </div>
        )}

        {services.length === 0 && (
          <div className="text-center text-white mt-20">
            No services available
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <Link to={`/services/${service.slug}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="text-right ">
                      <p className="text-xs font-semibold flex justify-end items-center text-blue-300/70">
                        {`Starting ₹${service.price}`}
                      </p>
                      <p className="text-[10px] text-white/25 font-mono">
                        {service.serviceTime}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-white/90 mb-1">
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
