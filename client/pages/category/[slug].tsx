import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { ButtonPagination, Loading, ProductCard, Wrapper } from "@/components";
import { ListProductIProps, ProductIProps } from "@/types";
import { fetchData } from "@/utils/api";

interface IProps {
  category: any;
  products: ProductIProps[];
  slug: string;
}
const maxResult = 3;

const Category: React.FC<IProps> = ({ category, products, slug }) => {
  const { query } = useRouter();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { data, error, isLoading }: { data: ListProductIProps; error: any; isLoading: boolean } = useSWR(
    `api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchData,
    { fallbackData: products }
  );

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <main className="w-full md:py-20">
      <Wrapper>
        {/* TITLE */}
        <div className="text-center mx-auto mt-24 md:mt-7 mb-10">
          <div className="text-[1.6rem] md:text-[2.2rem] font-semibold capitalize">{query?.slug}</div>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {data.data?.map(({ attributes }, index: number) => (
            <ProductCard key={`product-filter-${index}`} {...attributes} />
          ))}
        </div>

        {/* PAGINATION BUTTON */}
        {data.meta?.pagination?.total > maxResult && (
          <div className="flex items-center justify-center gap-4 mt-2 mb-8 md:mb-0">
            <ButtonPagination title="Previous" onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1} />

            <span className="mx-3">{`${pageIndex} of ${data.meta?.pagination?.pageCount}`}</span>

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
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const category = await fetchData(`api/categories?populate=*`);
  const paths = category?.data?.map((c: { attributes: { slug: string } }) => ({
    params: {
      slug: c.attributes.slug,
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

  const category = await fetchData(`api/categories?filters[slug][$eq]=${slug}`);
  const products = await fetchData(
    `api/products?populate=[filter][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );
  return {
    props: {
      category,
      products,
      slug: slug,
    },
  };
};
