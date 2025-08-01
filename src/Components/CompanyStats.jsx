import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const CompanyStats = () => {
  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const target = statsRef.current; // ✅ Local reference

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.unobserve(target); // use local target instead of statsRef.current
        }
      },
      { threshold: 0.4 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target); // ✅ use local reference
      }
    };
  }, []);

  return (
    <div
      ref={statsRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12"
    >
      <div>
        <h3 className="text-3xl font-bold">
          {startCount && (
            <CountUp end={10000} duration={2.5} separator="," suffix="+" />
          )}
        </h3>
        <p className="text-gray-300">Happy Customers</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold">
          {startCount && <CountUp end={15} duration={3} suffix="+" />}
        </h3>
        <p className="text-gray-300">Cities Served</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold">
          {startCount && <CountUp end={99} duration={3} suffix="%" />}
        </h3>
        <p className="text-gray-300">Satisfaction Rate</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold">
          {startCount && <CountUp end={50} duration={3} suffix="+" />}
        </h3>
        <p className="text-gray-300">Expert Technicians</p>
      </div>
    </div>
  );
};

export default CompanyStats;
