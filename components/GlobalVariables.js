import React, { createContext, useContext } from "react";
import { useAuth } from "../services/firebase/useAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useAuth();

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
