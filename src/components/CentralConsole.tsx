"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import styles from "./CentralConsole.module.css";

interface CentralConsoleProps {
  onInitialize: () => void;
}

export default function CentralConsole({ onInitialize }: CentralConsoleProps) {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={`glass-panel ${styles.consoleCard}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >


        {/* Big Glow Title */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>d1ggas</h1>
        </div>

        {/* Description */}
        <p className={styles.description}>
          A digital sanctuary for eight friends. Connected by chaos, defined by style.
          Explore our highlights, personal statistics, and collective memories.
        </p>

        {/* Button */}
        <motion.button
          className="btn-primary"
          onClick={onInitialize}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Initialize Crew</span>
          <ChevronRight size={16} />
        </motion.button>

        {/* Metadata Tags */}
        <div className={styles.tagsContainer}>
          <span className="tag-pill">Est. 2023</span>
        </div>
      </motion.div>
    </div>
  );
}
