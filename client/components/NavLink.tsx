import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  href: string;
  children: React.ReactNode;
  customClass?: string;
}
const NavLink: React.FC<IProps> = ({ href, children, customClass }) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={href}
      className={`text-gray-400 hover:text-gray-950 ${pathname === href && "text-gray-950"} ${customClass}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
