"use client";

import React from "react";
import Image from "next/image";
import styles from "./BackgroundCollage.module.css";

interface CollageItem {
  id: number;
  src: string;
  alt: string;
  className: string;
}

const collageItems: CollageItem[] = [
  {
    id: 1,
    src: "/assets/collage_1.png",
    alt: "d1ggas crew posing at gold star backdrop event",
    className: styles.pos1,
  },
  {
    id: 2,
    src: "/assets/collage_2.png",
    alt: "d1ggas crew taking mirror selfie",
    className: styles.pos2,
  },
  {
    id: 3,
    src: "/assets/collage_3.jpg",
    alt: "d1ggas group hugging at waterpark pool",
    className: styles.pos3,
  },
  {
    id: 4,
    src: "/assets/collage_4.jpg",
    alt: "d1ggas academic certificates achievements award group photo",
    className: styles.pos4,
  },
  {
    id: 5,
    src: "/assets/collage_5.jpg",
    alt: "d1ggas dining together at Wingboss table",
    className: styles.pos5,
  },
];

export default function BackgroundCollage() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {collageItems.map((item) => (
          <div key={item.id} className={`${styles.item} ${item.className}`}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={item.id <= 2}
              className={styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.overlay} />
    </div>
  );
}
