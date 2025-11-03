"use client";
import Link from "next/link";
import React, { use } from "react";

//internal import

const Banner = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className=" text-xl">
            <span className="text-emerald-600 dark:text-gray-200 font-bold">
              100% Natural Quality Organic Product{" "}
            </span>{" "}
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            See Our latest discounted products from here and get a special
            discount product
          </p>
        </div>
        <Link
          href={"/shop"}
          className="text-sm  font-medium px-6 py-2 bg-emerald-500 text-center rounded-full text-white hover:bg-emerald-700"
        >
          Shop Now{" "}
        </Link>
      </div>
    </>
  );
};

export default Banner;
