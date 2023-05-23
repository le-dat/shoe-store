import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import useCartStore from "@/hooks/useCartStore";
import { CartProductIProps } from "@/types";
import { formatCurrency, notify } from "@/utils/helper";
import UpdateSize from "./UpdateSize";
import UpdateQuantity from "./UpdateQuantity";

const CartItem: React.FC<CartProductIProps> = ({ id, product, quantity, size, createAt }) => {
  const props = { id, product, quantity, size, createAt };
  const removeCartProduct = useCartStore((state) => state.removeCartProduct);

  const handleRemove = () => {
    removeCartProduct(id);
    notify("success", "Product removed from cart successfully");
  };

  return (
    <div className="flex gap-3 p-3 border-b hover:bg-gray-100 cursor-pointer transition rounded-lg [-webkit-tap-highlight-color:transparent]">
      <Link href={`/product/${product.slug}`} className="">
        <Image
          src={product.thumbnail.data.attributes.url}
          alt={product.name}
          width={120}
          height={120}
          className="rounded-lg"
        />
      </Link>
      <div className="flex flex-wrap flex-1 justify-between ">
        <div className="text-left ">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-400 font-medium ">{product.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-2 mt-4">
            <UpdateSize {...props} />
            <UpdateQuantity {...props} />
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-1 mt-4 lg:mt-0">
          <div className="hidden lg:block text-lg font-lg">{createAt}</div>
          <p className="text-gray-400 font-medium ">{formatCurrency(product.price * quantity)}</p>
          <button
            onClick={handleRemove}
            className="flex items-center justify-center p-3 cursor-pointer hover:bg-gray-300 rounded-full  [-webkit-tap-highlight-color:transparent]"
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
