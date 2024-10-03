import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  isLiked: boolean;
}

interface ProductsState {
  products: Product[];
  likedProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  likedProducts: JSON.parse(localStorage.getItem("likedProducts") || "[]"),
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
        if (product.isLiked) {
          state.likedProducts.push(product);
        } else {
          state.likedProducts = state.likedProducts.filter(
            (p) => p.id !== product.id
          );
        }
        localStorage.setItem("products", JSON.stringify(state.likedProducts));
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedProducts = action.payload.map((product: Product) => ({
          ...product,
          isLiked: !!state.likedProducts.find((p) => p.id === product.id),
        }));
        state.products = fetchedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      });
  },
});

export const { toggleLike, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
