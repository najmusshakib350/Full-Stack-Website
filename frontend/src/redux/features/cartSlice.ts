"use client";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cartInfo, ProductDataInfo } from "@/lib/interface";
const initialState: cartInfo = {
  errorMsg: "",
  price: 0,
  count: 0,
  cartArr: [],
};
export const cartData = createAsyncThunk(
  "cart/postData",
  async (token: string) => {
    const response = await fetch("http://localhost:7890/api/v1/cart/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cart = await response.json();
    return cart;
  }
);
export const addToCart = createAsyncThunk(
  "cart/postData",
  async (postData: { price: string; id: string; token: string }) => {
    const { price, token, id }: { price: string; token: string; id: string } =
      postData;

    const response = await fetch("http://localhost:7890/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        price: price,
        user: id,
      }),
    });

    const cart = await response.json();
    return cart;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeErrMsg: (state) => {
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {})
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.errorMsg = action.payload.message;
        }
        if (action.payload.data) {
          state.count = action.payload.data.count;
          state.price = action.payload.data.price;
          state.cartArr = action.payload.data.cartArr;
        }
      })
      .addCase(addToCart.rejected, (state) => {});
  },
});
export const { removeErrMsg } = CartSlice.actions;
export const cartReducer = CartSlice.reducer;
