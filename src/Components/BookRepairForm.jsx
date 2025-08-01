import React, { useEffect, useRef, useState } from "react";

const BookRepairForm = ({ setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [numberError, setNumberError] = useState(null);

  const modalRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsFormOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsFormOpen]);

  const submitHandler = (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;
    setEmailError(null);
    setNumberError(null);

    if (!phoneRegex.test(contactNumber)) {
      setNumberError("Please enter a valid 10-digit number starting with 6-9");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!isValid) return;

    console.log({ name, email, deviceType, issueDesc, contactNumber });

    setName("");
    setEmail("");
    setDeviceType("");
    setContactNumber("");
    setIssueDesc("");

    alert("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-all">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
        <form
          ref={modalRef}
          onSubmit={submitHandler}
          className="w-full max-w-xl border-2 border-white/10 bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6 animate-fadeIn transition-all duration-200"
        >
          <h2 className="text-2xl font-bold text-white text-center">
            Book a Repair
          </h2>

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
              className="peer w-full bg-transparent border border-white/20 text-white rounded-md px-4 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              id="email"
              required
              aria-invalid={!!emailError}
              aria-describedby="email-error"
              className={`peer w-full bg-transparent border ${
                emailError ? "border-red-700" : "border-white/20"
              } text-white rounded-md px-4 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Email
            </label>
            {emailError && (
              <p
                id="email-error"
                className="text-xs text-red-400 font-medium mt-1 ml-2"
              >
                {emailError}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value.replace(/\D/g, ""));
                setNumberError(null);
              }}
              id="contact"
              required
              aria-invalid={!!numberError}
              aria-describedby="number-error"
              className={`peer w-full bg-transparent border ${
                numberError ? "border-red-700" : "border-white/20"
              } text-white rounded-md px-4 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              placeholder=" "
            />
            <label
              htmlFor="contact"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Contact Number
            </label>
            {numberError && (
              <p
                id="number-error"
                className="text-xs text-red-400 font-medium mt-1 ml-2"
              >
                {numberError}
              </p>
            )}
          </div>

          {/* Device Type */}
          <div className="relative">
            <input
              type="text"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              id="device"
              required
              className="peer w-full bg-transparent border border-white/20 text-white rounded-md px-4 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="device"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Device Type
            </label>
          </div>

          {/* Issue Description */}
          <div className="relative">
            <input
              type="text"
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              id="issue"
              required
              className="peer w-full bg-transparent border border-white/20 text-white rounded-md px-4 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="issue"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
            >
              Issue Description
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookRepairForm;
