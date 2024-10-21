/** @format */
// src/contexts/ThemeContext.js

import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("lightmode");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    // Ta bort befintliga teman och lägg till det nya
    document.body.classList.remove("lightmode", "darkmode", "blue");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
