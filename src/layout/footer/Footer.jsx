'use client'
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  XIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";

const Footer = () => {
  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          {/* -------------------- Company -------------------- */}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md font-medium mb-4 sm:mb-5 lg:mb-6">Company</h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-emerald-500">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-emerald-500">Contact Us</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-emerald-500">Careers</Link></li>
              <li><Link href="/news" className="text-gray-600 hover:text-emerald-500">Latest News</Link></li>
            </ul>
          </div>

          {/* -------------------- Categories -------------------- */}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md font-medium mb-4 sm:mb-5 lg:mb-6">Categories</h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li><Link href="/fish-meat" className="text-gray-600 hover:text-emerald-500">Fish & Meat</Link></li>
              <li><Link href="/soft-drinks" className="text-gray-600 hover:text-emerald-500">Soft Drink</Link></li>
              <li><Link href="/milk-dairy" className="text-gray-600 hover:text-emerald-500">Milk & Dairy</Link></li>
              <li><Link href="/beauty-health" className="text-gray-600 hover:text-emerald-500">Beauty & Health</Link></li>
            </ul>
          </div>

          {/* -------------------- My Account -------------------- */}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md font-medium mb-4 sm:mb-5 lg:mb-6">My Account</h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li><Link href="/account/dashboard" className="text-gray-600 hover:text-emerald-500">Dashboard</Link></li>
              <li><Link href="/account/orders" className="text-gray-600 hover:text-emerald-500">My Orders</Link></li>
              <li><Link href="/account/recent-orders" className="text-gray-600 hover:text-emerald-500">Recent Orders</Link></li>
              <li><Link href="/account/profile" className="text-gray-600 hover:text-emerald-500">Update Profile</Link></li>
            </ul>
          </div>

          {/* -------------------- Logo & Contact Info -------------------- */}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link href="/" className="block mb-4">
              <div className="relative w-32 h-10">
                <Image
                  width={110}
                  height={40}
                  src="/logo/logo-color.svg"
                  alt="logo"
                  className="w-full h-auto"
                />
              </div>
            </Link>
            <p className="leading-7 text-sm text-gray-600">
               Shop No 6, Site No 2, Assessment No 3, Mahadevapura Village,
KR Puram Hobli, B.B.M.P East, Bangalore North, Karnataka, India - 560048
              <br />
              {/* <span>Call Us: +91 90197 30300</span> */}
              <br />
              <span>Email: support@myazlifresh.com</span>
                  <br />
              <span>Work hours: 6:00–22:00, Sunday–Sunday</span>
            </p>
          </div>
        </div>

       

        <hr className="border-gray-200" />

        {/* -------------------- Bottom Section -------------------- */}
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-50 shadow-sm border border-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-9 py-8 items-center">
            {/* Social */}
            <div className="col-span-1">
              <span className="text-base font-medium block mb-2">Follow Us</span>
              <ul className="flex">
                <li className="mr-3"><Link href="https://facebook.com" target="_blank"><FacebookIcon size={34} round /></Link></li>
                <li className="mr-3"><Link href="https://x.com" target="_blank"><XIcon size={34} round /></Link></li>
                <li className="mr-3"><Link href="https://pinterest.com" target="_blank"><PinterestIcon size={34} round /></Link></li>
                <li className="mr-3"><Link href="https://linkedin.com" target="_blank"><LinkedinIcon size={34} round /></Link></li>
                <li><Link href="https://wa.me/" target="_blank"><WhatsappIcon size={34} round /></Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1 text-center hidden md:block">
              <p className="text-base font-medium">Call Us</p>
              <h5 className="text-2xl font-bold text-emerald-500">+91 90197 30300</h5>
            </div>

            {/* Payment */}
            <div className="col-span-1 hidden md:block text-right">
              <Image
                width={274}
                height={85}
                src="/payment-method/payment-logo.png"
                alt="payment methods"
                className="inline-block"
              />
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- Copyright -------------------- */}
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-emerald-500 font-medium">Asli Fresh</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
