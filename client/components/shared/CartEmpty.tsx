"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

interface IProps {
  title?: string
}
const CartEmpty: React.FC<IProps> = ({ title = "cart" }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Image src="/empty-cart.jpg" alt="empty cart" width={300} height={300} />
      <p className="text-lg font-semibold">Your {title} is empty</p>
      <p className="text-sm text-center">
        You have no items in your shopping {title}.
        <Link
          href="/"
          className="font-semibold [-webkit-tap-highlight-color:transparent] hover:underline text-blue-800"
        >
          Click here to continue shopping.
        </Link>
      </p>
    </div>
  )
}

export default CartEmpty
