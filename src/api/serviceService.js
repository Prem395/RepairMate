import axiosInstance from "../utils/axiosInstance";

export const fetchAllServices = async () => {
  const { data } = await axiosInstance.get("/api/services");
  return data;
};
