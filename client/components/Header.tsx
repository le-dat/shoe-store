import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import { fetchData } from "@/utils/api";
import ButtonNavigation from "./ButtonNavigation";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Wrapper from "./Wrapper";
import { useCartStore } from "@/hooks/useCartStore";
import { useWishlist } from "@/hooks/useWishlist";

const Header: React.FC = () => {
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState<boolean>(true);
  const [categories, setCategories] = useState<any>(0);
  const cartProducts = useCartStore((state) => state.cartProducts);
  const wishlist = useWishlist((state) => state.wishlist);
  const IconMenuMobile = showMobileMenu ? MdClose : AiOutlineMenu;

  useEffect(() => {
    const handleScroll = () => setHideHeader(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await fetchData("api/categories?populate=*");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <header
        className={`w-full bg-white flex items-center fixed z-40 top-0  transition-transform duration shadow-xl ${
          hideHeader ? "-translate-y-2 shadow-none" : "translate-y-0"
        }`}
      >
        <Wrapper className="flex items-center justify-between">
          <Link href="/" className="py-7 px-2 [-webkit-tap-highlight-color:transparent]">
            <Image src="/logo.svg" width={50} height={50} priority alt="logo" />
          </Link>
          <Menu showSubMenu={showSubMenu} setShowSubMenu={setShowSubMenu} categories={categories} />

          <div className="flex items-center gap-3">
            <ButtonNavigation
              icon={<AiOutlineHeart size={20} />}
              onClick={() => router.push("/favorite")}
              quantity={wishlist.length}
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
