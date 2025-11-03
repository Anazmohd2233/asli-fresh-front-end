import { apiClient, API_ENDPOINTS } from "@services/api";
// Get category items with pagination
const productService = {
  // Get products with filters, pagination, and optional category/subcategory
  getProductsList: async (params = {}) => {
    try {
      let { catId = 1, ...queryParams } = params;

      // ✅ Convert object to string if needed
      if (typeof catId === "object" && catId !== null) {
        catId = catId.id || Object.values(catId)[0] || 1;
      }

      const response = await apiClient.get(
        `${API_ENDPOINTS.PRODUCT_LIST}/${catId}`,
        { params: queryParams }
      );
      // console.log("🔹 getProductsList response - service:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products list"
      );
    }
  },


    getOfferProducts: async () => {
    try {



      const response = await apiClient.get(
        `${API_ENDPOINTS.OFFER_PRODUCT}`
      );
      // console.log("🔹 getProductsList response - service:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch offer  products list"
      );
    }
  },

      getReady_to_eatProducts: async () => {
    try {



      const response = await apiClient.get(
        `${API_ENDPOINTS.READY_TO_EAT}`
      );
      // console.log("🔹 getProductsList response - service:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch offer products list"
      );
    }
  },

 viewProduct: async (params = {}) => {
  try {
    const { productId, ...queryParams } = params;

    if (!productId) throw new Error("Product ID is required");

    const response = await apiClient.get(
      `${API_ENDPOINTS.PRODUCT_VIEW}/${productId}`,
      { params: queryParams }
    );

  

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch product"
      );
    }
  },
};

export default productService;
