"use client";
import React from "react";

import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";

//internal imports
import LogoutButton from "./LogoutButton";
import { showingTranslateValue } from "@lib/translate";

const TopNavbar = ({ storeCustomization }) => {
  const navbar = storeCustomization?.navbar;
  // console.log("storeCustomization", storeCustomization);

  return (
    <div className="hidden lg:block bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="text-gray-700 py-2 font-sans text-xs font-medium flex justify-between items-center">
          <span className="flex items-center">
            <FiPhoneCall className="mr-2" />
            We are available 24/7, Need help?{" "}
            <a className="font-bold text-emerald-500 ml-1">+91 90197 30300</a>
          </span>

          <div className="lg:text-right flex items-center navBar">
            <div>
              <Link
                href="/about-us"
                className="font-medium hover:text-emerald-600"
              >
                About Us
              </Link>
              <span className="mx-2">|</span>
            </div>

            <div>
              <Link
                href="/contact-us"
                className="font-medium hover:text-emerald-600"
              >
                Contact Us
              </Link>
              <span className="mx-2">|</span>
            </div>

            <LogoutButton storeCustomization={storeCustomization} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
