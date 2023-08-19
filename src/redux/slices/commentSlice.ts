import { createSlice } from "@reduxjs/toolkit";
import commentActions from "../../actions/commentActions";
import { CommentType } from "../../types/commentType";

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
    builder.addCase(
      commentActions.getProductComments.fulfilled,
      (state, action) => {
        state.comments = action.payload;
      }
    );
  },
});

export default commentSlice.reducer;
