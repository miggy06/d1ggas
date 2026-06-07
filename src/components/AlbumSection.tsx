"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Album.module.css";
import Magnetic from "./Magnetic";

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

// Helper to convert base64 image data to a binary Blob
const base64ToBlob = (base64DataUrl: string): Blob => {
  const byteString = atob(base64DataUrl.split(',')[1]);
  const mimeString = base64DataUrl.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

// Helper to compress images client-side before uploading
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
  }
};

export default function AlbumSection() {
  const [images, setImages] = useState<AlbumImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<AlbumImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos on mount from Vercel Blob cloud bucket
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();

        const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
        const activeDefaults = defaultImages.filter((img) => !deletedDefaults.includes(img.id));

        if (data.success && data.blobs) {
          const customImgs: AlbumImage[] = data.blobs.map((blob: any) => ({
            id: blob.url,
            src: blob.url,
            alt: blob.pathname.split("/").pop() || "uploaded image",
          }));
          
          setImages([...customImgs, ...activeDefaults]);
        } else {
          setImages(activeDefaults);
        }
      } catch (e) {
        console.error("Failed to fetch cloud images:", e);
        // Fallback to loading local defaults
        const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
        const activeDefaults = defaultImages.filter((img) => !deletedDefaults.includes(img.id));
        setImages(activeDefaults);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Ensure activeIndex is always valid if images are deleted or loaded
  useEffect(() => {
    if (images.length > 0 && activeIndex >= images.length) {
      setActiveIndex(images.length - 1);
    }
  }, [images, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentEnlargedIndex = enlargedImage 
    ? images.findIndex((img) => img.id === enlargedImage.id) 
    : -1;

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentEnlargedIndex === -1) return;
    const prevIdx = currentEnlargedIndex > 0 ? currentEnlargedIndex - 1 : images.length - 1;
    setEnlargedImage(images[prevIdx]);
    setActiveIndex(prevIdx);
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentEnlargedIndex === -1) return;
    const nextIdx = currentEnlargedIndex < images.length - 1 ? currentEnlargedIndex + 1 : 0;
    setEnlargedImage(images[nextIdx]);
    setActiveIndex(nextIdx);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const newImages: AlbumImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // 1. Compress image to small footprint (~80KB)
        const compressedBase64 = await compressImage(file);
        
        // 2. Decode base64 to binary Blob
        const blob = base64ToBlob(compressedBase64);
        
        // 3. Upload binary file to Vercel Blob API endpoint
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: "POST",
          body: blob,
        });

        if (!response.ok) {
          throw new Error("Mainframe cloud upload failed");
        }

        const uploadedBlob = await response.json();
        
        newImages.push({
          id: uploadedBlob.url,
          src: uploadedBlob.url,
          alt: file.name,
        });
      } catch (err) {
        console.error("Failed to upload image:", err);
        alert(`Error uploading ${file.name}. Please ensure Vercel Blob storage is connected in your dashboard.`);
      }
    }

    if (newImages.length > 0) {
      setImages((prev) => {
        const customOnly = prev.filter((img) => img.id.startsWith("https://"));
        const updatedCustom = [...newImages, ...customOnly];

        const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
        const activeDefaults = defaultImages.filter((img) => !deletedDefaults.includes(img.id));

        return [...updatedCustom, ...activeDefaults];
      });
      // Center on the first newly uploaded image
      setActiveIndex(0);
    }

    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleDeleteImage = async (id: string) => {
    const targetIdx = images.findIndex((img) => img.id === id);
    setImages((prev) => prev.filter((img) => img.id !== id));

    if (targetIdx === activeIndex) {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    }

    if (id.startsWith("https://")) {
      // Cloud image: dispatch DELETE request to API route
      try {
        const response = await fetch("/api/images", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: id }),
        });
        if (!response.ok) {
          throw new Error("Failed to delete from cloud store");
        }
      } catch (err) {
        console.error("Cloud deletion failed:", err);
      }
    } else {
      // Default image: save deletion in localStorage
      const deletedDefaults = JSON.parse(localStorage.getItem("d1ggas_deleted_default_ids") || "[]") as string[];
      if (!deletedDefaults.includes(id)) {
        const newDeleted = [...deletedDefaults, id];
        saveToLocalStorage("d1ggas_deleted_default_ids", newDeleted);
      }
    }
  };

  // Triggers browser download directly from URL
  const handleDownloadImage = async (src: string, filename: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "d1ggas-memory.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // CORS fallback: opens image in new tab if download block occurs
      window.open(src, "_blank");
    }
  };

  return (
    <section id="album" className="section-container" style={{ overflow: "visible" }}>
      {/* Scroll-triggered reveal for Section heading and description */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">Memory Album</h2>

        <p style={{ color: "var(--text-secondary)", marginBottom: "30px", maxWidth: "600px" }}>
          Tap once to focus a picture, and tap again to enlarge. Use navigation buttons to scroll infinitely.
        </p>
      </motion.div>

      {/* Horizontal Loop Coverflow Carousel */}
      <div className={styles.carouselOuter}>
        {/* Transparent Click Zones for Navigation (covers side cards) */}
        {images.length > 1 && (
          <>
            <div 
              className={styles.carouselClickZoneLeft} 
              onClick={handlePrev} 
              title="Previous Photo"
            />
            <div 
              className={styles.carouselClickZoneRight} 
              onClick={handleNext} 
              title="Next Photo"
            />
          </>
        )}

        {/* Navigation Buttons (Left) */}
        {images.length > 1 && (
          <button 
            className={`${styles.navBtn} ${styles.leftBtn}`} 
            onClick={handlePrev} 
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Navigation Buttons (Right) */}
        {images.length > 1 && (
          <button 
            className={`${styles.navBtn} ${styles.rightBtn}`} 
            onClick={handleNext} 
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div className={styles.carouselTrack}>
          {images.map((img, index) => {
            const N = images.length;
            // Calculate shortest circular difference for infinite loop illusion
            let diff = index - activeIndex;
            if (diff < -N / 2) diff += N;
            if (diff > N / 2) diff -= N;

            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            const isVisible = absDiff <= 2; // Render center, inner neighbors, and outer neighbors

            if (!isVisible) return null;

            // Coverflow Style Parameters
            const scale = isActive ? 1.06 : 0.88;
            const zIndex = 10 - absDiff;
            const blur = isActive ? "blur(0px)" : "blur(1.5px)";
            const opacity = isActive ? 1 : (absDiff === 1 ? 0.48 : 0.15);
            const shadow = isActive 
              ? "0 30px 60px rgba(0, 0, 0, 0.35)" 
              : "0 12px 30px rgba(0, 0, 0, 0.15)";
            const pointerEvents = absDiff <= 1 ? "auto" : "none";

            return (
              <div
                key={img.id}
                className={`${styles.albumCard} ${isActive ? styles.activeCard : styles.sideCard}`}
                style={{
                  transform: `translate(calc(-50% + (${diff} * (var(--card-width) + var(--card-gap)))), -50%) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: blur,
                  boxShadow: shadow,
                  pointerEvents,
                }}
                onClick={() => isActive ? setEnlargedImage(img) : setActiveIndex(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.albumImage}
                  priority={index < 3}
                />
                
                {/* Delete Button on Active centered card */}
                {isActive && (
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering card enlarge click
                      handleDeleteImage(img.id);
                    }}
                    title="Delete Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className={styles.dotIndicators}>
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Upload memory Action Button */}
      <div className={styles.carouselActions}>
        <Magnetic range={50} action={0.25}>
          <label className={styles.uploadPill}>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className={styles.hiddenInput}
              disabled={loading}
            />
            <Plus size={16} />
            <span>{loading ? "Uploading..." : "Upload Memory"}</span>
          </label>
        </Magnetic>
      </div>

      {/* Enlarged Image Lightbox Overlay */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImage(null)}
          >
            {/* Header Controls */}
            <div className={styles.lightboxHeader}>
              {/* Download Button */}
              <button
                className={styles.lightboxBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadImage(enlargedImage.src, enlargedImage.alt);
                }}
                title="Download Photo"
              >
                <Download size={18} />
              </button>
              
              {/* Close Button */}
              <button
                className={styles.lightboxBtn}
                onClick={() => setEnlargedImage(null)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Left/Right Click zones for easy mobile tapping / swipe navigation */}
            {images.length > 1 && (
              <>
                <div 
                  className={styles.lightboxClickZoneLeft} 
                  onClick={handleLightboxPrev} 
                  title="Previous Photo"
                />
                <div 
                  className={styles.lightboxClickZoneRight} 
                  onClick={handleLightboxNext} 
                  title="Next Photo"
                />
              </>
            )}

            {/* Lightbox Navigation (Left) */}
            {images.length > 1 && (
              <button 
                className={`${styles.lightboxNavBtn} ${styles.lightboxLeftBtn}`} 
                onClick={handleLightboxPrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Lightbox Navigation (Right) */}
            {images.length > 1 && (
              <button 
                className={`${styles.lightboxNavBtn} ${styles.lightboxRightBtn}`} 
                onClick={handleLightboxNext}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Enlarged Image */}
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <Image
                src={enlargedImage.src}
                alt={enlargedImage.alt}
                fill
                priority
                className={styles.lightboxImg}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
