import { createSlice } from "@reduxjs/toolkit";
import { messageActions } from "../../actions/messageAction";

interface SendProps {
  authId: string;
  message: string;
}

interface InitialProp {
  user: any;
  chat: {
    from: Array<SendProps>;
    to: Array<SendProps>;
  };
}

const initialState: InitialProp = {
  user: {
    user: {
      fullname: {
        firstname: "AI ",
        lastname: "tư vấn",
      },
      avatar: "",
    },
    lastMessage: "",
    time: "",
    seen: false,
  },

  chat: {
    from: [],
    to: [],
  },
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(messageActions.ask.fulfilled, (state, action) => {
      const fromData = {
        authId: action.meta.arg.userId,
        message: action.meta.arg.message,
      };
      const toData = {
        authId: action.payload.authId,
        message: action.payload.message,
      };

      const updatedChatFrom = [...state.chat.from, fromData];
      const updatedChatTo = [...state.chat.to, toData];

      // Update the state
      state.chat = {
        from: updatedChatFrom,
        to: updatedChatTo,
      };
    });
  },
});

export const { selectUser } = messageSlice.actions;
export default messageSlice.reducer;
