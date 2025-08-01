import LeftSection from "./Hero-Components/LeftSection";
import RightSection from "./Hero-Components/RightSection";

const HeroSection = () => {
  return (
    <main className="w-full  flex justify-between items-center px-6 gap-6 flex-wrap lg:flex-nowrap p-20">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 w-full max-w-[1280px] items-center mt-[-80px]">
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
};

export default HeroSection;
