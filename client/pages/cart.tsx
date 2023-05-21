import Image from "next/image";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { CartEmpty, CartItem, Wrapper } from "@/components";
import useCartStore from "@/hooks/useCartStore";
import { formatCurrency, getTotalPrice } from "@/utils/helper";
import { makePaymentRequest } from "@/utils/api";
import useScrollTop from "@/hooks/useScrollTop";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface IProps {}
const Cart: React.FC<IProps> = () => {
  useScrollTop();
  const [loading, setLoading] = useState<boolean>(false);
  const cartProducts = useCartStore((state) => state.cartProducts);

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("api/orders", { products: cartProducts });
      await stripe?.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 mb-10">
      <Wrapper className="flex flex-col items-center justify-center">
        {/* HEADING */}
        <p className="text-2xl md:text-3xl font-semibold leading-tight">Shopping Cart</p>

        {/* CART CONTENT */}
        {cartProducts.length > 0 ? (
          <div className="flex flex-wrap gap-12 py-10 px-4">
            {/* CART ITEMS  */}
            <div className="flex-[2]">
              <p className="text-lg font-semibold">Cart Item</p>
              {cartProducts.map((product) => (
                <CartItem key={`cart-item-${product.id}`} {...product} />
              ))}
            </div>

            {/* SUMMARY */}
            <div className="flex-1">
              <div className="sticky top-[8rem]">
                <p className="text-lg font-semibold">Summary</p>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="uppercase text-lg md:text-xs lg:text-lg font-medium text-black">Subtotal</span>
                    <span className="text-lg font-medium text-black">
                      {formatCurrency(getTotalPrice(cartProducts))}
                    </span>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order, including duties and taxes, before any
                    applicable discounts. It does not include delivery costs and international transaction fees.
                  </div>
                </div>

                {/* BUTTON CHECKOUT */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-full bg-black text-white cursor-pointer [-webkit-tap-highlight-color:transparent] ${
                    loading ? "opacity-50" : ""
                  }`}
                  onClick={handleCheckOut}
                  disabled={loading}
                >
                  {loading && <Image src="/spinner.svg" alt="spinner" width={10} height={10} />}
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <CartEmpty />
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
