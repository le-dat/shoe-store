import Image from "next/image";
import Link from "next/link";
import React from "react";

import useIsHeart from "@/hooks/useIsHeart";
import { ProductIProps } from "@/types";
import { formatCurrency, getDiscountedPricePercentage } from "@/utils/helper";
import { AiFillShopping, AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

interface IProps {
  id: number | string;
  product: ProductIProps;
}

const ProductCard: React.FC<IProps> = ({ id, product }) => {
  const { isHeart, toggleWishlist } = useIsHeart(id, product);

  const Icon = isHeart ? FcLike : AiOutlineHeart;

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggleWishlist();
  };

  return (
    <div>
      <div className="flex relative bg-gray-100 shadow-md items-center justify-center h-[200px] md:h-[218px] lg:h-[230px] overflow-hidden group/image ">
        <Image
          src={product?.thumbnail?.data?.attributes?.url || "/spinner.svg"}
          className="group-hover/image:scale-90 transition ease-in duration-200 object-contain "
          alt={product?.name}
          width={200}
          height={200}
        />
        <Link
          href={`/product/${product?.slug}`}
          className="hidden group-hover/image:flex absolute items-end justify-center inset-0 z-10 bg-black bg-opacity-10"
        >
          <button className="mb-4 rounded-tl-md rounded-bl-md transition p-3 bg-white text-black hover:bg-black hover:text-white">
            <AiFillShopping size={22} />
          </button>
          <button
            onClick={(e) => handleToggleWishlist(e)}
            className="mb-4 rounded-tr-md rounded-br-md transition p-3 bg-white text-black hover:bg-black hover:text-white"
          >
            <Icon size={22} />
          </button>
        </Link>
      </div>

      <div className="py-2">
        <Link href={`/product/${product?.slug}`}>
          <h2 className="text-lg font-medium hover:text-blue-500 line-camp-2">{product?.name}</h2>
        </Link>
        <div>
          <p className="mr-2 text-xl text-red-500">{formatCurrency(product?.price)}</p>
          {product?.original_price && (
            <div className="flex items-center gap-2">
              <p className="mr-2 text-base text-gray-400 line-through">{formatCurrency(product?.original_price)}</p>
              <p className="text-sm rounded-xl py-1 px-2  bg-yellow-300">
                {getDiscountedPricePercentage(product?.original_price, product?.price)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
