import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import ServiceDetail from "./Pages/ServiceDetail";
import Mybookings from "./Pages/Mybookings";
import BookRepairForm from "./Components/BookRepairForm";
import { useBookingModal } from "./context/BookingModalContext";
import AdminAllBookings from "./Pages/AdminAllBookings";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";
import PageNotFound from "./Pages/PageNotFound";
import CreateOrEditService from "./Pages/CreateOrEditService";

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
          <Route
            path="/create-service/:id"
            element={
              <AdminRoute>
                <CreateOrEditService />
              </AdminRoute>
            }
          />
          <Route
            path="/create-service"
            element={
              <AdminRoute>
                <CreateOrEditService />
              </AdminRoute>
            }
          />
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {isBookingFormOpen && <BookRepairForm />}
      </div>
    </>
  );
};

export default App;
