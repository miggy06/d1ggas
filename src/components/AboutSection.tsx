"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioLayout.module.css";
import { crewMembers, CrewMember } from "../data/crew";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal section heading and description
      gsap.from("#about h2, #about p", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // 2. Staggered reveal for crew cards grid
      gsap.from(`.${styles.crewCard}`, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.crewGrid}`,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-container" ref={sectionRef}>
      <h2 className="section-title">About Us</h2>
      
      <p style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "600px" }}>
        We are a group of 8 friends bound by shared experiences, jokes, and countless memories.
        Select any profile to view our specialties, statistics, and roles within the crew.
      </p>

      {/* Grid of 8 Friends */}
      <div className={styles.crewGrid}>
        {crewMembers.map((member) => (
          <div
            key={member.id}
            className={styles.crewCard}
            onClick={() => setSelectedMember(member)}
          >
            <div
              className={styles.avatarInitials}
              style={{
                background: member.gradient,
              }}
            >
              {member.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <span className={styles.cardName}>{member.name}</span>
              <span className={styles.cardRole}>{member.role.split(" // ")[0]}</span>
            </div>
            <p className={styles.cardBio}>
              {member.bio.substring(0, 70)}...
            </p>
          </div>
        ))}
      </div>

      {/* Profile Detail overlay (drawer CV modal) */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className={styles.drawerOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className={styles.drawer}
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.drawerClose}
                onClick={() => setSelectedMember(null)}
                aria-label="Close details"
              >
                <X size={16} />
              </button>

              <div className={styles.drawerHeader}>
                <div
                  className={styles.avatarInitials}
                  style={{
                    background: selectedMember.gradient,
                    width: "50px",
                    height: "50px",
                    fontSize: "1.1rem",
                  }}
                >
                  {selectedMember.initials}
                </div>
                <div className={styles.drawerMeta}>
                  <h3 className={styles.drawerName}>{selectedMember.name}</h3>
                  <span className={styles.drawerRole}>{selectedMember.role}</span>
                </div>
              </div>

              <blockquote className={styles.drawerQuote}>
                &ldquo;{selectedMember.quote}&rdquo;
              </blockquote>

              <p className={styles.drawerBio}>{selectedMember.bio}</p>

              <div className={styles.drawerSpecialty}>
                <span className={styles.drawerSpecialtyLabel}>Core Specialty</span>
                <p className={styles.drawerSpecialtyVal}>{selectedMember.specialty}</p>
              </div>

              {/* Stats / Telemetry Progress Bars */}
              <div className={styles.drawerStatsGrid}>
                {selectedMember.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <div className={styles.statHeader}>
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className={styles.statBarBg}>
                      <motion.div
                        className={styles.statBarFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
