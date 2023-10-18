import { GoogleLoginType, LoginType, RegisterType } from "../types/authType";
import { authAPI } from "../utils/api/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setItem } from "../utils/handlers/tokenHandler";

export const authActions = {
  login: createAsyncThunk(
    "auth/login",
    async (LoginData: LoginType, thunkAPI) => {
      try {
        const res = await authAPI.login(LoginData);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  register: createAsyncThunk(
    "auth/register",
    async (newUser: RegisterType, thunkAPI) => {
      try {
        const res = await authAPI.register(newUser);
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  google: createAsyncThunk(
    "auth/google",
    async ({ user, token }: GoogleLoginType, thunkAPI) => {
      try {
        const res = await authAPI.google({ user, token });
        setItem("user", res.data.token);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  resetPassword: createAsyncThunk<
    any,
    { email: string; password: string; confirmPassword: string }
  >("user/reset-password", async ({ email, password, confirmPassword }) => {
    try {
      const res = await authAPI.resetPassword({
        email,
        password,
        confirmPassword,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
