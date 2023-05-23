import useCartStore from "@/hooks/useCartStore";
import { CartProductIProps } from "@/types";
import React from "react";

const UpdateSize: React.FC<CartProductIProps> = ({ id, product, quantity, size, createAt }) => {
  const updateCartProduct = useCartStore((state) => state.updateCartProduct);

  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCartProduct({ id, product, quantity, size: e.target.value, createAt });
  };

  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
};

export default UpdateSize;
