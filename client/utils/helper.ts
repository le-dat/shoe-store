import { CartProductIProps, ToastType } from "@/types"
import { toast } from "react-toastify"

export const getDiscountedPricePercentage = (originalPrice: number, discountedPrice: number) => {
  return Math.round((1 - discountedPrice / originalPrice) * 100)
}

export const getTotalPrice = (list: CartProductIProps[]) => {
  return list.reduce((total, value) => total + value.product.price * value.quantity, 0)
}

// Create our number type formatter.
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number)
}

export const notify = (type: ToastType, message: string = "Success. Check your cart!") => {
  return toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
}
