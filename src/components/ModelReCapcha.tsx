import { Box, Modal, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { recaptcha } from "../utils/handlers/verifyPhoneNumber";

import { RecaptchaVerifier, getAuth } from "firebase/auth";
interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}
declare var window: ExtendedWindow;

const auth = getAuth();
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ModelReCapcha(props: Props) {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);
  useEffect(() => {
    recaptcha();
  }, []);

  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
    size: "invisible",
    callback: (response: any) => {
      return true;
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <div id="sign-in-button"></div>
        <div className="recaptcha-container"></div>
        <TextField
          label="Nhập capcha"
          name="capcha"
          margin="normal"
          type="text"
          sx={{ width: { sm: 400, xs: "100%" } }}
        />
      </Box>
    </Modal>
  );
}
