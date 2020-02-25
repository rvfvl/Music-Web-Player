import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const result = await axios.get("https://api.spotify.com/v1/me");
    console.log(result);
    if (result.status === 200) {
      setUser(result.data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
