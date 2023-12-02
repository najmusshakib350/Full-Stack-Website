"use client";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cartSlice";

type RootState = {
  cart: ReturnType<typeof cartReducer>;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export { store };

export type { RootState };
