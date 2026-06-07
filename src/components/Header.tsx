"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./Header.module.css";
import Magnetic from "./Magnetic";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        {/* Logo Area (styled as blue pill badge) */}
        <Magnetic range={50} action={0.25}>
          <div className={styles.logoBadge} onClick={() => scrollToSection("hero")}>
            <span className={styles.logoText}>D1GGAS</span>
          </div>
        </Magnetic>

        {/* Nav Actions */}
        <nav className={styles.navArea}>
          <button className={styles.navLink} onClick={() => scrollToSection("hero")}>
            Home
          </button>
          <button className={styles.navLink} onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className={styles.navLink} onClick={() => scrollToSection("album")}>
            Album
          </button>
          <button className={styles.navLink} onClick={() => scrollToSection("contact")}>
            Contact
          </button>

          {/* Theme Toggle Button */}
          {mounted && (
            <Magnetic range={35} action={0.25}>
              <button 
                className={styles.themeToggle} 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon size={15} className={styles.toggleIcon} />
                ) : (
                  <Sun size={15} className={styles.toggleIcon} />
                )}
              </button>
            </Magnetic>
          )}
        </nav>
      </header>
    </div>
  );
}
