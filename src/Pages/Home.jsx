import HeroSection from "../Components/HeroSection";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white overflow-x-hidden">
      <div className="flex justify-center">
        <Navbar />
      </div>
      <HeroSection />
    </div>
  );
};

export default Home;
