"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
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
      <h2 className="section-title">Memory Album</h2>

      <p style={{ color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "600px" }}>
        Cherish our shared history. Drag & drop or select images to upload your own files to the album grid below!
      </p>

      <div className={styles.albumGrid}>
        {/* Upload Trigger Card */}
        <label className={styles.uploadCard}>
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
        </label>

        {/* Existing Images */}
        {images.map((img) => (
          <div key={img.id} className={styles.albumCard}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
