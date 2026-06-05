"use client";

import React, { useState, useRef, useEffect } from "react";
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

// Helper to compress images client-side before saving to localStorage
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as JPEG at 0.75 quality for small footprint
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage write error:", e);
    alert("Mainframe storage is full! Please delete some existing custom photos first to free up space.");
  }
};

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
  const [images, setImages] = useState<AlbumImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos on mount
  useEffect(() => {
    const savedCustom = localStorage.getItem("d1ggas_custom_images");
    const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];

    const activeDefaults = defaultImages.filter((img) => !deletedDefaults.includes(img.id));

    if (savedCustom) {
      try {
        const customImgs = JSON.parse(savedCustom) as AlbumImage[];
        setImages([...customImgs, ...activeDefaults]);
      } catch (e) {
        setImages(activeDefaults);
      }
    } else {
      setImages(activeDefaults);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: AlbumImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const compressedBase64 = await compressImage(file);
        newImages.push({
          id: `custom-img-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
          src: compressedBase64,
          alt: file.name,
        });
      } catch (err) {
        console.error("Failed to compress image:", err);
      }
    }

    if (newImages.length > 0) {
      setImages((prev) => {
        const customOnly = prev.filter((img) => img.id.startsWith("custom-img-"));
        const updatedCustom = [...newImages, ...customOnly];
        saveToLocalStorage("d1ggas_custom_images", updatedCustom);

        const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
        const activeDefaults = defaultImages.filter((img) => !deletedDefaults.includes(img.id));

        return [...updatedCustom, ...activeDefaults];
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);

      if (id.startsWith("custom-img-")) {
        const customOnly = updated.filter((img) => img.id.startsWith("custom-img-"));
        saveToLocalStorage("d1ggas_custom_images", customOnly);
      } else {
        const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
        if (!deletedDefaults.includes(id)) {
          const newDeleted = [...deletedDefaults, id];
          saveToLocalStorage("d1ggas_deleted_default_ids", newDeleted);
        }
      }

      return updated;
    });
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
