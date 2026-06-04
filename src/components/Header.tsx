"use client";

import React from "react";
import styles from "./Header.module.css";

export default function Header() {
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
        <div className={styles.logoBadge} onClick={() => scrollToSection("hero")}>
          <span className={styles.logoText}>D1GGAS</span>
        </div>

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
        </nav>
      </header>
    </div>
  );
}

