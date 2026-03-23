/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = "repairmate_users";
const SESSION_STORAGE_KEY = "repairmate_session";

const DEFAULT_ADMIN = {
  id: "admin-1",
  name: "RepairMate Admin",
  email: "admin@repairmate.com",
  password: "Admin@123",
  role: "admin",
};

const readUsers = () => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!storedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }

  try {
    const parsedUsers = JSON.parse(storedUsers);
    const hasAdmin = parsedUsers.some((user) => user.email === DEFAULT_ADMIN.email);

    if (!hasAdmin) {
      const nextUsers = [...parsedUsers, DEFAULT_ADMIN];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
      return nextUsers;
    }

    return parsedUsers;
  } catch {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: "signin",
    redirectTo: "/",
  });

  useEffect(() => {
    const nextUsers = readUsers();
    setUsers(nextUsers);

    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSession) return;

    try {
      const parsedSession = JSON.parse(storedSession);
      const sessionUser = nextUsers.find((user) => user.id === parsedSession.id);
      if (sessionUser) {
        setCurrentUser(sessionUser);
      }
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
  };

  const signUp = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = users.find((user) => user.email === normalizedEmail);

    if (existingUser) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "user",
    };

    const nextUsers = [...users, newUser];
    persistUsers(nextUsers);
    setCurrentUser(newUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  const signIn = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password
    );

    if (!matchedUser) {
      return { success: false, message: "Invalid email or password." };
    }

    setCurrentUser(matchedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(matchedUser));
    return { success: true, user: matchedUser };
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const openAuthModal = ({ mode = "signin", redirectTo = "/" } = {}) => {
    setAuthModal({
      isOpen: true,
      mode,
      redirectTo,
    });
  };

  const closeAuthModal = () => {
    setAuthModal((current) => ({
      ...current,
      isOpen: false,
    }));
  };

  const setAuthModalMode = (mode) => {
    setAuthModal((current) => ({
      ...current,
      mode,
    }));
  };

  const value = {
    currentUser,
    users,
    signIn,
    signOut,
    signUp,
    authModal,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
