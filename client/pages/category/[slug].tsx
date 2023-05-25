import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { ButtonPagination, FilterProductPrice, Loading, ProductCard, Wrapper } from "@/components";
import { ListProductIProps, ProductIProps } from "@/types";
import * as httpRequest from "@/request/httpRequest";
import useScrollTop from "@/hooks/useScrollTop";
import useTitleDocument from "@/hooks/useTitleDocument";

interface IProps {
  category: any;
  products: ProductIProps[];
  slug: string;
}
const maxResult = 8;

const Category: React.FC<IProps> = () => {
  const { query } = useRouter();
  const [pageIndex, setPageIndex] = useState<number>(1);
  // const { data, error, isLoading }: { data: ListProductIProps; error: any; isLoading: boolean } = useSWR(
  //   `/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
  //   httpRequest.get,
  //   { fallbackData: products }
  // );
  const [data, setData] = useState<ListProductIProps>({ data: [], meta: { pagination: {} } });
  const [loading, setLoading] = useState<boolean>(false);
  useScrollTop();
  useTitleDocument(`${query.slug} | Dat Shoes`);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await httpRequest.get(
        `/products?populate=*&filters[categories][slug][$eq]=${query.slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`
      );
      setData(res);
      setLoading(false);
    };

    fetchData();
  }, [query.slug]);

  useEffect(() => {
    setPageIndex(1);
  }, [query.slug]);

  return (
    <main className="w-full md:py-20">
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

        {loading && <Loading />}
      </Wrapper>
    </main>
  );
};

export default Category;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const category = await httpRequest.get(`/categories?populate=*`);
//   const paths = category?.data?.map((c: { attributes: { slug: string } }) => ({
//     params: {
//       slug: c.attributes.slug,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params || {}; // add null checking for params

//   if (!slug) {
//     return {
//       notFound: true,
//     };
//   }

//   const category = await httpRequest.get(`/categories?filters[slug][$eq]=${slug}`);
//   const products = await httpRequest.get(
//     `/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
//   );
//   return {
//     props: {
//       category,
//       products,
//       slug: slug,
//     },
//   };
// };
