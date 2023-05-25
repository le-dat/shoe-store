import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

import { NAVIGATION_MENU } from "@/constants";
import { CategoryDataIProps, MenuItemHasCategoryIProps } from "@/types";
import { useRouter } from "next/router";

export interface IProps {
  showSubMenu: boolean;
  setShowSubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileMenu: boolean;
  categories: CategoryDataIProps[];
}

const MenuMobile: React.FC<IProps> = ({
  showSubMenu,
  setShowSubMenu,
  showMobileMenu,
  setShowMobileMenu,
  categories,
}) => {
  const { query } = useRouter();

  const MenuItemHasCategory: React.FC<{ item: MenuItemHasCategoryIProps }> = ({ item }) => {
    return (
      <div className="cursor-pointer transition" onClick={() => setShowSubMenu(!showSubMenu)}>
        <div className="flex items-center gap-2 py-3 px-7 opacity-70 hover:opacity-100 hover:bg-slate-400">
          {item.name}
          <BsChevronDown size={14} />
        </div>
        {showSubMenu && (
          <div className=" w-full flex flex-col text-white shadow-lg">
            {categories?.map(({ attributes: { name, slug, products } }) => (
              <Link
                key={`category-mobile-${slug}`}
                href={`/category/${slug}`}
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowSubMenu(false);
                }}
                className={`${
                  query.slug === slug ? "bg-slate-400" : ""
                } cursor-pointer flex items-center justify-between py-3 pr-3 pl-12 hover:bg-slate-300 capitalize`}
              >
                {name}
                <span className="rounded-full w-7 h-7 flex items-center justify-center bg-gray-700">
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
    <div
      className={`block md:hidden w-3/4 bg-gray-500 h-screen fixed z-50 top-0 bottom-0 left-0 pt-5 font-bold text-white -translate-x-full transition ${
        showMobileMenu && "translate-x-0"
      }`}
    >
      {NAVIGATION_MENU.map((item) => (
        <div key={item.id} className="flex flex-col">
          {!!item.subMenu ? (
            <MenuItemHasCategory item={item} />
          ) : (
            <Link
              href={item.url ?? ""}
              className="cursor-pointer py-3 px-7 opacity-70 hover:opacity-100 hover:bg-slate-400"
              onClick={() => setShowMobileMenu(false)}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuMobile;
