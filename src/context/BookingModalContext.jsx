import { createContext, useContext, useState } from "react";

const BookingModalContext = createContext();

export const BookingModalProvider = ({ children }) => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const value = {
    isBookingFormOpen,
    setIsBookingFormOpen,
    setBookingData,
    bookingData,
  };

  return (
    <BookingModalContext.Provider value={value}>
      {children}
    </BookingModalContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useBookingModal = () => useContext(BookingModalContext);
