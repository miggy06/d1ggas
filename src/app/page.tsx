"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import AlbumSection from "../components/AlbumSection";
import ContactSection from "../components/ContactSection";
import styles from "../components/PortfolioLayout.module.css";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Context handles automatic cleanups in React
    let ctx = gsap.context(() => {
      // 1. Background Image Parallax & Fade-out on scroll
      gsap.to(heroBgRef.current, {
        opacity: 0,
        y: 120, // smooth parallax offset
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 2. Entrance Staggered reveals for Hero contents
      const tl = gsap.timeline();
      
      tl.from(`.${styles.heroSubText}`, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(`.${styles.heroTitleMain}`, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.6")
      .from(`.${styles.heroDescription} p`, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.5")
      .from(`.${styles.togglePill}`, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.5)"
      }, "-=0.4");
    });

    // Refresh ScrollTrigger positions after page finishes rendering to avoid height calculation offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      clearTimeout(timer);
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Main Single-Page Portfolio Layout */}
      <main style={{ width: "100%", margin: "0 auto" }}>
        
        {/* 1. Hero Section (Sapir Roche style) */}
        <section id="hero" className={styles.heroContainer}>
          {/* Subtle Background Image with Opacity */}
          <div ref={heroBgRef} className={styles.heroBgImageWrapper}>
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

          <div className={styles.heroContentWrapper}>
            {/* Top row: Small meta details */}
            <div className={styles.heroTopMeta}>
              <span className={styles.heroSubText}>Est. 2023 // Crew Mainframe</span>
            </div>

            {/* Middle part: Giant title "D1GGAS" */}
            <div className={styles.heroTitleContainer}>
              <h1 className={styles.heroTitleMain}>D1GGAS</h1>
            </div>

            {/* Bottom row: Subtitle on left, "Work with Me" toggle style button on right */}
            <div className={styles.heroBottomRow}>
              <div className={styles.heroDescription}>
                <p>Connected by chaos, defined by style.</p>
                <p>A digital sanctuary for eight friends sharing memories and tracking progress.</p>
              </div>

              <div className={styles.heroToggleWrapper}>
                <button className={styles.togglePill} onClick={scrollToContact}>
                  <span className={styles.toggleText}>Explore Crew</span>
                  <span className={styles.toggleCircle} />
                </button>
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
          backgroundColor: "var(--bg-secondary)",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
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
