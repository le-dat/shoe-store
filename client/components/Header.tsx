("use client");

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BsCart3, BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import useCartStore from "@/hooks/useCartStore";
import useWishList from "@/hooks/useWishList";
import ButtonNavigation from "./ButtonNavigation";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Wrapper from "./Wrapper";
import useModalSearch from "@/hooks/useModalSearch";
import * as httpRequest from "@/request/httpRequest";

const Header: React.FC = () => {
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState<boolean>(true);
  const [categories, setCategories] = useState<any>(0);
  const cartProducts = useCartStore((state) => state.cartProducts);
  const wishList = useWishList((state) => state.wishlist);
  const setShowModal = useModalSearch((state) => state.setShowModal);
  const IconMenuMobile = showMobileMenu ? MdClose : AiOutlineMenu;

  // scroll header
  useEffect(() => {
    const handleScroll = () => setHideHeader(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpRequest.get("/categories?populate=*");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <header
        className={`w-full bg-white flex items-center fixed z-30 top-0 transition-transform duration shadow-xl ${
          hideHeader ? "-translate-y-2 shadow-none" : "translate-y-0"
        }`}
      >
        <Wrapper className="flex items-center justify-between">
          <Link href="/" className="flex-1 py-7 px-2 [-webkit-tap-highlight-color:transparent]">
            <Image src="/logo.svg" width={50} height={50} priority alt="logo" />
          </Link>

          <div className="flex-1">
            <Menu showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} categories={categories} />
          </div>

          <div className="flex-1 flex items-center justify-end gap-3">
            <button className="flex items-center p-2" onClick={() => setShowModal(true)}>
              <BsSearch size={18} />
            </button>

            <ButtonNavigation
              icon={<AiOutlineHeart size={20} />}
              onClick={() => router.push("/favorite")}
              quantity={wishList.length}
            />
            <ButtonNavigation
              icon={<BsCart3 size={20} />}
              onClick={() => router.push("/cart")}
              quantity={cartProducts.length}
            />
            <ButtonNavigation
              icon={<IconMenuMobile size={20} />}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              customClass="md:hidden"
            />
          </div>
        </Wrapper>
      </header>

      <MenuMobile
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
        categories={categories}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </>
  );
};

export default Header;
