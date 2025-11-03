"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { IoAdd, IoExpand, IoBagAdd, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";
import Link from "next/link";
import ImageWithFallback from "@components/common/ImageWithFallBack";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import { handleLogEvent } from "src/lib/analytics";
import Discount from "@components/common/Discount";
import PriceTwo from "@components/common/PriceTwo";
import ProductModal from "@components/modal/ProductModal";
import useUtilsFunction from "@hooks/useUtilsFunction";

const DiscountedCard = ({ product, currency }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { items, addItem, updateItemQuantity, inCart } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    id,
    name,
    off_price,
    price,
    imgs,
    stock,
    stock_status,
    weight,
    category,
  } = product;

  const displayName = name || "Unnamed Product";
  const productImage =
    imgs?.[0]?.img || product?.image || "/placeholder-image.webp";

  // ✅ Add to Cart Handler
  const handleAddItem = () => {
    if (!stock_status || stock < 1) return notifyError("Out of stock!");

    const newItem = {
      id,
      name: displayName,
      price: off_price || price,
      originalPrice: price,
      image: productImage,
      weight,
      quantity: 1,
      category,
    };

    addItem(newItem);
  };

  // ✅ Modal toggle
  const handleModalOpen = (event) => {
    setModalOpen(event);
  };

  return (
    <>
      {modalOpen && (
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          currency={currency}
        />
      )}

      <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-white border-gray-100 transition-all duration-150 hover:border-emerald-500">
        {/* 🔹 Discount Label */}
        <div className="absolute top-2 left-2 z-10">
          <Discount product={product} />
        </div>
        {/* 🔹 Product Image */}
        <div className="relative w-full min-h-48 lg:h-48 xl:h-52">
          <Link
        href={`/product?productId=${id}`}
            className="relative block w-full h-full overflow-hidden bg-gray-100"
          >
            <ImageWithFallback
              fill
              sizes="100%"
              alt={displayName}
              src={productImage}
              className="pointer-events-none"
            />
          </Link>

          {/* 🔹 Quick View Button */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            <button
              aria-label="quick view"
              onClick={() => {
                handleModalOpen(!modalOpen);
                handleLogEvent("product", `opened ${displayName} product modal`);
              }}
              className="pointer-events-auto inline-flex items-center rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
            >
              <IoExpand className="mr-1" /> Quick View
            </button>
          </div>

          {/* 🔹 Cart Add / Quantity */}
          <div className="absolute bottom-3 right-3 z-30 pointer-events-auto">
            {inCart(id) ? (
              items.map(
                (item) =>
                  item.id === id && (
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
                onClick={handleAddItem}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700"
              >
                <IoBagAdd className="text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* 🔹 Product Info */}
        <div className="flex flex-1 flex-col space-y-2 px-4 pt-2 pb-8">
          <Link
     href={`/product?productId=${id}`}
            className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-emerald-500"
          >
            {displayName}
          </Link>

          <p className="text-xs text-gray-500">{weight}</p>

          <PriceTwo
            card
            product={product}
            currency={currency}
            price={off_price}
            originalPrice={price}
          />
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(DiscountedCard), { ssr: false });
