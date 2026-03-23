import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import AdminPanel from "./Pages/AdminPanel";
import AuthPage from "./Pages/AuthPage";
import BookingSuccess from "./Pages/BookingSuccess";
import AuthModal from "./Components/AuthModal";
import { useAuth } from "./context/AuthContext";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import ServiceDetail from "./Pages/ServiceDetail";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const authRequest = location.state?.authModal;

    if (!authRequest) {
      return;
    }

    openAuthModal(authRequest);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, openAuthModal]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <AuthModal />
    </>
  );
};

export default App;
