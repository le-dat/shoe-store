import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

import { navigation } from "@/constants";
import { CategoryDataIProps, MenuItemHasCategoryIProps } from "@/types";
import { useRouter } from "next/router";

export interface IProps {
  showSubMenu: boolean;
  setShowSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryDataIProps[];
}

const Menu: React.FC<IProps> = ({ showSubMenu, setShowSubMenu, categories }) => {
  const { query } = useRouter();

  const MenuItemHasCategory: React.FC<{ item: MenuItemHasCategoryIProps }> = ({ item }) => {
    return (
      <div
        className="cursor-pointer py-3 px-7 flex items-center gap-2 relative"
        onMouseEnter={() => setShowSubMenu(true)}
        onMouseLeave={() => setShowSubMenu(false)}
      >
        {item.name}
        <BsChevronDown size={14} />
        {showSubMenu && (
          <div className="bg-white absolute top-11 left-0 min-w-[250px] flex flex-col text-black shadow-lg">
            {categories?.map(({ attributes: { name, slug, products } }) => (
              <Link
                key={`category-${slug}`}
                href={`/category/${slug}`}
                className={`${
                  query.slug === slug ? "bg-gray-200" : ""
                } cursor-pointer py-3 px-7 hover:bg-gray-100 flex items-center justify-between capitalize`}
              >
                {name}
                <span className="rounded-full w-7 h-7 flex items-center justify-center bg-gray-200">
                  {products?.data?.length}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hidden md:flex items-center font-medium text-black">
      {navigation.map((item) => (
        <div key={item.id} className="relative">
          {!!item.subMenu ? (
            <MenuItemHasCategory item={item} />
          ) : (
            <Link href={item.url ?? "/"} className="cursor-pointer py-3 px-7 opacity-70 hover:opacity-100">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
