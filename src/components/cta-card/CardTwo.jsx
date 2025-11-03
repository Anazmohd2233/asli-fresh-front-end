import React from "react";
import Image from "next/image";
import Link from "next/link";

//internal import
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import { getStoreCustomizationSetting } from "@services/SettingServices";
import { showingTranslateValue } from "@lib/translate";

const CardTwo = () => {
  return (
    <div className="w-full bg-white shadow-sm lg:px-10 lg:py-5 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="lg:w-3/5">
          <span className="text-base lg:text-lg">
            <CMSkeletonTwo
              count={1}
              height={20}
              error="error from Card Two"
              loading={false}
              data="Fresh Fish & Seafood"
            />
          </span>
          <h2 className=" text-lg lg:text-2xl font-bold mb-1">
            <CMSkeletonTwo
              count={1}
              height={30}
              error="error from Card Two"
              loading={false}
              data="Fresh, Cleaned, and Ready to Cook"
            />
          </h2>
          <p className="text-sm font-sans leading-6">
            <CMSkeletonTwo
              count={4}
              height={20}
              error="error from Card Two"
              loading={false}
              data="Choose from a wide range of fresh fish, prawns, and seafood from our Asli Fresh collection. Enjoy exclusive offers and get the best catch delivered to your doorstep."
            />
          </p>
          <Link
            href={`/`}
            className="lg:w-1/3  text-xs  font-medium inline-block mt-5 px-8 py-3 bg-emerald-500 text-center text-white rounded-full hover:text-white contact-btn"
            target="_blank"
          >
          Purchase Now
          </Link>
        </div>
        <div className="w-1/5 flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-end">
          <Image
            width={373}
            height={250}
            alt="Quick Delivery to Your Home"
            className="block w-auto object-contain"
            src="/cta/delivery-boy.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
