import React from "react";
import { AiFillLock } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
import { MdOutlineAccountCircle, MdOutlinePayment } from "react-icons/md";

import { Wrapper } from "@/components";
import useScrollTop from "@/hooks/useScrollTop";

export const services = [
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
];

const Contact: React.FC = () => {
  useScrollTop();

  return (
    <Wrapper className="flex flex-col gap-5 mt-24 mb-7 ">
      <h3 className="text-lg font-semibold">Welcome to Dat Shoe Service </h3>
      {services.map(({ icon, title }, index) => (
        <div
          key={`service-${index}`}
          className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md transition hover:bg-blue-100 bg-gray-100 text-black"
        >
          {icon}
          <p className="text-lg">{title}</p>
        </div>
      ))}
    </Wrapper>
  );
};

export default Contact;
