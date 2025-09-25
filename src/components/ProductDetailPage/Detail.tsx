"use client";

import { products } from "@/data/productData";
import { formatToHyphenated } from "@/utils/FormatName";
import { useParams } from "next/navigation";
import React from "react";
import HeroSection from "./Hero";
import NotFound from "@/common/NotFound";

const Detail = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const data = products.find((data) => formatToHyphenated(data.title) === slug);

  if (!data) return <NotFound/>;
  return (
    <div>
      <HeroSection
        imageSrc={data?.imageSrc ?? ""} // Must be in your public folder
        title={data?.title ?? ""}
        slogan="Where every bite is a celebration!"
        buttonText="View Our Delicious Menu"
        buttonLink="#products"
      />
    </div>
  );
};

export default Detail;
