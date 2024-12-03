import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

// AuthContext oluşturuyoruz
const AuthContext = createContext();

// AuthProvider, AuthContext'in değerlerini sağlar
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    const authToken = Cookies.get("authToken");
    if (authToken && userRole) {
      setUser({ userRole });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook'u, AuthContext'e erişmek için
export const useAuth = () => useContext(AuthContext);

// AuthContext'i dışa aktar
export { AuthContext };
