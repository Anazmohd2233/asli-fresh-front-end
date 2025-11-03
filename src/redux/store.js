// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import catReducer from "./slices/catSlice";
import productReducer from "./slices/productSlice";
import bannerReducer from "./slices/bannerSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: catReducer,
    products: productReducer,
    banners: bannerReducer,
  },
});
