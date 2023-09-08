import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromCookie = Cookies.get("user");
    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Set user data in a cookie with a 7-day expiration
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    navigate("/login");
    // Remove the user cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
