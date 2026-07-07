import axiosInstance from "../utils/axiosInstance";

export const getAllUsersBookings = async () => {
  const { data } = await axiosInstance.get("/api/admin/bookings");
  return data;
};

export const updateBookingStatus = async (bookingId, newStatus) => {
  const { data } = await axiosInstance.patch(
    `/api/admin/bookings/${bookingId}`,
    { status: newStatus },
  );
  return data;
};

export const deleteBooking = async (bookingId) => {
  const { data } = await axiosInstance.delete(
    `/api/admin/bookings/${bookingId}`,
  );
  return data;
};
