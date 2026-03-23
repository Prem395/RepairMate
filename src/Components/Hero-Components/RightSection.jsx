import { AiTwotoneSafetyCertificate, AiFillThunderbolt } from "react-icons/ai";
import { GrUserExpert } from "react-icons/gr";
import Reviews from "./Reviews";


const RightSection = () => {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-4 lg:w-[420px]">
      {/* Features card */}
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/10 px-6 py-8 backdrop-blur-lg">
        <div className="flex flex-col gap-6 w-full">
          {/* Card 1 */}
          <div className="flex items-center gap-4 border-b border-white/20 pb-4">
            <GrUserExpert size={48} className="text-white pl-2" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Expert Technicians
              </h3>
              <p className="text-xs text-white/60">
                Certified professionals you can trust.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex items-center gap-4 border-b border-white/20 pb-4">
            <AiFillThunderbolt size={48} className="text-white" />
            <div>
              <h3 className="text-lg font-semibold text-white">Fast Service</h3>
              <p className="text-xs text-white/60">
                Quick response and turnaround on all bookings.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex items-center gap-4">
            <AiTwotoneSafetyCertificate size={48} className="text-white" />
            <div>
              <h3 className="text-lg font-semibold text-white">
                Guaranteed Safety
              </h3>
              <p className="text-xs text-white/60">
                Secure handling and full-service assurance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews card */}
      <div className="flex min-h-[140px] w-full items-center rounded-2xl border border-white/5 bg-white/10 px-6 backdrop-blur-lg">
        <Reviews />
      </div>
    </div>
  );
};

export default RightSection;
