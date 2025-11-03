import useUtilsFunction from "@hooks/useUtilsFunction";

const Discount = ({ product }) => {
  const { getNumber } = useUtilsFunction();

  // ✅ Safely parse numbers
  const originalPrice = getNumber(product?.price);
  const discountedPrice = getNumber(product?.off_price);

  // ✅ Compute discount
  const discountPercentage =
    originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  // ✅ Hide if no discount
  if (!discountPercentage || discountPercentage < 1) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 mb-2 text-xs font-medium text-red-600 ring-1 ring-red-600/10 ring-inset">
      {discountPercentage}% Off
    </span>
  );
};

export default Discount;
