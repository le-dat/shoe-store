import { create } from "zustand";

import { CartProductIProps } from "@/types";

interface IProps {
  cartProducts: CartProductIProps[];
  addCartProduct: (data: CartProductIProps) => void;
  removeCartProduct: (id: number | string) => void;
  updateCartProduct: (data: CartProductIProps) => void;
}

export const useCartStore = create<IProps>((set, get) => ({
  cartProducts: [],
  addCartProduct: ({ id, product, quantity, size, createAt }) => {
    const existingProduct = get().cartProducts.find((p) => p.id === id && p.size === size);
    if (existingProduct) {
      // If product already exists, increment its quantity
      const updatedProducts = get().cartProducts.map((p) =>
        p.id === id && p.size === size ? { ...p, quantity: p.quantity + quantity, size, createAt } : p
      );
      return set({ cartProducts: updatedProducts });
    } else {
      // Otherwise, add the new product to the cart
      const newProducts = [...get().cartProducts, { id, product, quantity, size, createAt }];
      return set({ cartProducts: newProducts });
    }
  },

  removeCartProduct: (id) => set((state) => ({ cartProducts: state.cartProducts.filter((p) => p.id !== id) })),

  updateCartProduct: ({ id, quantity, size, createAt }) => {
    const updatedProducts = get().cartProducts.map((p) =>
      p.id === id && p.createAt === createAt ? { ...p, quantity, size } : p
    );
    return set({ cartProducts: updatedProducts });
  },
}));
