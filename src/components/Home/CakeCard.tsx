"use client";
import ProductCard from "@/common/ProductCard";
import { products } from "@/data/productData";

export default function CakeCard() {
  return (
    <main className="container mx-auto px-5 py-10">
      <h2 className="text-center md:text-7xl text-3xl text-pink-700 mb-12">
        Our Sweetest Creations
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </main>
  );
}
