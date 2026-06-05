"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import styles from "./PortfolioLayout.module.css";
import { crewMembers, CrewMember } from "../data/crew";

// Variants for staggering card elements cleanly on scroll
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AboutSection() {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  return (
    <section id="about" className="section-container">
      {/* Scroll-triggered reveal for Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">About Us</h2>
        
        <p style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "600px" }}>
          We are a group of 8 friends bound by shared experiences, jokes, and countless memories.
          Select any profile to view our specialties, statistics, and roles within the crew.
        </p>
      </motion.div>

      {/* Grid of 8 Friends - animated on entry */}
      <motion.div 
        className={styles.crewGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {crewMembers.map((member) => (
          <motion.div
            key={member.id}
            className={styles.crewCard}
            variants={cardVariants}
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
          </motion.div>
        ))}
      </motion.div>

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
