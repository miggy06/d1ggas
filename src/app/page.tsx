"use client";

import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import styles from "../components/PortfolioLayout.module.css";

export default function Home() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Main Single-Page Portfolio Layout */}
      <main style={{ width: "100%", margin: "0 auto" }}>
        
        {/* 1. Hero Section (Sapir Roche style) */}
        <section id="hero" className="section-container" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <div className={styles.heroSection}>
            {/* Left Content Column */}
            <div className={styles.heroContent}>
              <span className={styles.heroSub}>Est. 2023 // Crew Mainframe</span>
              <h1 className={styles.heroTitle}>d1ggas</h1>
              <p className={styles.heroText}>
                Connected by chaos, defined by style. We are a collaborative group of eight friends
                sharing highlights, memories, and tracking our growth together in our dedicated digital sanctuary.
              </p>
              <div className={styles.heroActions}>
                <button className="btn-primary" onClick={scrollToAbout}>
                  Explore The Crew
                </button>
                <button className="btn-secondary" onClick={scrollToContact}>
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className={styles.imageFrameContainer}>
              <div className={styles.imageFrame}>
                <div className={styles.imageInner}>
                  <Image
                    src="/assets/collage_1.png"
                    alt="d1ggas crew group portrait"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 400px"
                    className={styles.heroImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. About Section (8 Profiles) */}
        <AboutSection />

        {/* 3. Album Section (Memory photo grid + Upload) */}
        <AlbumSection />

        {/* 4. Contact Section (Form + Information) */}
        <ContactSection />
        
      </main>

      {/* Minimal Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-color)",
          padding: "40px 24px",
          textAlign: "center",
          backgroundColor: "#fafafa",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <span>&copy; {new Date().getFullYear()} d1ggas. All rights reserved.</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
            CRAFTED WITH STYLE // SYSTEM ONLINE
          </span>
        </div>
      </footer>
    </div>
  );
}
