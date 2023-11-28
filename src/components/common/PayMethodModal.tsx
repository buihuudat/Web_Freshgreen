import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { PayMethodOptionItem } from "../../types/payType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPayMethod } from "../../redux/slices/paySlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../../redux/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const payMethodOptions: Array<PayMethodOptionItem> = [
  {
    name: "VNPAY",
    image: "",
    path: "/gio-hang/payment/vnpay",
    value: "VNPAY",
  },
  {
    name: "Bằng thẻ VISA",
    image: "",
    path: "/gio-hang/payment/visa",
    value: "VISA",
  },
  {
    name: "Bằng MoMo",
    image: "",
    path: "/gio-hang/payment/momo",
    value: "MOMO",
  },
];

const PayMethodModal = () => {
  const { open, data } = useAppSelector((state: RootState) => state.pay.modal);
  const [selected, setSelected] = useState<any>("/gio-hang/payment/vnpay");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setPayMethod({ data: {}, open: false }));
  };

  const handlePay = async () => {
    navigate(selected, {
      state: { ...data },
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">
            Chọn phương thức thanh toán
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="VNPAY"
            name="radio-buttons-group"
          >
            {payMethodOptions.map((data, index) => (
              <FormControlLabel
                key={index}
                value={data.value}
                control={<Radio color="success" />}
                label={data.name}
                onClick={() => setSelected(data.path)}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <LoadingButton
          fullWidth
          variant="contained"
          sx={{ mt: 5 }}
          color={"success"}
          onClick={handlePay}
        >
          Thanh toán
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default PayMethodModal;
