import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cart: {products:[]},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cart.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.cart.products = state.cart.products.filter(product => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
