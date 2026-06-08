"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

interface MemberStats {
  vibe: number;
  social: number;
  logic: number;
  humour: number;
}

const getMemberStats = (id: string): MemberStats => {
  const statsMap: Record<string, MemberStats> = {
    randelf: { vibe: 92, social: 75, logic: 96, humour: 88 },
    paola: { vibe: 96, social: 92, logic: 65, humour: 90 },
    krishanna: { vibe: 94, social: 88, logic: 70, humour: 95 },
    francis: { vibe: 88, social: 80, logic: 92, humour: 85 },
    rheanne: { vibe: 95, social: 86, logic: 72, humour: 90 },
    ayeisha: { vibe: 90, social: 94, logic: 60, humour: 92 },
    xian: { vibe: 86, social: 70, logic: 96, humour: 80 },
    jeremy: { vibe: 91, social: 82, logic: 89, humour: 88 }
  };
  return statsMap[id] || { vibe: 85, social: 80, logic: 80, humour: 85 };
};

export default function AboutSection() {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "interests" | "stats">("profile");

  // Lock body scroll when drawer details modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  const handleOpenProfile = (member: CrewMember) => {
    setActiveTab("profile");
    setSelectedMember(member);
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "interests", label: "Interests" },
    { id: "stats", label: "Stats" }
  ];

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
          We are a group of 7 friends bound by shared experiences, jokes, and countless memories.
          Select any profile to view our specialties, statistics, and roles within the crew.
        </p>
      </motion.div>

      {/* Grid of 7 Friends - animated on entry */}
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
            onClick={() => handleOpenProfile(member)}
          >
            <div
              className={styles.avatarInitials}
              style={{
                background: member.image ? "transparent" : member.gradient,
              }}
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="60px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                member.initials
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
              <span className={styles.cardName}>{member.name}</span>
              <span className={styles.cardRole}>View Profile</span>
            </div>
            <p className={styles.cardBio}>
              Click to view birthday, favorite color, hobbies, and social contacts.
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
                    background: selectedMember.image ? "transparent" : selectedMember.gradient,
                    width: "60px",
                    height: "60px",
                    fontSize: "1.3rem",
                  }}
                >
                  {selectedMember.image ? (
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    selectedMember.initials
                  )}
                </div>
                <div className={styles.drawerMeta}>
                  <h3 className={styles.drawerName}>{selectedMember.name}</h3>
                  <span className={styles.drawerSubtitle}>Personal Profile</span>
                </div>
              </div>

              {/* Interactive Tabs Header */}
              <div className={styles.drawerTabs}>
                {tabs.map((t) => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      className={`${styles.drawerTabBtn} ${isActive ? styles.drawerTabActive : ""}`}
                      onClick={() => setActiveTab(t.id as any)}
                    >
                      <span>{t.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className={styles.activeTabUnderline}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.profileDetailsList}>
                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Birthday</span>
                        <span className={styles.detailValue}>{selectedMember.birthday}</span>
                      </div>
 
                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Favorite Color</span>
                        <span className={styles.detailValue}>{selectedMember.favColor}</span>
                      </div>

                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Relationship Status</span>
                        <span className={styles.detailValue}>{selectedMember.status}</span>
                      </div>
 
                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Instagram / Contact</span>
                        <span className={styles.detailValue} style={{ color: "var(--color-blue)", fontFamily: "var(--font-mono)" }}>
                          {selectedMember.instagram}
                        </span>
                      </div>
                    </div>
 
                    <div className={styles.profileBioSection}>
                      <span className={styles.bioLabel}>About Me</span>
                      <p className={styles.bioText}>{selectedMember.bio}</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "interests" && (
                  <motion.div
                    key="interests"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.profileDetailsList}>
                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Favorite Food</span>
                        <span className={styles.detailValue}>{selectedMember.favFood}</span>
                      </div>
 
                      <div className={styles.profileDetailItem}>
                        <span className={styles.detailLabel}>Hobby</span>
                        <span className={styles.detailValue}>{selectedMember.hobby}</span>
                      </div>
                    </div>

                    <div className={styles.profileBioSection}>
                      <span className={styles.bioLabel}>Crew Vibe</span>
                      <p className={styles.bioText}>
                        When not busy with hobbies like {selectedMember.hobby || "hanging out"}, {selectedMember.name} helps shape the culture and layout of the d1ggas crew.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.drawerStatsGrid} style={{ marginTop: "16px", marginBottom: "20px" }}>
                      <div className={styles.statItem}>
                        <div className={styles.statHeader}>
                          <span>Vibe Level</span>
                          <span>{getMemberStats(selectedMember.id).vibe}%</span>
                        </div>
                        <div className={styles.statBarBg}>
                          <motion.div
                            className={styles.statBarFill}
                            style={{ backgroundColor: selectedMember.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${getMemberStats(selectedMember.id).vibe}%` }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className={styles.statItem}>
                        <div className={styles.statHeader}>
                          <span>Social Power</span>
                          <span>{getMemberStats(selectedMember.id).social}%</span>
                        </div>
                        <div className={styles.statBarBg}>
                          <motion.div
                            className={styles.statBarFill}
                            style={{ backgroundColor: selectedMember.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${getMemberStats(selectedMember.id).social}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                          />
                        </div>
                      </div>

                      <div className={styles.statItem}>
                        <div className={styles.statHeader}>
                          <span>Coding & Logic</span>
                          <span>{getMemberStats(selectedMember.id).logic}%</span>
                        </div>
                        <div className={styles.statBarBg}>
                          <motion.div
                            className={styles.statBarFill}
                            style={{ backgroundColor: selectedMember.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${getMemberStats(selectedMember.id).logic}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
                          />
                        </div>
                      </div>

                      <div className={styles.statItem}>
                        <div className={styles.statHeader}>
                          <span>Humour & Jokes</span>
                          <span>{getMemberStats(selectedMember.id).humour}%</span>
                        </div>
                        <div className={styles.statBarBg}>
                          <motion.div
                            className={styles.statBarFill}
                            style={{ backgroundColor: selectedMember.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${getMemberStats(selectedMember.id).humour}%` }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.profileBioSection}>
                      <span className={styles.bioLabel}>Sanctuary Telemetry</span>
                      <p className={styles.bioText}>
                        These indexes are computed based on crew activity, chat engagement rates, and custom vibe telemetry metrics in our sanctuary databases.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
