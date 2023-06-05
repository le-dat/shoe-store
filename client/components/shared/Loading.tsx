"use client"

import Image from "next/image"
import React from "react"

const Loading: React.FC = () => {
  return (
    <div className="bg-gray-200 bg-opacity-90 fixed inset-0 z-10 w-full h-full flex flex-col items-center justify-center">
      <Image src="/logo.svg" alt="loading" width={200} height={200} />
      <span className="text-2xl font-medium">Loading...</span>
    </div>
  )
}

export default Loading
