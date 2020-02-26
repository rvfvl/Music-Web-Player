import React, { createContext, useState, useEffect } from "react";
import addTokenToHeaders from "../utils/addTokenToHeaders";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    setIsLoading(true);

    try {
      const result = await axios.get("https://api.spotify.com/v1/me");

      setUser(result.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem("access_token");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    addTokenToHeaders();
    fetchProfile();
  }, []);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
