import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import useSWR from "swr"

import ButtonPagination from "@/components/shared/ButtonPagination"
import FilterProductPrice from "@/components/shared/FilterProductPrice"
import Loading from "@/components/shared/Loading"
import Meta from "@/components/shared/Meta"
import Wrapper from "@/components/shared/Wrapper"
import useScrollTop from "@/hooks/useScrollTop"
import * as httpRequest from "@/request/httpRequest"
import { ListProductIProps, ProductIProps } from "@/types"

interface IProps {
  category: any
  products: ProductIProps[]
  slug: string
}
const maxResult = 8

const Category: React.FC<IProps> = ({ category, products, slug }) => {
  const { query } = useRouter()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const { data, error, isLoading }: { data: ListProductIProps; error: any; isLoading: boolean } = useSWR(
    `/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    httpRequest.get,
    { fallbackData: products },
  )
  useScrollTop()

  useEffect(() => {
    setPageIndex(1)
  }, [query.slug])

  return (
    <main className="w-full md:py-20">
      <Meta
        title={`${query.slug} | Dat Shoes`}
        description="Fashion shoe"
        image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
      />
      <Wrapper>
        {/* TITLE */}
        <div className="text-center mx-auto mt-24 md:mt-7 mb-10">
          <div className="text-[1.6rem] md:text-[2.2rem] font-semibold capitalize">{query?.slug}</div>
        </div>

        {data?.data?.length > 0 && <FilterProductPrice products={data.data} />}

        {/* PAGINATION BUTTON */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex items-center justify-end gap-4  md:mb-0 mt-8 md:mt-12 mb-4">
            <ButtonPagination title="Previous" onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1} />

            <span className="mx-3">{`${pageIndex} of ${data?.meta?.pagination?.pageCount}`}</span>

            <ButtonPagination
              title="Next"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={pageIndex === data?.meta?.pagination?.pageCount}
            />
          </div>
        )}

        {isLoading && <Loading />}
      </Wrapper>
    </main>
  )
}

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const category = await httpRequest.get(`/categories?populate=*`)
  const paths = category?.data?.map((c: { attributes: { slug: string } }) => ({
    params: {
      slug: c.attributes.slug,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params || {} // add null checking for params

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const category = await httpRequest.get(`/categories?filters[slug][$eq]=${slug}`)
  const products = await httpRequest.get(
    `/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`,
  )
  return {
    props: {
      category,
      products,
      slug: slug,
    },
  }
}
