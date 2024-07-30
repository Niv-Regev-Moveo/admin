import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./auth.thunk";
import { IUser } from "./auth.type";

interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginResponse {
  token: string;
  user: IUser;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<{ message: string } | undefined>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "An unexpected error occurred";
          state.user = null;
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { loginUser };
