import axiosClient from "./axiosClient";

export const messageApi = {
  ask: ({ userId, message }: { userId: string; message: string }) =>
    axiosClient.post(`/messages/${userId}/ask-ai`, { message }),
};
