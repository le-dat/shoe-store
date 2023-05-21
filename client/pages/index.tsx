import { GetStaticProps } from "next";
import { Inter } from "next/font/google";

import { HeroBanner, ProductCard, Wrapper } from "@/components";
import { ListProductIProps } from "@/types";
import { fetchData } from "@/utils/api";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await fetchData("api/products?populate=*");
  return {
    props: { data },
  };
};

export default function Home({ data }: ListProductIProps) {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning for Your Miles</div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during
            extended stretches of running.
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4 mt-3 mb-12">
          {data?.map(({ id, attributes }, index) => (
            <ProductCard key={`product-${index}`} product={attributes} id={id} />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}
