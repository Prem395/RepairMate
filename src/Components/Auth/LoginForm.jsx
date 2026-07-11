import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogInUser } from "../../api/authService";
import { errorToast, successToast } from "../../utils/toastConfig";

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
      const response = await LogInUser(formData);
      console.log(response);
      setUser(response.data);
      setIsAuthenticated(true);

      successToast(
        `Welcome back, ${response.data.firstName}!`,
        "bottom-center",
      );
      onClose();
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      errorToast(error);
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
          className="w-full rounded-2xl shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] bg-sky-600 px-4 py-2.5 mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
