"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

interface IProps {
  slug: string
  children: React.ReactNode
  quantity: number
}

const MenuItem: React.FC<IProps> = ({ slug, children, quantity }) => {
  const { query } = useRouter()

  return (
    <Link
      href={`/category/${slug}`}
      className={`${
        query.slug === slug ? "bg-gray-200" : ""
      } cursor-pointer py-3 px-7 hover:bg-gray-100 flex items-center justify-between capitalize`}
    >
      {children}
      <span className="rounded-full w-7 h-7 flex items-center justify-center bg-gray-200">{quantity}</span>
    </Link>
  )
}

export default MenuItem
