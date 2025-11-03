"use client";

import { useEffect, useRef, useState } from "react";
import { IoAdd, IoRemove, IoBagAdd } from "react-icons/io5";
import { useCart } from "react-use-cart";
import Link from "next/link";
import dynamic from "next/dynamic";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { notifyError } from "@utils/toast";
import { useSetting } from "@context/SettingContext";
import ProductModal from "@components/modal/ProductModal";
import Price from "@components/common/Price";
import useAddToCart from "@hooks/useAddToCart";

const CuttingCard = ({ product }) => {
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { globalSetting } = useSetting();
  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const currency = globalSetting?.default_currency || "₹";

  const productId = product?.id;
  const productName = product?.name;
  const productImage = product?.img;
  const off_price = product?.total_price || 0;
  const originalPrice = product?.total_price || 0;
  const un_cleaned_weight = product?.un_cleaned_weight || "";
  const cleaned_weight = product?.cleaned_weight || "";
  const cleaned_weight_to = product?.cleaned_weight_to || "";
  const stock = product?.stock || 0;

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

      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-500 h-full min-h-[340px]">
        {/* 🔹 Discount Badge */}
        {off_price < originalPrice && (
          <span className="absolute top-2 left-2 z-10 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
            {Math.round(((originalPrice - off_price) / originalPrice) * 100)}%
            OFF
          </span>
        )}

        {/* 🔹 Product Image */}
        <div className="relative w-full h-44 sm:h-48 lg:h-52 bg-gray-50">
          <Link href={`/product?productId=${productId}`}>
            <ImageWithFallback
              fill
              sizes="100%"
              alt={productName}
              src={productImage}
              className="object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* 🔹 Cart Button */}
          <div className="absolute bottom-3 right-3">
            {inCart(productId) ? (
              items.map(
                (item) =>
                  item.id === productId && (
                    <div
                      key={item.id}
                      className="flex flex-col w-10 h-20 items-center justify-between bg-emerald-500 text-white ring-2 ring-white rounded-full shadow-md"
                    >
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="hover:opacity-80"
                      >
                        <IoRemove />
                      </button>
                      <p className="text-sm font-medium">{item.quantity}</p>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="hover:opacity-80"
                      >
                        <IoAdd />
                      </button>
                    </div>
                  )
              )
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                aria-label="cart"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
              >
                <IoBagAdd className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* 🔹 Product Info */}
        <div className="flex flex-col flex-1 p-3 sm:p-4 justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
              {productName}
            </h3>

            {/* Weight Info */}
            <div className="text-[13px] text-gray-500 leading-tight">
              {(cleaned_weight || cleaned_weight_to) && (
                <p className="m-0">
                  <span className="font-medium text-gray-600">Cleaned:</span>{" "}
                  {cleaned_weight}
                  {cleaned_weight_to && ` - ${cleaned_weight_to}`}
                </p>
              )}
              {un_cleaned_weight && (
                <p className="m-0">
                  <span className="font-medium text-gray-600">Uncleaned:</span>{" "}
                  {un_cleaned_weight}
                </p>
              )}
            </div>
          </div>

          {/* Price at bottom */}
          <div className="mt-2">
            <Price
              card
              currency={currency}
              price={off_price}
              originalPrice={originalPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CuttingCard), { ssr: false });
