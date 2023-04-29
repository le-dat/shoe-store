import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { useCartStore } from "@/store/cartStore";
import { CartProductIProps } from "@/types";
import { formatCurrency, notify } from "@/utils/helper";

const CartItem: React.FC<CartProductIProps> = ({ id, product, quantity, size, createAt }) => {
  const removeCartProduct = useCartStore((state) => state.removeCartProduct);
  const updateCartProduct = useCartStore((state) => state.updateCartProduct);

  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCartProduct({ id, product, quantity, size: e.target.value, createAt });
  };

  const handleChangeQuantity = (type: string) => {
    if (type === "add") {
      updateCartProduct({ id, product, quantity: quantity + 1, size, createAt });
    } else {
      if (quantity > 1) {
        updateCartProduct({ id, product, quantity: quantity - 1, size, createAt });
      }
    }
  };

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
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              name="size"
              defaultValue={size}
              className="hover:text-black text-gray-800 p-1"
              onChange={(e) => handleChangeSize(e)}
            >
              {product.size.data.map((s, index) => (
                <option key={`size-${id}-${index}`} value={s.size} disabled={!s.enabled}>
                  {s.size}
                </option>
              ))}
            </select>

            <div className="lg:ml-5 flex items-center gap-3">
              <button
                className={`bg-gray-300 rounded-md p-2 ${quantity === 1 ? "opacity-40" : ""}`}
                disabled={quantity === 1}
                onClick={() => handleChangeQuantity("minus")}
              >
                <AiOutlineMinus />
              </button>
              {quantity}
              <button className="bg-gray-300 rounded-md p-2" onClick={() => handleChangeQuantity("add")}>
                <AiOutlinePlus />
              </button>
            </div>
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
