"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import styles from "./Album.module.css";

interface AlbumImage {
  id: string;
  src: string;
  alt: string;
}

const defaultImages: AlbumImage[] = [
  {
    id: "img-1",
    src: "/assets/collage_1.png",
    alt: "d1ggas crew posing at gold star event",
  },
  {
    id: "img-2",
    src: "/assets/collage_2.png",
    alt: "d1ggas crew mirror selfie",
  },
  {
    id: "img-3",
    src: "/assets/collage_3.jpg",
    alt: "d1ggas crew at waterpark pool",
  },
  {
    id: "img-4",
    src: "/assets/collage_4.jpg",
    alt: "d1ggas achievements and certificates group shot",
  },
  {
    id: "img-5",
    src: "/assets/collage_5.jpg",
    alt: "d1ggas dining together at Wingboss table",
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AlbumSection() {
  const [images, setImages] = useState<AlbumImage[]>(defaultImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: AlbumImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const localUrl = URL.createObjectURL(file);
      newImages.push({
        id: `custom-img-${Date.now()}-${i}`,
        src: localUrl,
        alt: file.name,
      });
    }

    setImages((prev) => [...newImages, ...prev]); // Prepend new uploads
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <section id="album" className="section-container">
      {/* Scroll-triggered reveal for Section heading and description */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">Memory Album</h2>

        <p style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "600px" }}>
          Cherish our shared history. Drag & drop or select images to upload your own files to the album grid below!
        </p>
      </motion.div>

      {/* Grid of memory images */}
      <motion.div
        className={styles.albumGrid}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Upload Trigger Card */}
        <motion.label className={styles.uploadCard} variants={itemVariants}>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
          <Plus size={32} className={styles.uploadIcon} />
          <span className={styles.uploadText}>Upload Memory</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>JPEG / PNG / WebP</span>
        </motion.label>

        {/* Existing Images */}
        {images.map((img) => (
          <motion.div key={img.id} className={styles.albumCard} variants={itemVariants}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.albumImage}
            />
            {/* Hover Delete Action */}
            <button
              className={styles.deleteBtn}
              onClick={() => handleDeleteImage(img.id)}
              title="Delete Photo"
            >
              <Trash2 size={15} />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
