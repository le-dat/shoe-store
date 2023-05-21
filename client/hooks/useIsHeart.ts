import { ProductIProps } from "@/types";
import { useEffect, useState } from "react";
import useWishList from "./useWishList";

const useIsHeart = (id: string | number, product: ProductIProps) => {
  const addCartWishList = useWishList((state) => state.addCartWishList);
  const removeCartWishlist = useWishList((state) => state.removeCartWishlist);
  const getCartWishlist = useWishList((state) => state.getCartWishlist);
  const [isHeart, setIsHeart] = useState<boolean>(false);

  useEffect(() => {
    setIsHeart(!!getCartWishlist(id));
  }, [id]);

  const handleAddWishlist = () => {
    addCartWishList({ id, product });
    setIsHeart(true);
  };

  const handleRemoveWishlist = () => {
    removeCartWishlist(id);
    setIsHeart(false);
  };

  const toggleWishlist = () => {
    return isHeart ? handleRemoveWishlist() : handleAddWishlist();
  };

  return { isHeart, toggleWishlist };
};

export default useIsHeart;
