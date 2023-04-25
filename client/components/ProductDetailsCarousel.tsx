import React from "react";
import { Carousel } from "react-responsive-carousel";

import { ImageDataIProps } from "@/types";

interface IProps {
  data: ImageDataIProps[];
}
const ProductDetailsCarousel: React.FC<IProps> = ({ data }) => {
  return (
    <div className="sticky top-10">
      <Carousel
        className="productCarousel"
        autoPlay
        infiniteLoop
        thumbWidth={60}
        showIndicators={false}
        showStatus={false}
      >
        {data.map(({ attributes }, index) => (
          <div key={`product-details-carousel-${index}`}>
            <img src={attributes?.url} alt={`product-details-carousel-${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
