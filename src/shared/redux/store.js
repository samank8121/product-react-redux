import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
  },
});

export default store;
