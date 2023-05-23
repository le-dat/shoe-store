import useCartStore from "@/hooks/useCartStore";
import { CartProductIProps } from "@/types";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const UpdateQuantity: React.FC<CartProductIProps> = ({ id, product, quantity, size, createAt }) => {
  const updateCartProduct = useCartStore((state) => state.updateCartProduct);

  const handleChangeQuantity = (type: string) => {
    if (type === "add") {
      updateCartProduct({ id, product, quantity: quantity + 1, size, createAt });
    } else {
      if (quantity > 1) {
        updateCartProduct({ id, product, quantity: quantity - 1, size, createAt });
      }
    }
  };

  return (
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
  );
};

export default UpdateQuantity;
