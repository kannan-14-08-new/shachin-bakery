"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Recommended icon library for Next/React

// Define your cake images here
const images = [
  {
    url: "/cake-images/IMG-20250925-WA0009.jpg",
    alt: "Elegant Wedding Cake",
    title: "Elegant Wedding Cakes",
  },
  {
    url: "/cake-images/IMG-20250925-WA0008.jpg",
    alt: "Rich Chocolate Fudge Cake",
    title: "Rich Chocolate Fudge Delights",
  },
  {
    url: "/cake-images/IMG-20250925-WA0026.jpg",
    alt: "Fresh Berry Tartlets",
    title: "Fresh Berry Seasonal Treats",
  },
  {
    url: "/cake-images/IMG-20250925-WA0049.jpg",
    alt: "Custom Birthday Cupcakes",
    title: "Custom Birthday Cupcakes",
  },
];

const INTERVAL_TIME = 5000;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Navigation Logic ---
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  // --- Interval Management ---
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, INTERVAL_TIME);
  }, [nextSlide]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  }, [startInterval]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      resetInterval();
    },
    [resetInterval]
  );

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // --- Interaction Handler ---
  const handleInteraction = useCallback(() => {
    resetInterval();
  }, [resetInterval]);

  return (
    <div
      className="relative h-[60vh] md:h-[80vh] overflow-hidden cursor-pointer m-5 rounded-[20px]"
      onMouseEnter={handleInteraction} // For desktop users
      onTouchStart={handleInteraction} // For mobile users (touch)
    >
      {/* --- 1. Image Slides --- */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            {/* Background Image (Better for scaling/covering) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform"
              style={{
                backgroundImage: `url(${image.url})`,
                // Extra Animation: Slightly zoom in on the current image
                transform: currentIndex === index ? "scale(1.05)" : "scale(1)",
              }}
            ></div>

            {/* Overlay and Title */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl md:text-6xl  text-white mb-4 drop-shadow-lg animate-fadeInUp">
                {image.title}
              </h2>
              <p className="text-xl text-pink-100 tracking-wider animate-fadeIn delay-300">
                Baked Fresh Daily
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- 2. X-Scroll Navigation Buttons --- */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-pink-600/70 text-white rounded-full hover:bg-pink-700 transition duration-300 z-10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-pink-600/70 text-white rounded-full hover:bg-pink-700 transition duration-300 z-10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* --- 3. Bottom Indicator Bar (Dot Navigation) --- */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white scale-125 shadow-lg" // Active dot style
                : "bg-white/50 hover:bg-white/80" // Inactive dot style
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
