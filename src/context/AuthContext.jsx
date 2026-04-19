import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored
        ? JSON.parse(stored)
        : {
            isLoggedIn: false,
            isPasswordChanged: false,
            college: null,
        };
    });

  const login = (data) => {
    const authData = {
      isLoggedIn: true,
      isPasswordChanged: data.isPasswordChanged,
      college: data.college,
    };
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
    if (data.college && data.college.ccode) {
        localStorage.setItem("college", data.college.ccode);
    }
  };

  const markPasswordChanged = () => {
    setAuth((prev) => {
        const updated = { ...prev, isPasswordChanged: true };
        localStorage.setItem("auth", JSON.stringify(updated));
        return updated;
    });
  };

  const logout = () => {
    const emptyAuth = {
      isLoggedIn: false,
      isPasswordChanged: false,
      college: null,
    };
    setAuth(emptyAuth);
    localStorage.removeItem("auth");
    localStorage.removeItem("college");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        markPasswordChanged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};