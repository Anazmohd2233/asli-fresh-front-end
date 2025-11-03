import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, resetCategories } from "@redux/slices/catSlice";

import { notifyError } from "@utils/toast";

export const useCategory = () => {
  const dispatch = useDispatch();

  // 🧠 extract state from Redux store
  const { loading, categories, error, message } = useSelector(
    (state) => state.category
  );

  // 🚀 function to fetch category list
  const handleFetchCategories = async (page = 1) => {
    const res = await dispatch(fetchCategories(page));
    if (fetchCategories.rejected.match(res)) {
      notifyError(res.payload || "Failed to load categories");
      return false;
    }
    return true;
  };

  // 🧹 reset category state
  const handleResetCategories = () => {
    dispatch(resetCategories());
  };

  return {
    loading,
    categories,
    error,
    message,
    handleFetchCategories,
    handleResetCategories,
  };
};
