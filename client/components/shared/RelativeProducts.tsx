import React from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import { ListProductIProps } from "@/types"
import ProductCard from "./ProductCard"

interface IProps {
  products: ListProductIProps
}
const RelativeProduct: React.FC<IProps> = ({ products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  }
  return (
    <div className="relative z-0 mt-[4rem] lg:mt-[8rem] ">
      <div className="text-2xl font-bold mb-5">You Might Also Like</div>
      <Carousel responsive={responsive} autoPlay containerClass="-mx-[10px]" itemClass="px-[10px]">
        {products.data?.map(({ id, attributes }, index: number) => (
          <ProductCard key={`relative-product-${id}-${index}`} product={attributes} id={id} />
        ))}
      </Carousel>
    </div>
  )
}

export default RelativeProduct
