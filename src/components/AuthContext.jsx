// AuthContext.js
import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status (e.g., from localStorage, cookies, etc.)
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const login = async (event, formData) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/cms/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const {token} = await response.json();
        localStorage.setItem("jwt", token);
        setAuthenticated(true);
      } else {
        // Authentication failed, handle the error here
        console.error("Authentication failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{authenticated, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
