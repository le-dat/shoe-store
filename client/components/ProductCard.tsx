import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ProductIProps } from "@/types";
import { formatCurrency, getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard: React.FC<ProductIProps> = ({
  name,
  subtitle,
  description,
  price,
  original_price,
  size,
  image,
  thumbnail,
  slug,
}) => {
  return (
    <Link href={`/product/${slug}`} className=" hover:scale-105 transition [-webkit-tap-highlight-color:transparent]">
      <Image
        src={thumbnail?.data?.attributes?.url}
        alt={name}
        width={300}
        height={300}
        className="object-cover w-full md:max-h-[376px] lg:max-h-[330px]"
      />
      <div className="p-4">
        <h2 className="text-lg font-medium">{name}</h2>
        <div className="flex items-center">
          <p className="mr-2 text-xl font-semibold">{formatCurrency(price)}</p>
          {original_price && (
            <>
              <p className="mr-2 text-lg text-gray-400 line-through">{formatCurrency(original_price)}</p>
              <p className="ml-auto text-lg font-bold text-green-700">
                {getDiscountedPricePercentage(original_price, price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
