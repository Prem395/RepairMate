import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./context/AuthModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <App />
          <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
