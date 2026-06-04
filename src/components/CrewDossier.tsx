"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import styles from "./CrewDossier.module.css";
import { crewMembers } from "../data/crew";

interface CrewDossierProps {
  initialMemberId: string | null;
  onBack: () => void;
}

export default function CrewDossier({ initialMemberId, onBack }: CrewDossierProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialMemberId || crewMembers[0].id
  );

  const activeMember =
    crewMembers.find((m) => m.id === selectedId) || crewMembers[0];

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={`glass-panel ${styles.container}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={
          {
            "--theme-color": activeMember.color,
            "--theme-glow": `${activeMember.color}25`,
          } as React.CSSProperties
        }
      >
        {/* Sidebar Nav */}
        <div className={styles.sidebar}>
          {crewMembers.map((member) => (
            <div
              key={member.id}
              className={`${styles.memberTab} ${
                selectedId === member.id ? styles.memberTabActive : ""
              }`}
              onClick={() => setSelectedId(member.id)}
              style={
                {
                  "--theme-color": member.color,
                  "--theme-glow": `${member.color}25`,
                } as React.CSSProperties
              }
            >
              <div
                className={styles.avatar}
                style={{
                  background: member.gradient,
                }}
              >
                {member.initials}
              </div>
              <div className={styles.tabInfo}>
                <span className={styles.tabName}>{member.name}</span>
                <span className={styles.tabRole}>{member.role.split(" // ")[0]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dossier Details Panel */}
        <div className={styles.dossierContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className={styles.dossierContent}
            >
              {/* Header Info */}
              <div className={styles.detailHeader}>
                <div className={styles.metaInfo}>
                  <span className={styles.role}>{activeMember.role}</span>
                  <h2 className={styles.name}>{activeMember.name}</h2>
                </div>
                <div
                  className={styles.bigAvatar}
                  style={{
                    background: activeMember.gradient,
                  }}
                >
                  {activeMember.initials}
                </div>
              </div>

              {/* Quote Block */}
              <blockquote className={styles.quoteBlock}>
                &ldquo;{activeMember.quote}&rdquo;
              </blockquote>

              {/* Bio */}
              <p className={styles.bioText}>{activeMember.bio}</p>

              {/* Core Specialty */}
              <div className={styles.specialtyBox}>
                <div className={styles.specialtyLabel}>System Specialty</div>
                <div className={styles.specialtyValue}>{activeMember.specialty}</div>
              </div>

              {/* Stats / Telemetry */}
              <div className={styles.statsGrid}>
                {activeMember.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <div className={styles.statHeader}>
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>
                    <div className={styles.statBarBg}>
                      <motion.div
                        className={styles.statBarFill}
                        style={{ backgroundColor: activeMember.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 0.8, delay: 0.1 + idx * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Back Controller */}
          <div className={styles.footerArea}>
            <button className={styles.backBtn} onClick={onBack}>
              <ArrowLeft size={14} />
              <span>Return to Terminal</span>
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Cpu size={12} style={{ color: activeMember.color }} />
              <span>STATUS: ONLINE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
