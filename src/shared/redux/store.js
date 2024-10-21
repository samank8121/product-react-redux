import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
    authSlice: authSliceReducer,
  },
});

export default store;
