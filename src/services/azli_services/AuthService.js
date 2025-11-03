// src/services/authService.js
import { apiClient, API_ENDPOINTS } from "../api";
import Cookies from "js-cookie";

export const authService = {
  // 🔹 1. Send OTP (Login)
  sendOtp: async (phone) => {
    const payload = { mobile_or_email: phone };
    const res = await apiClient.post(API_ENDPOINTS.LOGIN, payload);
    return res.data;
  },

  // 🔹 2. Verify OTP (Login or Signup verification)
  verifyOtp: async (otpKey, otp) => {
    const formData = new FormData();
    formData.append("otpKey", otpKey);
    formData.append("otp", otp);

    const res = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, formData);
    const token = res.data?.data?.["api-key"];

    // ✅ Save token for future API calls and middleware
    if (token) {
      localStorage.setItem("authToken", token);
      Cookies.set("api_key", token, { path: "/", sameSite: "lax" });
    }

    return res.data;
  },

  // 🔹 3. Register (Signup)
  register: async (form) => {
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("mobile", form.phone);

    const res = await apiClient.post("/user/register", formData);
    return res.data;
  },

  // 🔹 4. Logout
  logout: async () => {
    localStorage.removeItem("authToken");
    Cookies.remove("api_key");
    const res = await apiClient.post(API_ENDPOINTS.LOGOUT);
    return res.data;
  },
};
