import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useState } from "react";
import commentActions from "../../../../actions/commentActions";

const CommentActions = ({ productId }: { productId: string }) => {
  const [comment, setComment] = useState("");
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    dispatch(
      commentActions.addComment({
        userId: user._id as string,
        productId,
        comment,
      })
    );
    setComment("");
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "50%",
        m: "0 auto",
        p: 2,
      }}
    >
      <Typography fontSize={25} fontWeight={600} mb={2}>
        Thêm nhận xét
      </Typography>
      <Box>
        <Button
          size="small"
          sx={{ display: "flex", flexDirection: "row", gap: 1 }}
          color="success"
        >
          <Avatar src={user.avatar} alt={user.username} />
          <Typography fontSize={16} fontWeight={600}>
            {user.fullname.firstname} {user.fullname.lastname}
          </Typography>
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <TextField
            variant="standard"
            name="comment"
            value={comment}
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            color="primary"
            onClick={handleSubmit}
            disabled={comment === ""}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentActions;
