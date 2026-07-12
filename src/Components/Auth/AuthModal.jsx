import { useState } from "react";
import { FiX } from "react-icons/fi";

import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
        >
          <FiX size={20} />
        </button>

        <section>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-full px-5 py-2 transition-all ${
                mode === "signin"
                  ? "bg-sky-600 shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px] text-white"
                  : "text-slate-300"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-full px-5 py-2 transition-all ${
                mode === "signup"
                  ? "bg-sky-600 shadow-[rgba(59,230,246,0.35)_0px_4px_16px_0px]  text-white"
                  : "text-slate-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-white">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            {mode === "signin"
              ? "Sign in to continue with your booking and account."
              : "Create an account to manage bookings and track services."}
          </p>

          <div className="mt-4">
            {mode === "signin" ? (
              <LoginForm onClose={onClose} />
            ) : (
              <SignupForm setMode={setMode} />
            )}
          </div>

          <p className="mt-3 text-center text-sm text-slate-400">
            {mode === "signin" ? "Need an account?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-blue-300 transition hover:text-blue-200"
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AuthModal;
