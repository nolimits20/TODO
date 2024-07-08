import React, { useEffect, useState } from "react";

const cn = (...classes) => classes.filter.join(' ');

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      htmlElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      htmlElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    const theme = newMode ? "dark" : "light";
    localStorage.setItem("theme", theme);

    const htmlElement = document.documentElement;
    if (newMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        "h-5 w-5 bg-contain bg-no-repeat sm:mb-2 sm:h-[26px] sm:w-[26px]",
        isDarkMode
          ? "bg-[url(/todo-app-main/images/icon-sun.svg)]"
          : "bg-[url(/fm-todo-app/images/icon-moon.svg)]"
      )}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    ></button>
  );
}
