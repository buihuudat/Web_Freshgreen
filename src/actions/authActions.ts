import { LoginType, RegisterType } from "../types/authType";
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
};
