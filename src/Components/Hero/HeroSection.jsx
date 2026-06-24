import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HeroSection = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:flex-nowrap lg:gap-10 lg:px-8 lg:py-14">
      <div className="flex w-full flex-wrap items-start justify-between gap-6 lg:flex-nowrap lg:items-center lg:gap-12">
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
};

export default HeroSection;
