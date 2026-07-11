import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllServices } from "../api/serviceService";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetchAllServices();

        setServices(res.services);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        services,
        setServices,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => useContext(ServiceContext);
