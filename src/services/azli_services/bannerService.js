import { apiClient, API_ENDPOINTS } from "@services/api";
// Get category items with pagination
const bannerService = {
  // Get products with filters, pagination, and optional category/subcategory
  getBannerList: async () => {
    try {

  

      const response = await apiClient.get(
        `${API_ENDPOINTS.SLIDER_HOME}`
      );
      // console.log("🔹 getProductsList response - service:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch banner list"
      );
    }
  },


};

export default bannerService;
