import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgPassword } from "react-icons/cg";

const SignUpForm = ({ setMode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords does not match", {
          icon: "⚠️",
          position: "top-center",
          style: {
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "#fff",
            border: "1px solid rgba(250,250,250,0.20)",
            borderRadius: "18px",
            padding: "12px 20px",
          },
        });
      }
      const payLoad = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        payLoad,
      );
      console.log(response.data);
      toast.success("Account created successfully", {
        icon: "✅",
        position: "top-center",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(250,250,250,0.20)",
          borderRadius: "18px",
          padding: "12px 20px",
        },
      });
      setMode("signin");

      setformData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "⚠️",
        position: "top-center",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(250,250,250,0.20)",
          borderRadius: "18px",
          padding: "12px 20px",
          boxShadow: "0 5px 32px rgba(250,250,250,0.30)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">First Name</span>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
              placeholder="Ram"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Last Name</span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
              placeholder="Sharma"
            />
          </label>
        </div>

        <label className="block space-y-1 mt-1">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
            placeholder="ram@example.com"
          />
        </label>

        <label className="block space-y-1 mt-1">
          <span className="text-sm text-slate-300">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
            placeholder="Enter your password"
          />
        </label>

        <label className="block space-y-1 mt-1">
          <span className="text-sm text-slate-300">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
            placeholder="Confirm your password"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-2xl bg-sky-600 px-4 py-2.5 mt-4 flex items-center justify-center gap-2"
        >
          {loading && (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Register
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
