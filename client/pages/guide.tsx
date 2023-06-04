import Image from "next/image"
import Link from "next/link"
import React from "react"
import { GiBurningDot } from "react-icons/gi"

import Meta from "@/components/shared/Meta"
import Wrapper from "@/components/shared/Wrapper"
import { GUIDE } from "@/constants"
import useScrollTop from "@/hooks/useScrollTop"

const About: React.FC = () => {
  useScrollTop()

  return (
    <Wrapper className="flex flex-col gap-4 mt-28 mb-7">
      <Meta
        title="Guide | Dat Shoe"
        description="Fashion shoe"
        image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
      />
      <h3 className="text-2xl text-center my-8 font-semibold">Experience in choosing clothes</h3>
      <div className="flex gap-1 ">
        {/* Guide */}
        <div className="hidden lg:block flex-1 relative">
          <div className="sticky top-28">
            <h4 className="font-semibold text-xl">Guide</h4>
            <ul className="flex flex-col gap-3 mt-4">
              <li className="flex items-center gap-3">
                <GiBurningDot />
                <Link href="/" className="hover:text-blue-400">
                  Guide for choose clothes
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <GiBurningDot />
                <Link href="/" className="hover:text-blue-400">
                  Experience practicing HM, FM
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Guide detail */}
        <div className="flex-[3]">
          {GUIDE.map((item, index) => (
            <div className="flex flex-col md:flex-row p-3 gap-6" key={`guide-${item.id}-${index}`}>
              <Link href="/" className="w-full md:w-80 block cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover h-full w-full"
                  width={900}
                  height={900}
                />
              </Link>
              <div className="flex-1">
                <Link href="/" className="font-medium text-lg hover:text-blue-500">
                  {item.title}
                </Link>
                <p className="mt-4 font-light text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default About
