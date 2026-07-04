import HeroSection from "../Components/Hero/HeroSection";
import Navbar from "../Components/Layouts/Navbar";
import { useLocomotivePage } from "../hooks/useLocomotivePage";

const Home = () => {
  const scrollRef = useLocomotivePage();

  return (
    <div className="min-h-screen w-full overflow-x-hidden  text-white">
      <Navbar />
      <main ref={scrollRef} data-scroll-container>
        <HeroSection />
      </main>
    </div>
  );
};

export default Home;
