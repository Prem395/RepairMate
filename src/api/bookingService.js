import axiosInstance from "../utils/axiosInstance";

export const createBooking = async (formData) => {
  const { data } = await axiosInstance.post("/api/createbooking", formData, {
    withCredentials: true,
  });
  return data;
};

export const getMyBookings = async () => {
  const { data } = await axiosInstance.get("/api/bookings/my");
  return data;
};

export const cancelBooking = async (bookingId) => {
  const { data } = await axiosInstance.delete(`/api/bookings/${bookingId}`);
  return data;
};
