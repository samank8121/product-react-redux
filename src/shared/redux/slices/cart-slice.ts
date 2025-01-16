import { PayloadAction } from '@reduxjs/toolkit';
import request from 'graphql-request';
import { GET_CARTS } from '@/shared/graphql/cart';
import { Header } from '@/shared/hooks/authentication';
import { createAppSlice } from '../create-app-slice';

type CartInitialType = {
  cart: { products: object, totalCount: number },
  loading: boolean,
  error: null | string,
}
const initialState:CartInitialType = {
  cart: { products: {}, totalCount: 0 },
  loading: false,
  error: null,
};

const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    changeCart: create.reducer((state, action:PayloadAction<{productId:number, count:number}>) => {
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
    }),
    fetchCart: create.asyncThunk(
      async (headers:Header) => {
        const results = await request(
          process.env.REACT_APP_API_ADDRESS,
          GET_CARTS,
          {},
          headers
        );
        const products: { [key: string]: number } = {};
        let totalCount = 0;
        results.carts.forEach((c:any) => {
          c.cartProducts.forEach((cp:any) => {
            const { id } = cp.product;
            products[id] = cp.productCount;
            totalCount += cp.productCount;
          });
        });
        return { products, totalCount };
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.cart = action.payload;
          state.loading = false;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message??'An unknown error occurred';
        },
      },
    ),
  }),
});

export const { changeCart, fetchCart } = cartSlice.actions;
export default cartSlice.reducer;
