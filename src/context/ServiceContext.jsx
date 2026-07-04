import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/services`
        );

        setServices(res.data.services);
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
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => useContext(ServiceContext);