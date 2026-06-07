"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import styles from "./Header.module.css";
import Magnetic from "./Magnetic";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);

    // Initialize audio (muted/paused by default)
    audioRef.current = new Audio("https://assets.codepen.io/4358584/Anitek_-_01_-_Kisses.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.20; // Soft ambient volume

    // Scroll progress handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback blocked by browser policies:", err);
      });
    }
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
    <>
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

          {/* Capsule Scroll Progress Bar */}
          <div 
            className={styles.progressBar} 
            style={{ width: `${scrollPercent}%` }} 
          />
        </header>
      </div>

      {/* Floating Ambient Audio Player Pill */}
      <Magnetic range={60} action={0.2}>
        <div 
          className={styles.audioPill} 
          onClick={togglePlay} 
          title="Play Ambient Lofi Beats"
        >
          <div className={styles.audioIcon}>
            {isPlaying ? (
              <Volume2 size={13} className={styles.pulseIcon} />
            ) : (
              <VolumeX size={13} />
            )}
          </div>
          <span className={styles.audioText}>
            {isPlaying ? "LOFI ON" : "LOFI OFF"}
          </span>
          {/* Micro visualizer sound waves */}
          <div className={`${styles.soundwave} ${isPlaying ? styles.waveActive : ""}`}>
            <span className={styles.waveBar} />
            <span className={styles.waveBar} />
            <span className={styles.waveBar} />
          </div>
        </div>
      </Magnetic>
    </>
  );
}

