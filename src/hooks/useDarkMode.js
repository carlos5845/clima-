import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cargar la preferencia guardada
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDark(JSON.parse(savedMode));
    } else {
      // Usar preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return { isDark, toggleDarkMode };
}
