import { Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import ServiceDetail from "./Pages/ServiceDetail";
import BookingSuccess from "./Pages/BookingSuccess";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </>
  );
};

export default App;
