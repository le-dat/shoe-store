import { Wrapper } from "@/components";
import useScrollTop from "@/hooks/useScrollTop";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiBurningDot } from "react-icons/gi";

const About: React.FC = () => {
  useScrollTop();
  useDocumentTitle("Guide | Dat Shoe");

  return (
    <Wrapper className="flex flex-col gap-4 mt-28 mb-7">
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
          {Array(5)
            .fill({})
            .map((item, index) => (
              <div className="flex flex-col md:flex-row p-3 gap-6" key={`guide-${index}`}>
                <Link href="/" className="w-full md:w-80 block cursor-pointer">
                  <Image
                    src="/banners/banner-1.png"
                    alt="image-guide"
                    className="object-cover h-full w-full"
                    width={900}
                    height={900}
                  />
                </Link>
                <div className="flex-1">
                  <Link href="/" className="font-medium text-lg hover:text-blue-500">
                    10 QUESTIONS FAQs for first time Shoe-dog shop customers!
                  </Link>
                  <p className="mt-4 font-light text-gray-600">
                    Is the product genuine? Why is it cheaper than the website? Shoe-dog is committed to only selling
                    100% authentic products, if found fake, give customers 10...
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
