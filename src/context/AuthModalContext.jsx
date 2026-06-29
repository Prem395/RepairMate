import { createContext, useContext, useState } from "react";
import AuthModal from "../Components/Auth/AuthModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isAuthOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
      <AuthModal isOpen={isAuthOpen} onClose={closeAuthModal} />
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
