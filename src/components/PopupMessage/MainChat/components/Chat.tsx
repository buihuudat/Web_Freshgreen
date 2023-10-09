import { Box, Divider, Typography } from "@mui/material";
import { fullnameOfUser } from "../../../../types/userType";

interface Props {
  data: any;
}

const data = {
  user: {
    fullname: {
      firstname: "Jane",
      lastname: "Doe",
    },
    avatar: "",
  },
  lastMessage: "Hey!",
  time: "14:20",
  seen: false,
};
const Chat = () => {
  return (
    <Box pl={2}>
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

      <Box></Box>
    </Box>
  );
};

export default Chat;
