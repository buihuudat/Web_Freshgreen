import { GoogleLoginType, LoginType, RegisterType } from "../../types/authType";
import axiosClient from "./axiosClient";

export const authAPI = {
  login: (payload: LoginType) => axiosClient.post("/auth/login", payload),
  google: (payload: GoogleLoginType) =>
    axiosClient.post("/auth/login/google", payload),
  register: (newUser: RegisterType) =>
    axiosClient.post("/auth/register", newUser),
  verifyToken: () => axiosClient.post("/auth/verify-token"),
  resetPassword: ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    axiosClient.post(`auth/reset-password`, {
      email,
      password,
      confirmPassword,
    }),
};
