import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bannerService from "@services/azli_services/bannerService";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Async thunk to fetch products list
export const fetchbannerList = createAsyncThunk(
  "products/fetchbannerList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerService.getBannerList();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to fetch product details by ID


// ✅ Initial State
const initialState = {
  bannerList: null,
  loading: false,
  error: null,
};

// ✅ Slice
const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBanner: (state) => {
      state.bannerList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products list
      .addCase(fetchbannerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchbannerList.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerList = action.payload.data.banners;
              // console.log("bannerListbannerListbannerListbannerList",action.payload.data);

      })
      .addCase(fetchbannerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export const { clearBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
