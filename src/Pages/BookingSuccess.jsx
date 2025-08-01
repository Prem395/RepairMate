import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="text-white p-10">Invalid Booking.</div>;

  const { serviceName, estimatedCost, serviceTime, bookingId } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-indigo-900 flex items-center justify-center px-4 py-10 text-white">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-md w-full text-center p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse rounded-t-3xl" />
        
        <IoCheckmarkCircleOutline size={72} className="text-green-400 mx-auto mb-4 drop-shadow-xl" />
        <h2 className="text-3xl font-bold mb-1">Booking Confirmed!</h2>
        <p className="text-gray-300 mb-6 text-sm">Thanks for trusting RepairMate. We’ll take it from here!</p>

        <div className="bg-black/30 rounded-xl p-5 text-left text-sm space-y-3">
          <div>
            <span className="block text-xs text-gray-400">Booking ID</span>
            <span className="text-white font-semibold tracking-wide">#{bookingId}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400">Service</span>
            <span className="text-white font-semibold">{serviceName}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400">Estimated Cost</span>
            <span className="text-white font-semibold">₹{estimatedCost}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400">Service Time</span>
            <span className="text-white font-semibold">{serviceTime}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
