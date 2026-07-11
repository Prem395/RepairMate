import { useState } from "react";
import { CgPassword } from "react-icons/cg";
import { LogInUser, signupUser } from "../../api/authService";
import { errorToast, successToast } from "../../utils/toastConfig";

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
        return errorToast("Passwords do not match");
      }
      const payLoad = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      const res = await signupUser(payLoad);
      console.log(res);

      successToast("Account created successfully");
      setMode("signin");

      setformData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      errorToast(error);
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
          type="submit"
          disabled={loading}
          className="w-full shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] rounded-2xl bg-sky-600 px-4 py-2.5 mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
