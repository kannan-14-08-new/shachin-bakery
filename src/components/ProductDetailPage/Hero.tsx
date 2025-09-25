// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// --- 1. Interface for Reusability (TypeScript) ---
interface HeroSectionProps {
  imageSrc: string;
  title: string;
  slogan: string;
  buttonText: string;
  buttonLink: string;
}

// --- 2. Framer Motion Variants (Typed for no error) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time delay between children animating
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // Smooth, natural spring animation
      stiffness: 100,
      damping: 10,
    },
  },
};

// --- 3. The Component ---
const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  title,
  slogan,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="relative h-[70vh] md:h-[100vh] overflow-hidden mx-5 my-4 rounded-3xl">
      {/* Background Image (fills container) */}
      <Image
        src={imageSrc} // Dynamic image source via props
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105" // Hover animation
      />

      {/* Overlay and Content Container */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        {/* Animated Text Container */}
        <motion.div
          className="text-center text-white px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Animated Slogan */}
          <motion.p
            className="text-xl md:text-3xl lg:text-4xl font-light tracking-wide drop-shadow-md"
            variants={itemVariants}
          >
            {slogan}
          </motion.p>

          {/* Animated Button */}
          <motion.a
            href={buttonLink}
            className="mt-8 inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full text-lg shadow-lg
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
