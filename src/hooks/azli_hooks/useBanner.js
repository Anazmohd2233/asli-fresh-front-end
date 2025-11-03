import { useDispatch, useSelector } from "react-redux";

import { notifyError } from "@utils/toast";
import { clearBanner, fetchbannerList } from "@redux/slices/bannerSlice";

export const useBanner = () => {
  const dispatch = useDispatch();

  const { bannerList, loading, error } = useSelector(
    (state) => state.banners
  );

  // ✅ Fetch products list (with optional params)
// ✅ Simple: Fetch products list by category ID
const handleFetchBannerList = async () => {
  try {
    const res = await dispatch(fetchbannerList());

    if (fetchbannerList.rejected.match(res)) {
      notifyError(res.payload || "Failed to load banners");
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ handleFetchBannerList error:", error);
    notifyError("Unexpected error fetching banners");
    return false;
  }
};


  // ✅ Clear product list
  const handleClearBanner = () => {
    dispatch(clearBanner());
  };

  return {
    loading,
    error,
    bannerList,
    handleFetchBannerList,
    handleClearBanner,
  };
};
