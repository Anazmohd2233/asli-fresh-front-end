import useUtilsFunction from "@hooks/useUtilsFunction";

const Price = ({ product, price, card, originalPrice, currency }) => {
  const { getNumberTwo } = useUtilsFunction();

  // 🧩 Use correct AsliFresh fields:
  const actualPrice =
    price;
  const baseOriginalPrice =
    originalPrice ; // original

  const discountAmount =
    baseOriginalPrice > actualPrice
      ? baseOriginalPrice - actualPrice
      : 0;

  const discountPercent =
    baseOriginalPrice > actualPrice
      ? ((discountAmount / baseOriginalPrice) * 100).toFixed(2)
      : 0;

  return (
    <>
      <div className="product-price font-bold">
        <span
          className={`${
            card
              ? "inline-block text-base text-gray-900"
              : "inline-block text-xl"
          }`}
        >
          {currency}
          {getNumberTwo(actualPrice)}
        </span>

        {discountAmount > 0 && (
          <span
            className={
              card
                ? "sm:text-sm font-normal text-base text-gray-400 ml-1 line-through"
                : "text-sm font-normal text-gray-400 ml-1 line-through"
            }
          >
            {currency}
            {getNumberTwo(baseOriginalPrice)}
          </span>
        )}
      </div>

      {/* {discountAmount > 0 && !card && (
        <p className="text-xs text-emerald-600">
          Save {currency}
          {getNumberTwo(discountAmount)} 
        </p>
      )} */}
    </>
  );
};

export default Price;
