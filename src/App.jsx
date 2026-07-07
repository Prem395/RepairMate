import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import BookingSuccess from "./Pages/BookingSuccess";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import ServiceDetail from "./Pages/ServiceDetail";
import Mybookings from "./Pages/Mybookings";
import BookRepairForm from "./Components/BookRepairForm";
import { useBookingModal } from "./context/BookingModalContext";
import AdminAllBookings from "./Pages/AdminAllBookings";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";

const App = () => {
  const { isBookingFormOpen } = useBookingModal();
  return (
    <>
      <div
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 60% 30%, #0b1e4a 0%, #060d24 55%, #03081a 100%)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <Mybookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-bookings"
            element={
              <AdminRoute>
                <AdminAllBookings />
              </AdminRoute>
            }
          />
        </Routes>
        {isBookingFormOpen && <BookRepairForm />}
      </div>
    </>
  );
};

export default App;
