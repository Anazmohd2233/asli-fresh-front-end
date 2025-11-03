"use client";

import { Suspense, useEffect, useState } from "react";

// internal imports
import Banner from "@components/banner/Banner";
import CardTwo from "@components/cta-card/CardTwo";
import OfferCard from "@components/offer/OfferCard";
import StickyCart from "@components/cart/StickyCart";
import ProductCard from "@components/product/ProductCard";
import MainCarousel from "@components/carousel/MainCarousel";
import CMSkeletonTwo from "@components/preloader/CMSkeleton";
import FeatureCategory from "@components/category/FeatureCategory";
import {
  getShowingStoreProducts,
  getShowingAttributes,
  getGlobalSetting,
  getStoreCustomizationSetting,
} from "@services/SettingServices";
import DiscountedCard from "@components/product/DiscountedCard";
import CategoryCarousel from "@components/carousel/CategoryCarousel";
import { useCategory } from "@hooks/azli_hooks/usecategory";
import { useProduct } from "@hooks/azli_hooks/useProduct";

const Home = () => {
  const [currency, setCurrency] = useState("₹");

  const { categories, error, loading, handleFetchCategories } = useCategory();
  const {
    readyToEatProductData,
    offerProducts,
    handleFetchOfferProducts,
    readyToEat,
    handleFetchReadyToEat,
  } = useProduct();

  // ✅ Fetch offer products on first render
  useEffect(() => {
    handleFetchOfferProducts();
    handleFetchReadyToEat();
  }, []); // Empty dependency ensures it runs only once

  // (Optional) log once data is available
  useEffect(() => {
    if (offerProducts?.length) {
      console.log("🔹 Offer Products:", offerProducts);
    }
  }, [offerProducts]);

  useEffect(() => {
    if (readyToEat?.length) {
      // console.log("🔹 Ready to eat Products:", readyToEat);
      console.log("🔹 readyToEatProductData:", readyToEatProductData);
    }
  }, [readyToEat]);

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      {/* sticky cart section */}
      <StickyCart currency={currency} />

      {/* carousel full width */}
      <div className="bg-white dark:bg-zinc-900">
        <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
          <div className="w-full">
            <Suspense fallback={<p>Loading carousel...</p>}>
              <MainCarousel />
            </Suspense>
          </div>

          {/* Banner */}
          <div className="bg-orange-100 px-10 py-6 rounded-lg mt-6 dark:bg-slate-600">
            <Banner />
          </div>
        </div>
      </div>

      {/* Category Carousel */}

      <div className="bg-gray-100 dark:bg-zinc-800 lg:py-16 py-10">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="mb-10 flex justify-center">
            <div className="text-center w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
                <CMSkeletonTwo
                  count={1}
                  height={30}
                  loading={false}
                  data="Featured Categories"
                />
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-6">
                <CMSkeletonTwo
                  count={4}
                  height={10}
                  loading={false}
                  data="Choose your necessary products from our categories."
                />
              </p>
            </div>
          </div>
          {/* category  */}
          <Suspense fallback={<p>Loading feature category...</p>}>
            <CategoryCarousel categories={categories} />
          </Suspense>
        </div>
      </div>
      {/* <div className="relative">
        <CategoryCarousel />
      </div> */}

      {/* Popular Products */}
      <div className="bg-gray-50 dark:bg-zinc-900 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="mb-10 flex justify-center">
          <div className="text-center w-full lg:w-2/5">
            <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
              <CMSkeletonTwo
                count={1}
                height={30}
                loading={false}
                error={error}
                data="Hot Deals You Can’t Miss"
              />
            </h2>
            <p className="text-base font-sans text-gray-600 dark:text-gray-400 leading-6">
              <CMSkeletonTwo
                count={5}
                height={10}
                loading={false}
                error={error}
                data="Save more while you shop for the freshest fish, prawns, and daily catch — all delivered straight from the shore to your doorstep."
              />
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="w-full">
            {error ? (
              <CMSkeletonTwo
                count={20}
                height={20}
                error={error}
                loading={false}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                {offerProducts?.slice(0, 10).map((product) => (
                  <DiscountedCard
                    key={product.id}
                    product={product}
                    currency={currency}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      {/* Card with Download Now Button */}

      <div className="block mx-auto max-w-screen-2xl">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
          <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border text-black rounded-lg">
            <CardTwo />
          </div>
        </div>
      </div>

      {/* Discounted Products */}

      <div
        id="discount"
        className="bg-gray-50 dark:bg-zinc-800 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
      >
        <div className="mb-10 flex justify-center">
          <div className="text-center w-full lg:w-2/5">
            <h2 className="text-xl lg:text-2xl mb-2 font-semibold">
              <CMSkeletonTwo
                count={1}
                height={30}
                loading={false}
                error={error}
                data="Ready in Minutes"
              />
            </h2>
            <p className="text-base font-sans text-gray-600 leading-6">
              <CMSkeletonTwo
                count={5}
                height={20}
                loading={false}
                error={error}
                data="Shop the freshest fish and seafood — handpicked for your kitchen. Enjoy today’s offers and save big on every catch!"
              />
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
              {readyToEatProductData?.slice(0, 10).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
