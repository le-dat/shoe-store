import React from "react";

import { CartEmpty, ProductCard, Wrapper } from "@/components";
import { useWishlist } from "@/hooks/useWishlist";

const Favorite: React.FC = () => {
  const wishlist = useWishlist((state) => state.wishlist);
  return (
    <div className="py-20 mt-10">
      <Wrapper className="flex flex-col items-center justify-center">
        {/* HEADING */}
        <p className="text-2xl md:text-3xl font-semibold leading-tight">Your Wishlist</p>

        {/* CART CONTENT */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 mt-3 mb-6">
            {wishlist.map((product) => (
              <ProductCard key={`cart-item-${product.id}`} {...product.product} />
            ))}
          </div>
        ) : (
          <CartEmpty title="wishlist" />
        )}
      </Wrapper>
    </div>
  );
};

export default Favorite;