import { apiClient, API_ENDPOINTS } from "../api";

export const categoryService = {
  getCategoryList: async (page = 1) => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.GET_CATEGORY}`
      );

      if (!response.data) {
        throw new Error(response.data.message || "Failed to fetch category");
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch category"
      );
    }
  },
};
