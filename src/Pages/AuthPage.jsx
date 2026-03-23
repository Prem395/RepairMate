import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { openAuthModal } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    openAuthModal({ mode: "signin", redirectTo: "/" });
    navigate("/", { replace: true });
  }, [navigate, openAuthModal]);

  return null;
};

export default AuthPage;
