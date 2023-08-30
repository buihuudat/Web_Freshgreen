import { useAppSelector } from "../../../../redux/hooks";
import { Box } from "@mui/material";
import CommentItem from "./CommentItem";
import { RootState } from "../../../../redux/store";

const ListComment = () => {
  const comments = useAppSelector((state: RootState) => state.comment.comments);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      width="100%"
      margin={"0 auto"}
      maxHeight={500}
      sx={{ overflowY: "auto" }}
      p={3}
    >
      {comments?.map((comment) => (
        <CommentItem key={comment._id} {...comment} />
      ))}
    </Box>
  );
};

export default ListComment;
