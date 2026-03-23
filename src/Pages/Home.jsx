import HeroSection from "../Components/HeroSection";
import Navbar from "../Components/Navbar";
import { useLocomotivePage } from "../hooks/useLocomotivePage";

const Home = () => {
  const scrollRef = useLocomotivePage();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white">
      <Navbar />
      <main ref={scrollRef} data-scroll-container>
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;
