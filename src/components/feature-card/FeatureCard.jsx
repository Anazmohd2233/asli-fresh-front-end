import React from "react";
import { FiCreditCard, FiGift, FiPhoneCall, FiTruck } from "react-icons/fi";

//internal import

import useUtilsFunction from "@hooks/useUtilsFunction";

const FeatureCard = async ({ storeCustomizationSetting }) => {
  const { showingTranslateValue } = useUtilsFunction();
  const footer = storeCustomizationSetting?.footer;

  const featurePromo = [
    {
      id: 1,
      title: 'Fresh From Sea to Your Kitchen',

      icon: FiTruck,
    },
    {
      id: 2,
      title: 'Support 24/7 At Anytime',

      icon: FiPhoneCall,
    },
    {
      id: 3,
      title: 'Today’s Catch — Limited Time Offers',
      icon: FiCreditCard,
    },
    {
      id: 4,
      title: 'Today’s Catch — Limited Time Offers',
      icon: FiGift,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
      {featurePromo.map((promo) => (
        <div
          key={promo.id}
          className=" border-r border-gray-200 py-1 flex items-center justify-center bg-white dark:bg-zinc-900"
        >
          <div className="mr-3">
            <promo.icon
              className="flex-shrink-0 h-4 w-4 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="">
            <span className="block text-sm font-medium leading-5">
              {promo?.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;
