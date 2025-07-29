"use client";
const { useState, useEffect, createContext } = require("react");

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && (theme == "dark" || theme == "light")) {
      setTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  });

  const activateDarkTheme = () => {
    setTheme("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  };

  const activateLightTheme = () => {
    setTheme("light");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  };

  return <ThemeContext.Provider value={{ theme, activateDarkTheme, activateLightTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext };
