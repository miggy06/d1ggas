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

          {/* Group Instagram Link */}
          <Magnetic range={35} action={0.25}>
            <a 
              href="https://www.instagram.com/d1gg.us?igsh=MWFnYW9lNGczcnRjMg=="
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramLink}
              aria-label="Follow d1ggas on Instagram"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={styles.toggleIcon}
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </Magnetic>

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
