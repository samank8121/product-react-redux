import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cart-slice';
import authSliceReducer from './slices/auth-slice';

const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
    authSlice: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
