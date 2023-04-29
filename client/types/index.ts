export interface MenuItemHasCategoryIProps {
  id: number;
  name: string;
  url?: number;
  subMenu?: boolean;
}

export interface ProductIProps {
  name: string;
  subtitle: string;
  description: string;
  price: number;
  original_price?: number;
  size: {
    data: SizeIProps[];
  };
  slug: string;
  image: {
    data: ImageDataIProps[];
  };
  thumbnail: {
    data: ImageDataIProps;
  };
  categories?: {
    name: string;
    slug: string;
  };
}

export interface ProductDataIProps {
  attributes: ProductIProps;
  id: string;
}
export interface ListProductIProps {
  data: ProductDataIProps[];
  meta: any;
}
export interface SizeIProps {
  size: string;
  enabled: boolean;
}
export interface ImageDataIProps {
  attributes: ImageIProps;
  id: string;
}
export interface ImageIProps {
  url: string;
}
export interface CategoryDataIProps {
  attributes: CategoryIProps;
  id: string;
}
export interface CategoryIProps {
  name: string;
  slug: string;
  products: {
    data: ProductIProps[];
  };
}

export type ToastType = "info" | "success" | "warning" | "error";
export type MethodAPIType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface CartProductIProps {
  id: number | string;
  product: ProductIProps;
  quantity: number;
  size: string;
  createAt: string;
}

export interface WishlistIProps {
  id: number | string;
  product: ProductIProps;
}
