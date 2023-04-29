import { create } from "zustand";

import { WishlistIProps } from "@/types";

interface IProps {
  wishlist: WishlistIProps[];
  getCartWishlist: (id: number | string) => WishlistIProps | undefined;
  addCartWishList: (data: WishlistIProps) => void;
  removeCartWishlist: (id: number | string) => void;
}

export const useWishlistStore = create<IProps>((set, get) => ({
  wishlist: [],
  getCartWishlist: (id) => get().wishlist.find((p) => p.id === id),

  addCartWishList: ({ id, product }) => {
    const existingProduct = get().wishlist.find((p) => p.id === id);
    if (!existingProduct) {
      // If product isn't exists, push its into wishlist
      const newProducts = [...get().wishlist, { id, product }];
      return set({ wishlist: newProducts });
    }
  },

  removeCartWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== id) })),
}));
