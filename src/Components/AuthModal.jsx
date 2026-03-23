import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthModal = () => {
  const navigate = useNavigate();
  const {
    authModal,
    closeAuthModal,
    currentUser,
    setAuthModalMode,
    signIn,
    signUp,
  } = useAuth();
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  const redirectPath = useMemo(() => authModal.redirectTo || "/", [authModal.redirectTo]);

  useEffect(() => {
    if (!authModal.isOpen) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAuthModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [authModal.isOpen, closeAuthModal]);

  useEffect(() => {
    setFormData(initialFormState);
    setError("");
  }, [authModal.isOpen, authModal.mode]);

  useEffect(() => {
    if (!authModal.isOpen || !currentUser) {
      return;
    }

    closeAuthModal();
    navigate(currentUser.role === "admin" && redirectPath === "/admin" ? "/admin" : redirectPath);
  }, [authModal.isOpen, closeAuthModal, currentUser, navigate, redirectPath]);

  if (!authModal.isOpen) {
    return null;
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (authModal.mode === "signup") {
      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const result = signUp(formData);
      if (!result.success) {
        setError(result.message);
      }
      return;
    }

    const result = signIn(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
          aria-label="Close auth form"
        >
          <FiX size={20} />
        </button>

        <section>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm">
            <button
              type="button"
              onClick={() => setAuthModalMode("signin")}
              className={`rounded-full px-5 py-2 transition ${
                authModal.mode === "signin" ? "bg-blue-600 text-white" : "text-slate-300"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthModalMode("signup")}
              className={`rounded-full px-5 py-2 transition ${
                authModal.mode === "signup" ? "bg-blue-600 text-white" : "text-slate-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {authModal.mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {authModal.mode === "signin"
              ? "Sign in to continue with your booking and account."
              : "Create an account to manage bookings and track services."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {authModal.mode === "signup" && (
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">Full Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-400"
                  placeholder="Your full name"
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-400"
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={updateField}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-400"
                placeholder="Enter your password"
              />
            </label>

            {authModal.mode === "signup" && (
              <label className="block space-y-2">
                <span className="text-sm text-slate-300">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={updateField}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-blue-400"
                  placeholder="Confirm your password"
                />
              </label>
            )}

            {error && <p className="rounded-2xl bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold transition hover:bg-blue-700"
            >
              {authModal.mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {authModal.mode === "signin" ? "Need an account?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setAuthModalMode(authModal.mode === "signin" ? "signup" : "signin")}
              className="text-blue-300 transition hover:text-blue-200"
            >
              {authModal.mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AuthModal;
