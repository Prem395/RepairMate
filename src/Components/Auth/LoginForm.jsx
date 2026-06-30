import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        },
      );
      setUser(response.data.data);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${response.data.data.firstName}!`, {
        icon: "👋",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(59,130,246,0.18)",
        },
      });
      onClose();
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "⚠️",
        style: {
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "#fff",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: "18px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(239,68,68,0.15)",
        },
      });
    } finally {
      setLoading(false);
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
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-sky-600 px-4 py-2.5 mt-4 flex items-center justify-center gap-2"
        >
          {loading && (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
