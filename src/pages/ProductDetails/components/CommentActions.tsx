import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";

const CommentActions = () => {
  const [comment, setComment] = useState("");
  const user = useAppSelector((state) => state.user.user);

  return (
    <Box width={"50%"} margin={"0 auto"}>
      <Typography fontSize={25} fontWeight={600} mb={5}>
        Thêm nhận xét
      </Typography>
      <Box>
        <Button
          size="small"
          sx={{ display: "flex", flexDirection: "row", gap: 1 }}
        >
          <Avatar src="dat" />
          <Typography fontSize={16} fontWeight={600}>
            dat
          </Typography>
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <TextField variant="standard" name="comment" fullWidth />
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentActions;
