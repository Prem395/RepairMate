import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ onClose }) => {
  const { setUser, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
       import.meta.env.VITE_API_URL + "/auth/login",
        formData,
        {
          withCredentials: true,
        },
      );
      setUser(response.data.data);
      setIsAuthenticated(true);
      onClose();
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data.message || "something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block space-y-1 mt-1">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
            placeholder="you@example.com"
          />
        </label>

        <label className="block space-y-1 mt-1">
          <span className="text-sm text-slate-300">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 outline-none transition focus:border-blue-400"
            placeholder="Enter your password"
          />
        </label>
        <button
          className="w-full rounded-2xl bg-sky-600 px-4 py-2.5   mt-4 outline-none transition focus:border-blue-400 hover:bg-sky-700 cursor-pointer"
          value="Login"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
