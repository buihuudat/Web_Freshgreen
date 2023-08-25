import { createSlice } from "@reduxjs/toolkit";
import commentActions from "../../actions/commentActions";
import { CommentType } from "../../types/commentType";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import _ from "lodash";

interface InitialProps {
  comments: CommentType[];
  loading: boolean;
}

const initialState: InitialProps = {
  comments: [],
  loading: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentActions.getProductComments.fulfilled, (state, action) => {
        state.comments = _.orderBy(action.payload, ["createdAt"], "desc");
      })
      .addCase(commentActions.addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfiled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default commentSlice.reducer;
