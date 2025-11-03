"use client";

import { useEffect, useRef, useState } from "react";
import { IoAdd, IoRemove, IoExpand, IoBagAdd } from "react-icons/io5";
import { useCart } from "react-use-cart";
import Link from "next/link";
import dynamic from "next/dynamic";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { notifyError } from "@utils/toast";
import { useSetting } from "@context/SettingContext";
import Discount from "@components/common/Discount";
import { handleLogEvent } from "src/lib/analytics";
import ProductModal from "@components/modal/ProductModal";
import Price from "@components/common/Price";
import Stock from "@components/common/Stock";
import Rating from "@components/common/Rating";
import useAddToCart from "@hooks/useAddToCart";

const ProductCard = ({ product }) => {
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { globalSetting } = useSetting();

  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const currency = globalSetting?.default_currency || "₹";

  // 🧠 Debug
  // useEffect(() => {
  //   console.log("🔹 Product from API:", product);
  // }, [product]);

  // 🧩 Extract your product properties safely
  const productId = product?.id;
  const productName = product?.name;
  const productImage = product?.imgs?.[0]?.img;
  const off_price = product?.off_price || 0;
  const originalPrice = product?.price || 0;
  const stock = product?.stock || 0;

  // 🛒 Add-to-cart handler
  const handleAddItem = (p) => {
    if (p.stock < 1) return notifyError("Out of stock!");

    const newItem = {
      id: p.id,
      name: p.name,
      price: p.off_price || p.price,
      image: p.imgs?.[0]?.img,
      stock: p.stock,
      quantity: 1,
    };

    addItem(newItem);
  };

  // 🧩 Handle modal
  const handleModalOpen = (event) => {
    setModalOpen(event);
  };

  // 🧩 Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {modalOpen && (
        <ProductModal
          product={product}
          modalOpen={modalOpen}
          globalSetting={globalSetting}
          setModalOpen={setModalOpen}
        />
      )}

      <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-white border-gray-100 transition-all duration-150 hover:border-emerald-500">
        {/* 🔹 Discount Badge */}
        <div className="absolute top-2 left-2 z-10">
          {off_price < originalPrice && (
            <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
              {Math.round(((originalPrice - off_price) / originalPrice) * 100)}%
              OFF
            </span>
          )}
        </div>

        {/* 🔹 Product Image */}
        <div className="relative w-full min-h-48 lg:h-52">
          {/* <Link href={`/product/${productId}`}> */}
          <Link href={`/product?productId=${productId}`}>
            <ImageWithFallback
              fill
              sizes="100%"
              alt={productName}
              src={productImage}
            />
          </Link>

          {/* Quick View button */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => {
                handleModalOpen(!modalOpen);
                handleLogEvent("product", `opened ${productName} modal`);
              }}
              className="bg-white text-gray-700 rounded-full shadow px-4 py-2 text-xs hover:bg-gray-100"
            >
              <IoExpand className="inline mr-1" />
              Quick View
            </button>
          </div>

          {/* Cart button */}
          <div className="absolute bottom-3 right-3">
            {inCart(productId) ? (
              items.map(
                (item) =>
                  item.id === productId && (
                    <div
                      key={item.id}
                      className="flex flex-col w-11 h-22 items-center p-1 justify-between bg-emerald-500 text-white ring-2 ring-white rounded-full"
                    >
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <IoRemove />
                      </button>
                      <p className="text-sm font-medium">{item.quantity}</p>
                      <button onClick={() => handleIncreaseQuantity(item)}>
                        <IoAdd />
                      </button>
                    </div>
                  )
              )
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="cart"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
              >
                <IoBagAdd className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* 🔹 Product Info */}
        <div className="flex flex-col flex-1 p-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
            {productName}
          </h3>

          <Stock stock={stock} />
          {/* <Rating rating={4.5} totalReviews={10} /> */}

          <Price
            card
            currency={currency}
            price={off_price}
            originalPrice={originalPrice}
          />
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
