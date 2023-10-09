import { Box, SpeedDial } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { mainColor } from "../../constants/colors";
import MainChat from "./MainChat";
import { useState } from "react";
import ZoomInFromBottomRight from "./ZoomInFromBottomRight ";

const PopupMessage = () => {
  const [isMainChatOpen, setIsMainChatOpen] = useState(false);

  const toggleMainChat = () => {
    setIsMainChatOpen(!isMainChatOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 3,
        zIndex: 1000,
      }}
    >
      <ZoomInFromBottomRight isOpen={isMainChatOpen}>
        <MainChat />
      </ZoomInFromBottomRight>
      <SpeedDial
        ariaLabel="Popup message"
        color="red"
        sx={{}}
        icon={<MessageIcon />}
        FabProps={{
          sx: {
            bgcolor: mainColor,
          },
        }}
        onClick={toggleMainChat}
      ></SpeedDial>
    </Box>
  );
};

export default PopupMessage;
