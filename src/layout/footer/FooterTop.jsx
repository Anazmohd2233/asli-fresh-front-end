import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import CMSkeletonTwo from "@components/preloader/CMSkeleton";

const FooterTop = async ({ error }) => {
  // console.log("storeCustomizationSetting", storeCustomizationSetting?.footer);


  return (
    <div
      id="downloadApp"
      className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            <Image
              src= "/app-download-img-left.png"
              alt="app download"
              width={500}
              height={394}
              priority
              className="block w-auto"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">
              <CMSkeletonTwo
                count={1}
                height={30}
                error={error}
                loading={false}
                data='Get Your Needs From Our MY AZLI FRESH Store'
              />
            </h3>
            <p className="text-base opacity-90 leading-7">
              <CMSkeletonTwo
                count={5}
                height={10}
                error={error}
                loading={false}
                data='There are many products you will find in our shop, Choose your daily necessary product from our MY AZLI FRESH shop and get some special offers.'
              />
            </p>
            <div className="mt-8 flex mx-auto justify-center text-center">
              <Link
                href='https://apps.apple.com/ae/app/my-azli-fresh/id1668533922'
                className="mx-2"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  // width={170}
                  // height={50}
                  // className="mr-2 rounded"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  src="/app/app-store.svg"
                  alt="app store"
                />
              </Link>
              <Link
           href='https://play.google.com/store/apps/details?id=com.repad.asli&hl=en_IN'
                           target="_blank"
                rel="noreferrer"
              >
                <Image
                  // width={170}
                  // height={50}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  src="/app/play-store.svg"
                  alt="play store"
                />
              </Link>
            </div>
          </div>
          <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              <Image
                src="/app-download-img.png"
                width={500}
                height={394}
                priority
                alt="app download"
                className="block w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
