import { ProductDataIProps } from "@/types";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface IProps {
  products: ProductDataIProps[];
}
interface PriceRange {
  value: string;
  label: string;
}
const priceRanges: PriceRange[] = [
  { value: "0-50", label: "Less than $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-200", label: "$100 - $200" },
];

const FilterProductPrice: React.FC<IProps> = ({ products }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<ProductDataIProps[]>(products);

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedPriceRange.includes(value)) {
      setSelectedPriceRange(selectedPriceRange.filter((range) => range !== value));
    } else {
      setSelectedPriceRange([...selectedPriceRange, value]);
    }
  };

  const filteredProducts = products.filter(({ attributes }) => {
    if (selectedPriceRange.length === 0) {
      return true; // No price range selected, return all products
    }

    return selectedPriceRange.some((range) => {
      const [min, max] = range.split("-");
      return attributes.price >= parseInt(min) && attributes.price <= parseInt(max);
    });
  });

  useEffect(() => {
    setProductFilter(filteredProducts);
  }, [selectedPriceRange]);

  return (
    <div className="flex justify-between gap-2 md:gap-0 flex-wrap">
      {/* FILTER */}
      <div>
        <div className="uppercase">Price</div>
        {priceRanges.map((range) => (
          <label key={range.value} className="flex items-center gap-3 mt-2 py-2 text-gray-500 hover:text-black ">
            <input
              type="checkbox"
              value={range.value}
              checked={selectedPriceRange.includes(range.value)}
              onChange={handlePriceRangeChange}
            />
            {range.label}
          </label>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {productFilter.map(({ id, attributes }, index: number) => (
          <ProductCard key={`product-filter-${index}`} product={attributes} id={id} />
        ))}
      </div>
    </div>
  );
};

export default FilterProductPrice;
