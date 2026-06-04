"use client";

import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset scrolling slightly to account for the sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={styles.headerContainer}>
      {/* Logo Area */}
      <div className={styles.logoArea} onClick={() => scrollToSection("hero")}>
        <span className={styles.logoText}>d1ggas</span>
        <span className={styles.logoSub}>{"// crew directory"}</span>
      </div>

      {/* Nav Actions */}
      <nav className={styles.navArea}>
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
  );
}
