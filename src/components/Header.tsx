"use client";

import React from "react";
import { Users, UserPlus } from "lucide-react";
import styles from "./Header.module.css";
import { crewMembers } from "../data/crew";

interface HeaderProps {
  onAddFriendClick: () => void;
  onMemberClick: (memberId: string) => void;
}

export default function Header({ onAddFriendClick, onMemberClick }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      {/* Brand Pill */}
      <div className={styles.logoArea}>
        <span className={styles.logoText}>d1ggas</span>
        <span className={styles.versionBadge}>v1.0.0</span>
      </div>

      {/* Nav Actions */}
      <div className={styles.navArea}>
        {/* The Crew Hover Dropdown */}
        <div className={styles.crewDropdownTrigger}>
          <button className={styles.navLinkBtn}>
            <Users size={16} />
            <span>The Crew</span>
          </button>

          {/* Glass Dropdown Grid of 8 Friends */}
          <div className={styles.dropdownMenu}>
            {crewMembers.map((member) => (
              <div
                key={member.id}
                className={styles.memberItem}
                onClick={() => onMemberClick(member.id)}
              >
                <div
                  className={styles.avatarCircle}
                  style={{
                    background: member.gradient,
                    boxShadow: `0 0 10px ${member.color}33`,
                    borderColor: `${member.color}40`,
                  }}
                >
                  {member.initials}
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberRole}>{member.role.split(" // ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Friend Button */}
        <button className={styles.addFriendBtn} onClick={onAddFriendClick}>
          <UserPlus size={15} />
          <span>Add Friend</span>
        </button>
      </div>
    </header>
  );
}
