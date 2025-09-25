"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cakeImages } from "@/data/productData";

// 1. Define the TypeScript Interface for a single cake image object
interface CakeImage {
  src: string;
  alt: string;
  className: string;
}

// 2. Type the props for the ImageModal component
interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

// A simple Modal component with smooth transition
const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    // Modal Overlay: Backdrop with blur and fade-in transition
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out"
      onClick={onClose}
    >
      {/* Modal Content container: This holds the image and the button. */}
      {/* We use a custom inline style here for the scale/opacity transition on mount. */}
      <div
        className="relative max-w-4xl max-h-[90vh] w-11/12 md:w-3/4 lg:w-1/2 overflow-hidden"
        style={{
          transform: "scale(1)",
          opacity: 1,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full Image Display Container: THIS IS THE CRITICAL FIX */}
        {/* Added 'aspect-video' and 'max-h-full' to give the container explicit dimensions */}
        <div className="relative w-full max-h-full aspect-video">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            // object-contain ensures the image fits fully inside the container
            className="object-contain"
          />
        </div>

        {/* Close Button: Absolute position, inset the image */}
      </div>
    </div>
  );
};

// --- (Images component remains the same) ---

const Images: React.FC = () => {
  const [modalImage, setModalImage] = useState<CakeImage | null>(null);

  const openModal = (image: CakeImage) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="flex flex-col gap-8 px-5 py-10">
      <h1 className="text-pink-600 font-serif text-center md:text-7xl text-4xl">
        Cake Collections 🍰
      </h1>

      <div className="grid grid-cols-5 grid-rows-5 gap-4 h-[700px] md:h-[900px] w-full mx-auto">
        {cakeImages.map((image, index) => (
          <div
            key={index}
            className={
              image.className +
              " relative group overflow-hidden rounded-lg shadow-xl cursor-pointer"
            }
            onClick={() => openModal(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-xl font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Images;
