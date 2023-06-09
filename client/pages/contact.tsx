import React from "react"
import { AiFillLock } from "react-icons/ai"
import { BsFillBagFill } from "react-icons/bs"
import { MdOutlineAccountCircle, MdOutlinePayment } from "react-icons/md"

import Wrapper from "@/components/shared/Wrapper"
import useScrollTop from "@/hooks/useScrollTop"
import Link from "next/link"
import Meta from "@/components/shared/Meta"

export const SERVICES = [
  {
    icon: <BsFillBagFill size={35} />,
    title: "A delivery, order or return",
  },
  {
    icon: <AiFillLock size={35} />,
    title: "Address, security & privacy",
  },
  {
    icon: <MdOutlinePayment size={35} />,
    title: "Payment, charges or gift cards",
  },
  {
    icon: <MdOutlineAccountCircle size={45} />,
    title: "Memberships, subscriptions or communications",
  },
]

const Contact: React.FC = () => {
  useScrollTop()

  return (
    <Wrapper className="flex flex-col gap-5 mt-24 mb-7 ">
      <Meta
        title="Contact | Dat Shoe"
        description="Fashion shoe"
        image="https://res.cloudinary.com/djyfwalqq/image/upload/v1685025120/large_71e_P_Jq_Qifg_L_AC_UY_500_b45ac3cb8d.jpg"
      />
      <h1 className="text-lg font-semibold">Welcome to Dat Shoe Service </h1>
      <li>
        Github:{" "}
        <Link href={"https://github.com/le-dat"} className="text-md hover:underline hover:text-blue-700">
          https://github.com/le-dat
        </Link>
      </li>
      <li>
        Gmail:{" "}
        <Link href={"lqdat87@gmail.com"} className="text-md hover:underline hover:text-blue-700">
          lqdat87@gmail.com
        </Link>
      </li>
      {SERVICES.map(({ icon, title }, index) => (
        <div
          key={`service-${index}`}
          className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition hover:bg-blue-100 bg-gray-100 text-black"
        >
          {icon}
          <p className="text-lg">{title}</p>
        </div>
      ))}
    </Wrapper>
  )
}

export default Contact
