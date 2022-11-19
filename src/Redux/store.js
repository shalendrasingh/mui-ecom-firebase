import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import productsReducer from "./product-slice";
import categoriesReducer from "./category-slice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});
