import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { ButtonSize, Loading, ProductDetailsCarousel, RelativeProducts, UpdateQuantity, Wrapper } from "@/components";
import useCartStore from "@/hooks/useCartStore";
import useIsHeart from "@/hooks/useIsHeart";
import useScrollTop from "@/hooks/useScrollTop";
import { ListProductIProps } from "@/types";
import { fetchData } from "@/utils/api";
import { formatCurrency, getDiscountedPricePercentage, notify } from "@/utils/helper";

interface IProps {
  product: ListProductIProps;
  productRelative: ListProductIProps;
}

const Product: React.FC<IProps> = ({ product, productRelative }) => {
  useScrollTop();
  const currentProduct = product.data?.[0]?.attributes;
  const currentProductId = product.data?.[0]?.id;
  const { isHeart, toggleWishlist } = useIsHeart(currentProductId, currentProduct);
  const addCartProduct = useCartStore((state) => state.addCartProduct);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!!selectedSize) {
      const data = {
        id: currentProductId,
        product: currentProduct,
        size: selectedSize,
        quantity: 1,
        createAt: moment(Date.now()).format("LLL"),
      };
      addCartProduct(data);
      notify("success", "Product added to cart successfully");
    } else {
      setShowError(true);
    }
  };

  const handleSelectedSize = (size: string) => {
    setShowError(false);
    setSelectedSize(size);
  };

  if (!product) return <Loading />;

  return (
    <main className="w-full py-10 md:py-20 ">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[4rem] lg:gap-[6rem]">
          {/* LEFT COLUMN */}
          <div className="w-full flex-1 pt-4">
            <ProductDetailsCarousel data={currentProduct?.image?.data} />
          </div>
          {/* RIGHT COLUMN  */}
          <div className="flex-1 p-3 flex flex-col ">
            {/* PRODUCT TITLE */}
            <h2 className="text-3xl font-bold">{currentProduct?.name}</h2>
            <p className="text-lg font-semibold">{currentProduct?.subtitle}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-2xl font-semibold ">{formatCurrency(currentProduct?.price)}</span>
              {currentProduct?.original_price && (
                <>
                  <span className="ml-4 text-lg text-gray-400 line-through">
                    {formatCurrency(currentProduct?.original_price)}
                  </span>
                  <span className="ml-auto text-lg font-bold text-green-700">
                    {getDiscountedPricePercentage(currentProduct?.original_price, currentProduct?.price)}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500">incl. of taxes</p>
            <p className="text-gray-500">(Also includes all applicable duties)</p>

            {/* PRODUCT SIZE RANGE */}
            <div className="my-6">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Select Size</p>
                <p className="text-gray-500">Select Guide</p>
              </div>
              {/* BODY */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {currentProduct?.size?.data?.map((item, index) => (
                  <ButtonSize
                    key={`${item?.size}-${index}`}
                    title={item?.size}
                    active={selectedSize === item?.size}
                    onClick={() => handleSelectedSize(item?.size)}
                    disabled={item?.enabled === false}
                  />
                ))}
              </div>
              {/* ERROR */}
              {showError && <p className="text-red-700 mt-6 font-medium">Size selection is required</p>}
            </div>

            {/* ADD TO CART BUTTON */}
            <button
              className="w-full py-4 rounded-full text-center bg-black border cursor-pointer text-white mt-6 hover:opacity-80"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            {/* ADD CART TO WISHLIST BUTTON*/}
            <button
              className={`w-full py-4 rounded-full text-center border border-gray-400 cursor-pointer mt-3 flex items-center justify-center gap-2 hover:opacity-80 ${
                isHeart ? "bg-red-400 text-white" : ""
              }`}
              onClick={toggleWishlist}
            >
              WishList
              {isHeart ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>

            {/* DETAIL  */}
            <div className="mt-4">
              <p className="text-lg font-bold mb-5">Product Details</p>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{currentProduct?.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* RELATIVE PRODUCT */}
        <RelativeProducts products={productRelative} />
      </Wrapper>
    </main>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchData(`api/products?populate=*`);
  const paths = products?.data?.map((c: { attributes: { slug: string } }) => ({
    params: {
      slug: c?.attributes?.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params || {}; // add null checking for params

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const product = await fetchData(`api/products?populate=*&filters[slug][$eq]=${slug}`);
  const productRelative = await fetchData(`api/products?populate=*&filters[slug][$ne]=${slug}`);
  return {
    props: {
      product,
      productRelative,
    },
  };
};
