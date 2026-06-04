"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import BackgroundCollage from "../components/BackgroundCollage";
import CentralConsole from "../components/CentralConsole";
import CrewDossier from "../components/CrewDossier";
import AddFriendModal from "../components/AddFriendModal";

export default function Home() {
  const [dossierActive, setDossierActive] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [addFriendOpen, setAddFriendOpen] = useState(false);

  const handleMemberClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    setDossierActive(true);
  };

  const handleInitializeCrew = () => {
    setSelectedMemberId(null);
    setDossierActive(true);
  };

  const handleBackToTerminal = () => {
    setDossierActive(false);
    setSelectedMemberId(null);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background radial glow */}
      <div className="bg-glow-radial" />

      {/* Collage images background */}
      <BackgroundCollage />

      {/* Main Header navigation */}
      <Header
        onAddFriendClick={() => setAddFriendOpen(true)}
        onMemberClick={handleMemberClick}
      />

      {/* Primary content area with state transitions */}
      <main style={{ minHeight: "100vh" }}>
        <AnimatePresence mode="wait">
          {!dossierActive ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CentralConsole onInitialize={handleInitializeCrew} />
            </motion.div>
          ) : (
            <motion.div
              key="dossier"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CrewDossier
                key={selectedMemberId || "default"}
                initialMemberId={selectedMemberId}
                onBack={handleBackToTerminal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Dynamic modals */}
      <AddFriendModal isOpen={addFriendOpen} onClose={() => setAddFriendOpen(false)} />
    </div>
  );
}
