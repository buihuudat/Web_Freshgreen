import { changeAvatarProps } from "../../actions/userActions";
import { UserType } from "../../types/userType";
import axiosClient from "./axiosClient";

export const userApi = {
  changeAvatar: (payload: changeAvatarProps) =>
    axiosClient.post(`/users/${payload._id}/change-avatar`, payload),

  updateUser: (payload: UserType) =>
    axiosClient.put(`/users/${payload._id}/`, payload),

  deleteUser: (id: string) => axiosClient.patch(`/users/${id}`),

  getUsers: () => axiosClient.get("/users/gets"),

  getUser: (id: string) => axiosClient.get(`/users/${id}`),

  verifyEmail: (email: string) =>
    axiosClient.post(`users/verify-email`, { email }),

  verifyPhone: (phone: string) =>
    axiosClient.post(`users/verify-phone`, { phone }),
};
