// components/ProductCard.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightCircle, Star } from "lucide-react";
import React from "react"; // Import React for FC (Function Component) typing
import Link from "next/link";
import { formatToHyphenated } from "@/utils/FormatName";

// Using the interface defined above (assuming you put it in types.ts or define it here)
export interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  animationDelay?: number; // Optional prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  rating,
  reviews,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      className="bg-pink-900 rounded-xl shadow-lg overflow-hidden cursor-pointer
                 flex flex-col h-full group hover:shadow-2xl transition-shadow duration-300"
      // Framer Motion Animation Props
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Product Image */}
      <Link href={`/${formatToHyphenated(title)}`}>
        <div className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            width={1080}
            height={720}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 h-full w-full"
          />
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col justify-between">
          <h3 className="text-2xl text-white mb-2 leading-tight">{title}</h3>

          {/* Rating and Reviews */}
          <div className="flex items-center text-white mb-3">
            <div className="flex text-amber-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  // Determine if the star should be filled based on the rating prop
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? "fill-current" : "text-white"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-white">
              {rating.toFixed(1)} ({reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex justify-between gap-3 items-center">
            <p className="text-3xl font-bold text-white">₹{price.toFixed(2)}</p>
            <span>
              <ArrowRightCircle color="white" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
