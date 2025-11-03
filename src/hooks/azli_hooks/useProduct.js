import { useDispatch, useSelector } from "react-redux";

import { notifyError } from "@utils/toast";
import {
  clearProducts,
  fetchOfferProducts,
  fetchProductById,
  fetchProductsList,
  fetchReadyToEat,
} from "@redux/slices/productSlice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const {
    productsList,
    offerProducts,
    readyToEat,
    productView,
    loading,
    error,
  } = useSelector((state) => state.products);

    // ✅ Extract the list of ready-to-eat products
  const readyToEatProducts =
    readyToEat?.length > 0 ? readyToEat[0]?.ready_to_eat_products || [] : [];

  // ✅ (Optional) Map to directly access the inner product data
  const readyToEatProductData = readyToEatProducts.map(
    (p) => p.ready_to_eat_product_data,
  );


  // ✅ Fetch products list (with optional params)
  // ✅ Simple: Fetch products list by category ID
  const handleFetchProductsList = async (catId = 1) => {
    try {
      const res = await dispatch(fetchProductsList({ catId }));

      if (fetchProductsList.rejected.match(res)) {
        notifyError(res.payload || "Failed to load products");
        return false;
      }

      return true;
    } catch (error) {
      console.error("❌ handleFetchProductsList error:", error);
      notifyError("Unexpected error fetching products");
      return false;
    }
  };

  const handleFetchOfferProducts = async () => {
    try {
      const res = await dispatch(fetchOfferProducts());

      if (fetchOfferProducts.rejected.match(res)) {
        notifyError(res.payload || "Failed to load offer products");
        return false;
      }

      return true;
    } catch (error) {
      console.error("❌ handleFetchOfferProducts error:", error);
      notifyError("Unexpected error fetching offer products");
      return false;
    }
  };

  const handleFetchReadyToEat = async () => {
    try {
      const res = await dispatch(fetchReadyToEat());

      if (fetchReadyToEat.rejected.match(res)) {
        notifyError(res.payload || "Failed to load offer products");
        return false;
      }

      return true;
    } catch (error) {
      console.error("❌ handleFetchOfferProducts error:", error);
      notifyError("Unexpected error fetching offer products");
      return false;
    }
  };
  // ✅ Fetch single product by ID
  const handleFetchProductById = async (params) => {
    const res = await dispatch(fetchProductById(params));
    if (fetchProductById.rejected.match(res)) {
      notifyError(res.payload || "Failed to fetch product details");
      return false;
    }
    return true;
  };

  // ✅ Clear product list
  const handleClearProducts = () => {
    dispatch(clearProducts());
  };

  const handleClearOfferProducts = () => {
    dispatch(handleClearOfferProducts());
  };

  return {
    loading,
    error,
    productsList,
    offerProducts,
    readyToEat,
    productView,
        readyToEatProducts,       // ✅ Array with wrapper objects
    readyToEatProductData, 
    handleFetchReadyToEat,
    handleFetchProductsList,
    handleFetchProductById,
    handleClearProducts,
    handleFetchOfferProducts,
    handleClearOfferProducts,
  };
};
