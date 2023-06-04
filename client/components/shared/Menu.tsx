import React from "react"
import { BsChevronDown } from "react-icons/bs"

import { NAVIGATION_MENU } from "@/constants"
import { CategoryDataIProps, MenuItemHasCategoryIProps } from "@/types"
import MenuItem from "./MenuItem"
import NavLink from "./NavLink"

export interface IProps {
  showSubMenu: boolean
  setShowSubMenu: React.Dispatch<React.SetStateAction<boolean>>
  categories: CategoryDataIProps[]
}

const Menu: React.FC<IProps> = ({ showSubMenu, setShowSubMenu, categories }) => {
  const MenuItemHasCategory: React.FC<{ item: MenuItemHasCategoryIProps }> = ({ item }) => {
    return (
      <div
        className="cursor-pointer py-3 px-7 flex items-center gap-2 relative text-gray-400 hover:text-gray-950"
        onMouseEnter={() => setShowSubMenu(true)}
        onMouseLeave={() => setShowSubMenu(false)}
      >
        {item.name}
        <BsChevronDown size={14} />
        {showSubMenu && (
          <div className="bg-white absolute top-11 left-0 min-w-[250px] flex flex-col text-black shadow-2xl border">
            {categories?.map(({ attributes: { name, slug, products } }) => (
              <MenuItem key={`category-${slug}`} slug={slug} quantity={products?.data?.length}>
                {name}
              </MenuItem>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="hidden md:flex items-center font-medium text-black">
      {NAVIGATION_MENU.map((item) => (
        <div key={item.id} className="relative">
          {!!item.subMenu ? (
            <MenuItemHasCategory item={item} />
          ) : (
            <NavLink href={item.url ?? "/"} customClass="cursor-pointer py-3 px-7">
              {item.name}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  )
}

export default Menu
