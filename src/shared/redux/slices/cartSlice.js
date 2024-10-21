import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'graphql-request';
import { GET_CARTS } from '@/shared/graphql/cart';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (headers) => {  
  const results = await request(
    process.env.REACT_APP_API_ADDRESS,
    GET_CARTS,
    {},
    headers
  );
  const products = {};
  let totalCount = 0;
  results.carts.forEach((c) => {
    c.cartProducts.forEach((cp) => {
      const { id } = cp.product;
      products[id] = cp.productCount;
      totalCount += cp.productCount;
    });
  });
  return { products, totalCount };
});

const initialState = {
  cart: { products: {}, totalCount: 0 },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeCart: (state, action) => {
      const { productId, count } = action.payload;
      let products = { [productId]: count };
      let totalCount = 1;
      if (state.cart && state.cart.products) {
        products = { ...state.cart.products, [productId]: count };
        totalCount = Object.entries(products).reduce(
          (accumulator, currentValue) => accumulator + currentValue[1],
          0
        );
      }
      state.cart = { products, totalCount };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { changeCart } = cartSlice.actions;
export default cartSlice.reducer;
