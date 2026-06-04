"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Send, CheckCircle } from "lucide-react";
import styles from "./AddFriendModal.module.css";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFriendModal({ isOpen, onClose }: AddFriendModalProps) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [reason, setReason] = useState("");
  const [passcode, setPasscode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [granted, setGranted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Fun easter egg: check if passcode is correct
    if (passcode.toLowerCase() === "d1ggas" || passcode.toLowerCase() === "d1ggas2023" || passcode === "1234") {
      setGranted(true);
    } else {
      setGranted(false);
    }
    
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setHandle("");
    setReason("");
    setPasscode("");
    setSubmitted(false);
    setGranted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className={styles.header}>
                  <ShieldCheck size={24} className={styles.icon} />
                  <h2 className={styles.title}>Apply to Join</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Alias / Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      required
                      placeholder="e.g. Maverick"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Discord Tag or IG Handle</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="@handle"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Why do you want to join the crew?</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us what makes you fit for the d1ggas crew..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Secret Access Key (Optional)</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="••••••••"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <Send size={16} />
                    <span>Transmit Request</span>
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                className={styles.successContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={52} className={styles.successIcon} />
                <h2 className={styles.successTitle}>
                  {granted ? "Access Granted!" : "Transmission Complete"}
                </h2>
                <p className={styles.successText}>
                  {granted
                    ? `Welcome to the crew, ${name}! The passcode opened the mainframe. You are now officially integrated into the d1ggas system.`
                    : `Application received! Your telemetry has been submitted to the 8 core members of the d1ggas. We will evaluate your request.`}
                </p>
                <button className={styles.successCloseBtn} onClick={handleReset}>
                  Dismiss Interface
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
