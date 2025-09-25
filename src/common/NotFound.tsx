// pages/404.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Animation Variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger children animations
      delayChildren: 0.2, // Delay for the first child animation
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
      delay: 0.4, // Make the image appear slightly after text
    },
  },
};

const NotFound: React.FC = () => {
  return (
    <div className="  bg-gradient-to-br from-white via-pink-50 to-amber-100 flex flex-col">
      <motion.div
        className="flex flex-col items-center justify-center text-center p-8 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={imageVariants}
          className="relative w-64 h-64 mb-8"
        >
          <Image
            src="/cake-images/notfound.png" // Make sure this image exists in public/cake-images/
            alt="Missing cake slice or ingredient"
            fill
            priority
            sizes="256px"
            className="object-contain"
          />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-serif text-pink-700 mb-4 drop-shadow-md"
          variants={itemVariants}
        >
          404 - Oh Crumbs!
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-lg mx-auto"
          variants={itemVariants}
        >
          It looks like this page took a wrong turn and ended up missing.
          Perhaps it got eaten?
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full text-lg shadow-lg
                       transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Go Back to the Bakery
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
