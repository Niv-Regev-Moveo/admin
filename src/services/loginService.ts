// src/services/loginService.ts

import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../redux/store/store";
import { loginUser } from "../redux/chunks/collection/auth/auth.thunk";
import { decodeToken } from "../utils/axiosInstance";

export const handleLogin = async (
  dispatch: AppDispatch,
  mail: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    const resultAction = await dispatch(loginUser({ mail, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload.token;
      console.log("Login successful, saving token:", token);

      sessionStorage.setItem("authToken", token);
      console.log(
        "Token saved in session storage:",
        sessionStorage.getItem("authToken")
      );

      decodeToken(token);

      navigate("/");
    } else {
      if (resultAction.payload) {
        console.error("Login failed:", resultAction.payload.message);
      } else {
        console.error("Login failed: No payload returned");
      }
    }
  } catch (error) {
    console.error("Unexpected error during login:", error);
  }
};
