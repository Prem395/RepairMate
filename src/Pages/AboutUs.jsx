import React from "react";
import Navbar from "../Components/Navbar";
import CountUp from "react-countup";
import CompanyStats from "../Components/CompanyStats";

const AboutUs = () => {
  const team = [
    {
      name: "Julity C06",
      role: "Service Lead",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Unita Catte",
      role: "Brand Strategist",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Blueoil N. Kialoa",
      role: "Tech Ops",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-black to-indigo-900 text-white">
      <div className="flex justify-center ">
        <Navbar />
      </div>

      <div className="px-6 py-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          About RepairMate
        </h1>

        {/* Our Story + Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-2">Our Story</h2>
            <p>
              RepairMate was born to simplify home appliance repair. We connect
              users to reliable, verified technicians within minutes.
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p>
              To make repair services affordable, trustworthy, and fast. We aim
              to reduce e-waste and increase appliance lifespan for everyone.
            </p>
          </div>
        </div>

        {/* Our Team */}
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-xl text-center shadow border border-white/10 backdrop-blur-sm"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-700"
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Company Stats */}
        <h2 className="text-2xl font-semibold mb-6">Company Snapshot</h2>
        <CompanyStats />

        {/* Contact Us */}
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="bg-white/10 border border-white/10 p-6 rounded-xl text-center backdrop-blur-sm">
          <p>
            Email:{" "}
            <a className="underline" href="mailto:repair@repairmate.com">
              repair@repairmate.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a className="underline" href="tel:+919000000000">
              +91 90000 00000
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
