import { Box, Divider, TextField, Typography } from "@mui/material";
import { fullnameOfUser } from "../../../../types/userType";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { messageActions } from "../../../../actions/messageAction";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = useAppSelector((state: RootState) => state.user.user);
  const { user: data, chat } = useAppSelector(
    (state: RootState) => state.messages
  );

  const dispatch = useAppDispatch();

  const handleSend = () => {
    setMessage("");
    dispatch(messageActions.ask({ userId: user._id!, message }));
    console.log(chat);
  };

  return (
    <Box pl={2} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>to: </Typography>
          <Typography fontWeight={600}>
            {fullnameOfUser(data.user.fullname)}
          </Typography>
        </Box>
        <Divider variant="middle" />
      </Box>

      <Box sx={{ mt: "auto", width: "100%", display: "flex" }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          value={message}
          label="Đặt câu hỏi..."
          variant="filled"
        />
        <LoadingButton onClick={handleSend} loading={isLoading}>
          <SendIcon />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Chat;
