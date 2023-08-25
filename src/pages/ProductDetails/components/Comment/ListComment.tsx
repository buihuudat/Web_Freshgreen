import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { Box } from "@mui/material";
import CommentItem from "./CommentItem";

const ListComment = () => {
  const comments = useAppSelector((state) => state.comment.comments);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      justifyContent={"center"}
      width="50%"
      margin={"0 auto"}
    >
      {comments?.map((comment) => (
        <CommentItem key={comment._id} {...comment} />
      ))}
    </Box>
  );
};

export default ListComment;
