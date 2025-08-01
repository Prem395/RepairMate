import { AiTwotoneSafetyCertificate, AiFillThunderbolt } from "react-icons/ai";
import { GrUserExpert } from "react-icons/gr";
import Reviews from "./Reviews";


const RightSection = () => {
  return (
    <div className="w-full lg:w-[420px] flex flex-col gap-4 lg:m-20">
      {/* Features card */}
      <div className="w-full flex flex-col justify-center items-center border-2 border-white/5 bg-white/10 backdrop-blur-lg rounded-lg py-8 px-6">
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
      <div className="w-full min-h-[140px] flex items-center border-2 border-white/5 bg-white/10 backdrop-blur-lg rounded-lg px-6">
        <Reviews />
      </div>
    </div>
  );
};

export default RightSection;
