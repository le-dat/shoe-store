import { GetStaticProps } from "next"
import { Inter } from "next/font/google"

import HeroBanner from "@/components/shared/HeroBanner"
import ProductCard from "@/components/shared/ProductCard"
import Wrapper from "@/components/shared/Wrapper"
import useScrollTop from "@/hooks/useScrollTop"
import * as httpRequest from "@/request/httpRequest"
import { ListProductIProps } from "@/types"
import Meta from "@/components/shared/Meta"

const inter = Inter({ subsets: ["latin"] })

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await httpRequest.get("/products?populate=*")
  return {
    props: { data },
  }
}

export default function Home({ data }: ListProductIProps) {
  useScrollTop()

  return (
    <main>
      <Meta
        title="Home | Dat Shoe"
        description="Fashion shoe"
        image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
      />
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
  )
}
