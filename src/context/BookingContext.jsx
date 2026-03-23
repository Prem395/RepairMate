/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);
const BOOKINGS_STORAGE_KEY = "repairmate_bookings";

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);

    if (!storedBookings) return;

    try {
      setBookings(JSON.parse(storedBookings));
    } catch {
      localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    }
  }, []);

  const persistBookings = (nextBookings) => {
    setBookings(nextBookings);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(nextBookings));
  };

  const addBooking = (booking) => {
    const nextBookings = [booking, ...bookings];
    persistBookings(nextBookings);
  };

  const updateBookingStatus = (bookingId, status) => {
    const nextBookings = bookings.map((booking) =>
      booking.bookingId === bookingId ? { ...booking, status } : booking
    );
    persistBookings(nextBookings);
  };

  const removeBooking = (bookingId) => {
    const nextBookings = bookings.filter((booking) => booking.bookingId !== bookingId);
    persistBookings(nextBookings);
  };

  const value = { bookings, addBooking, removeBooking, updateBookingStatus };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBookings = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }

  return context;
};
