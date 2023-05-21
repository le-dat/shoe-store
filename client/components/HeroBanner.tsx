import Image from "next/image";
import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { BANNERS } from "@/constants";

const HeroBanner: React.FC = () => {
  return (
    <div className="mt-16 md:mt-12 lg:mt-4">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPre) => (
          <div
            onClick={clickHandler}
            className="absolute [-webkit-tap-highlight-color:transparent] z-10 cursor-pointer right-[3.5rem] md:right-[4rem] bottom-0 py-3 px-5 bg-black text-white flex items-center justify-center opacity-80 hover:opacity-100"
          >
            <FcPrevious className="text-md md:text-2xl" color={"#fff"} />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute [-webkit-tap-highlight-color:transparent] z-10 cursor-pointer right-0 bottom-0 py-3 px-5 bg-black text-white flex items-center justify-center opacity-80 hover:opacity-100"
          >
            <FcNext className="text-md md:text-2xl" color={"#fff"} />
          </div>
        )}
      >
        {BANNERS.map((item, index) => (
          <div key={`banner-${index}`}>
            <Image
              src={item}
              alt={item}
              width={1000}
              height={1000}
              className="object-cover aspect-[16/10] md:aspect-auto "
            />
            <div className="[-webkit-tap-highlight-color:transparent] px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] uppercase font-medium cursor-pointer hover:opacity-90">
              Shop now
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
