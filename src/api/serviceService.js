import axiosInstance from "../utils/axiosInstance";

export const fetchAllServices = async () => {
  const { data } = await axiosInstance.get("/api/services");
  return data;
};

export const createNewService = async (serviceData) => {
  const { data } = await axiosInstance.post(
    "/api/create-service",
    serviceData,
    {
      withCredentials: true,
    },
  );
  return data;
};

export const fetchServiceById = async (serviceId) => {
  const { data } = await axiosInstance.get(`/api/services/${serviceId}`);
  return data;
};

export const updateServiceById = async (serviceId, serviceData) => {
  const { data } = await axiosInstance.patch(
    `/api/services/${serviceId}`,
    serviceData,
    {
      withCredentials: true,
    },
  );
  return data;
};

export const deleteServiceById = async (serviceId) => {
  const { data } = await axiosInstance.delete(`/api/services/${serviceId}`, {
    withCredentials: true,
  });
  return data;
};
