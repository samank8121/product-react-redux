import { createAppSlice } from "../create-app-slice";

const initialState = {
  auth: { user: {}, token:'' },
};

const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload.login;
      state.auth = { user, token };
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
