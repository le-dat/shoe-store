import React from "react"

import CartEmpty from "@/components/shared/CartEmpty"
import Meta from "@/components/shared/Meta"
import ProductCard from "@/components/shared/ProductCard"
import Wrapper from "@/components/shared/Wrapper"
import useScrollTop from "@/hooks/useScrollTop"
import useWishList from "@/hooks/useWishList"

const Favorite: React.FC = () => {
  useScrollTop()
  const wishlist = useWishList((state) => state.wishlist)

  return (
    <div className="py-20 mt-10">
      <Meta
        title="Favorite | Dat Shoe"
        description="Fashion shoe"
        image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
      />
      <Wrapper className="flex flex-col items-center justify-center">
        {/* HEADING */}
        <p className="text-2xl md:text-3xl font-semibold leading-tight">Your Wishlist</p>

        {/* CART CONTENT */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-4 mt-3 mb-6">
            {wishlist.map(({ id, product }) => (
              <ProductCard key={`cart-item-${id}`} id={id} product={product} />
            ))}
          </div>
        ) : (
          <CartEmpty title="wishlist" />
        )}
      </Wrapper>
    </div>
  )
}

export default Favorite
