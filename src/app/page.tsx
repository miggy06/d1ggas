"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import styles from "../components/PortfolioLayout.module.css";
import Magnetic from "../components/Magnetic";

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

const heroButtonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 12 },
  },
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = 500; // fade out over 500px
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const bgOpacity = 0.38 * (1 - scrollProgress);
  const bgTranslateY = scrollProgress * 120; // 0px to 120px parallax

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", position: "relative" }}>
      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Main Single-Page Portfolio Layout */}
      <main style={{ width: "100%", margin: "0 auto", position: "relative" }}>
        
        {/* 1. Hero Section (Sapir Roche style) */}
        <section id="hero" className={styles.heroContainer}>
          {/* Subtle Background Image with Opacity */}
          <div 
            className={styles.heroBgImageWrapper}
            style={{
              opacity: bgOpacity,
              transform: `translateY(${bgTranslateY}px) translateZ(0)`,
              willChange: "opacity, transform",
            }}
          >
            <Image
              src="/assets/d1ggas_bg.png"
              alt="D1GGAS background lego and crew hands"
              fill
              priority
              unoptimized
              className={styles.heroBgImage}
            />
            {/* Overlay Gradient to soften edges and match Wix look */}
            <div className={styles.heroBgOverlay} />
          </div>

          <motion.div 
            className={styles.heroContentWrapper}
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top row: Small meta details */}
            <motion.div className={styles.heroTopMeta} variants={heroItemVariants}>
              <span className={styles.heroSubText}>Est. 2024</span>
            </motion.div>

            {/* Middle part: Giant title "D1GGAS" */}
            <motion.div className={styles.heroTitleContainer} variants={heroTitleVariants}>
              <h1 className={styles.heroTitleMain}>D1GGAS</h1>
            </motion.div>

            {/* Bottom row: Subtitle on left, "Work with Me" toggle style button on right */}
            <div className={styles.heroBottomRow}>
              <motion.div className={styles.heroDescription} variants={heroItemVariants}>
                <p>They say good things come in threes, but chaos comes in sevens.</p>
                <p style={{ marginTop: "8px" }}>Just a bunch of cheeky individuals doing life our own way.</p>
              </motion.div>

              <motion.div className={styles.heroToggleWrapper} variants={heroButtonVariants}>
                <Magnetic range={60} action={0.25}>
                  <button className={styles.togglePill} onClick={scrollToAbout}>
                    <span className={styles.toggleText}>Explore Crew</span>
                    <span className={styles.toggleCircle} />
                  </button>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>
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
          backgroundColor: "var(--bg-secondary)",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="footer-content" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <a
            href="https://www.instagram.com/d1gg.us?igsh=MWFnYW9lNGczcnRjMg=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-blue)",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            Follow us on Instagram: @d1gg.us
          </a>
          <span>&copy; {new Date().getFullYear()} d1ggas. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
