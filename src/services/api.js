import axios from "axios";

// ✅ Base URL for your API (change as needed)
const API_BASE_URL =
 process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.aslifresh.com";

// ✅ Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request interceptor — inject auth token if present
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (saved during OTP verification)
    const token = localStorage.getItem("authToken");

    if (token) {
      // Add token to headers
      config.headers.Authorization = `${token}`;
      // 👇 If backend expects Bearer token instead, use this:
      // config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor — handle 401 or server errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized — clear session and redirect to login
      localStorage.removeItem("authToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// ✅ Define all API endpoints in one place
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/user/login",
  SIGN_UP: "/user/register", // ✅ fixed for your signup flow
  LOGOUT: "/user/logout",
  VERIFY_OTP: "/user/verify_otp",


  GET_CATEGORY:"/user/catAndSub/get",

  PRODUCT_LIST:"/user/product/buy/cat/list",
    OFFER_PRODUCT:"/user/product/offers",
        READY_TO_EAT:"/user/offer/ready_to_eat/list",


  PRODUCT_VIEW:"/user/product/get",

  SLIDER_HOME:"/user/banner/list/slider/All/true"


};

export default apiClient;
