"use client"

import React from "react"

interface IProps {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<IProps> = ({ children, className }) => {
  return <div className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${className}`}>{children}</div>
}

export default Wrapper
