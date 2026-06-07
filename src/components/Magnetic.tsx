"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance threshold to trigger attraction
  action?: number; // Strength of attraction (0 to 1)
}

export default function Magnetic({ children, range = 35, action = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Coordinates relative to the center of the element
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Calculate distance from center
    const distance = Math.hypot(x, y);
    
    if (distance < range) {
      // Attract the button towards the cursor
      setPosition({ x: x * action, y: y * action });
    } else {
      // Return to original position if cursor is out of range
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
