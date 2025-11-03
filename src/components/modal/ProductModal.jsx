import Link from "next/link";
import {
  FiEye,
  FiHeadphones,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";
import Image from "next/image";

// internal imports
import Price from "@components/common/Price";
import Tags from "@components/common/Tags";
import useAddToCart from "@hooks/useAddToCart";
import Discount from "@components/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Rating from "@components/common/Rating";
import Stock from "@components/common/Stock";
import MainModal from "./MainModal";

const ProductModal = ({
  product,
  modalOpen,

  setModalOpen,
  globalSetting,
}) => {
  const { getNumberTwo, showingTranslateValue } = useUtilsFunction();
  const currency = globalSetting?.default_currency || "₹";
  const { item, setItem, handleAddItem } = useAddToCart();

  // 🧩 Adapted product fields (from AsliFresh API)
  const productId = product?.id;
  const productName = product?.name;
  const productImage = product?.imgs?.[0]?.img;
  const productPrice = product?.off_price || product?.price || 0;
  const originalPrice = product?.price || 0;
  const stock = product?.stock || 0;
  const description = `Weight: ${product?.weight || ""}`;
  const category_name = product?.category?.[0] || "General";

  // ✅ handle add-to-cart logic
  const handleAddToCartClick = () => {
    if (stock < 1) return;
    handleAddItem({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      stock: stock,
      quantity: item,
    });
    setModalOpen(false);
  };

  return (
    <>
      <MainModal
        modalOpen={modalOpen}
        bottomCloseBtn={false}
        handleCloseModal={() => setModalOpen(false)}
      >
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="lg:flex flex-col lg:flex-row md:flex-row w-full max-w-4xl overflow-hidden">
            <div className="w-full lg:w-[40%]">
              <div
                onClick={() => setModalOpen(false)}
                className="flex-shrink-0 flex items-center justify-center h-auto cursor-pointer"
              >
                {productImage ? (
                  <Image
                    src={productImage}
                    width={420}
                    height={420}
                    alt={productName}
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                    width={420}
                    height={420}
                    alt="Product Image"
                  />
                )}
              </div>
            </div>

            <div className="w-full lg:w-[60%] pt-6 lg:pt-0 lg:pl-7 xl:pl-10">
              <div className="mb-2 md:mb-2.5 block -mt-1.5">
                <div
                  className={`${
                    stock <= 0 ? "relative py-1 mb-2" : "relative"
                  }`}
                >
                  <Stock inStock={stock > 0} />
                </div>

                <h2 className="text-heading text-lg md:text-xl lg:text-xl font-medium hover:text-black cursor-pointer">
                  {productName}
                </h2>

                <div className="flex gap-0.5 items-center mt-1">
                  <Rating size="md" showReviews={true} rating={4.5} totalReviews={10} />
                </div>
              </div>

              <p className="text-sm leading-6 text-gray-500 md:leading-6">
                {description}
              </p>

              <div className="flex items-center my-4">
                <Price
                  price={productPrice}
                  product={product}
                  currency={currency}
                  originalPrice={originalPrice}
                />
                <span className="ml-2">
                  <Discount product={product} />
                </span>
              </div>

              {/* 🐟 Fish cutting options (mapped) */}
              {product?.fish_cutting_options?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm py-1 text-gray-800 font-medium">
                    Select Cutting Option:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.fish_cutting_options.map((cut) => (
                      <button
                        key={cut.id}
                        onClick={() => console.log("Selected Cut:", cut.name)}
                        className="flex flex-col items-center border rounded-md p-2 hover:border-emerald-500 transition"
                      >
                        <Image
                          src={cut.img}
                          alt={cut.name}
                          width={70}
                          height={70}
                          className="rounded-md object-cover"
                        />
                        <span className="text-xs mt-1 font-medium text-gray-700">
                          {cut.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 🛒 Add to cart controls */}
              <div className="flex items-center mt-4">
                <div className="w-full grid lg:grid-cols-3 sm:grid-cols-3 gap-3">
                  <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border border-gray-300">
                    <button
                      onClick={() => setItem(item - 1)}
                      disabled={item === 1}
                      className="flex items-center justify-center py-2 px-4 w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                    >
                      <FiMinus />
                    </button>
                    <p className="font-semibold text-sm">{item}</p>
                    <button
                      onClick={() => setItem(item + 1)}
                      disabled={stock <= item}
                      className="flex items-center justify-center py-2 px-4 w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCartClick}
                    disabled={stock < 1}
                    className="w-full text-sm flex items-center justify-center font-semibold rounded-md text-white py-2 px-4 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <FiShoppingBag className="mr-2" />
                    Add to cart
                  </button>

                  <Link
                    href={`/product/${productId}`}
                    passHref
                    className="w-full flex items-center justify-center text-sm text-gray-600 rounded py-2 px-4 bg-gray-100 hover:bg-gray-200"
                  >
                    <FiEye className="mr-2" />
                    View details
                  </Link>
                </div>
              </div>

              {/* Category + Tags */}
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="font-semibold py-1 text-sm block">
                      <span className="text-gray-700">Category:</span>{" "}
                      <button
                        type="button"
                        className="text-gray-600 font-medium ml-2 hover:text-teal-600"
                      >
                        {category_name}
                      </button>
                    </span>
                    <Tags product={product} />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {/* <div className="flex items-center text-sm text-gray-500 border-t border-gray-100 pt-4 mt-4">
                <FiHeadphones className="mr-1 text-gray-500 text-md" />
                Call Us for Order
                <a
                  href={`tel:${globalSetting?.phone || "+099949343"}`}
                  className="font-bold text-emerald-500 ml-1"
                >
                  {globalSetting?.phone || "+099949343"}
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default ProductModal;
