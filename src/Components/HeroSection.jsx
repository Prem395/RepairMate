import LeftSection from "./Hero-Components/LeftSection";
import RightSection from "./Hero-Components/RightSection";

const HeroSection = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-10 px-4 py-10 sm:px-6 lg:flex-nowrap lg:px-8 lg:py-14">
      <div className="flex w-full flex-wrap items-center justify-between gap-8 lg:flex-nowrap lg:gap-12">
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
};

export default HeroSection;
