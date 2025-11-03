import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productService from "@services/azli_services/productService";

// ✅ Async thunk to fetch products list
export const fetchProductsList = createAsyncThunk(
  "products/fetchProductsList",
  async (params = { catId: 1 }, { rejectWithValue }) => {
    try {
      const response = await productService.getProductsList(params);
            // console.log("response.data from product view slice", response);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to fetch offer products list
export const fetchOfferProducts = createAsyncThunk(
  "products/fetchOfferProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getOfferProducts();
            // console.log("response.data from product view slice", response);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to fetch offer products list
export const fetchReadyToEat = createAsyncThunk(
  "products/fetchReadyToEat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getReady_to_eatProducts();
            // console.log("response.data from product view slice", response);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to fetch product details by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (params = { productId: 1 }, { rejectWithValue }) => {
    try {
      const response = await productService.viewProduct(params);
      return response;
    } catch (error) {
      console.error("❌ fetch Product view error", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Initial State
const initialState = {
  productsList: null,
  offerProducts: null,
    readyToEat: null,

  productView: null,
  loading: false,
  error: null,
};

// ✅ Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProducts: (state) => {
      state.productsList = null;
      state.error = null;
    },
    clearOfferProducts: (state) => {
      state.error = null;
      offerProducts = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products list
      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList = action.payload.data;
              // console.log("productsListproductsListproductsListproductsList",action.payload.data);

      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch offer  products list
      .addCase(fetchOfferProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfferProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.offerProducts = action.payload.data;
              // console.log("productsListproductsListproductsListproductsList",action.payload.data);

      })
      .addCase(fetchOfferProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 // Fetch ready to eat
      .addCase(fetchReadyToEat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadyToEat.fulfilled, (state, action) => {
        state.loading = false;
        state.readyToEat = action.payload.data;
              // console.log("productsListproductsListproductsListproductsList",action.payload.data);

      })
      .addCase(fetchReadyToEat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productView = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
