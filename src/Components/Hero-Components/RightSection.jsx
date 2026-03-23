import { AiTwotoneSafetyCertificate, AiFillThunderbolt } from "react-icons/ai";
import { GrUserExpert } from "react-icons/gr";
import Reviews from "./Reviews";

const RightSection = () => {
  return (
    <div className="flex w-full max-w-full flex-col gap-4 lg:w-[420px] lg:max-w-[420px]">
      {/* Features card */}
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/10 px-4 py-6 backdrop-blur-lg sm:px-6 sm:py-8">
        <div className="flex w-full flex-col gap-5 sm:gap-6">
          {/* Card 1 */}
          <div className="flex items-start gap-3 border-b border-white/20 pb-4 sm:items-center sm:gap-4">
            <GrUserExpert size={38} className="mt-1 text-white sm:mt-0 sm:pl-2" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                Expert Technicians
              </h3>
              <p className="text-xs leading-5 text-white/60">
                Certified professionals you can trust.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex items-start gap-3 border-b border-white/20 pb-4 sm:items-center sm:gap-4">
            <AiFillThunderbolt size={38} className="mt-1 text-white sm:mt-0" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white sm:text-lg">Fast Service</h3>
              <p className="text-xs leading-5 text-white/60">
                Quick response and turnaround on all bookings.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <AiTwotoneSafetyCertificate size={38} className="mt-1 text-white sm:mt-0" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                Guaranteed Safety
              </h3>
              <p className="text-xs leading-5 text-white/60">
                Secure handling and full-service assurance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews card */}
      <div className="flex min-h-[140px] w-full items-center rounded-2xl border border-white/5 bg-white/10 px-4 backdrop-blur-lg sm:px-6">
        <Reviews />
      </div>
    </div>
  );
};

export default RightSection;
