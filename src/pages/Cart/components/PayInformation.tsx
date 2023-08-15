import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { ProductCartType } from "../../../types/cartType";
import { voucherApi } from "../../../utils/api/voucherApi";
import { useNavigate } from "react-router-dom";
import { mainColor } from "../../../utils/Constants/colors";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import {
  OrderItemType,
  OrderStatus,
  PayMethod,
  PayStatus,
} from "../../../types/orderType";
import { orderActions } from "../../../actions/orderActions";
import { clearCart } from "../../../redux/slices/cartSlice";

const PayInformation = memo(() => {
  const [discount, setDiscount] = useState<number>(0);
  const [voucherErrText, setVoucherErrText] = useState<string>("");
  const [voucher, setVoucher] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PayMethod>();
  const [address, setAddress] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<{
    voucher?: boolean;
    pay?: boolean;
  }>({
    voucher: false,
    pay: false,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart.data);
  const user = useAppSelector((state: RootState) => state.user.user);
  const freeDeli = 50000;

  useEffect(() => {
    const total = cart.products.reduce(
      (prev: number, p: ProductCartType) => prev + p.lastPrice * p.count,
      0
    );
    setTotalPrice(total);
    setTotalPay(
      (total > freeDeli ? total : total + 25000) - (totalPrice * discount) / 100
    );
  }, [cart.products, discount, totalPrice]);

  useEffect(() => {
    setAddress(
      user.address?.more +
        " " +
        user.address?.street +
        " " +
        user.address?.ward +
        " " +
        user.address?.district +
        " " +
        user.address?.city
    );
  }, [user.address]);

  const handleSelectPayment = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as PayMethod);
  };

  const handleApplyVoucher = useCallback(async () => {
    if (voucher === "") {
      setVoucherErrText("Yêu cầu nhập voucher");
      return;
    }
    setVoucherErrText("");
    setDiscount(0);
    setIsLoading({ voucher: true });
    try {
      const res = await voucherApi.get(voucher);
      setDiscount(res.data.discount);
      setVoucherErrText("");
    } catch (error: any) {
      if (error.data.error) setVoucherErrText(error.data.error);
      else setVoucherErrText("Voucher không đúng");
      setDiscount(0);
      return false;
    } finally {
      setIsLoading({ voucher: false });
    }
  }, [voucher]);

  const handlePay = async () => {
    if (!user.address) {
      NotificationToast({
        message: "Cần thêm địa chỉ trước khi thanh toán",
        type: "warning",
      });
      return;
    }

    const order: OrderItemType = {
      products: cart.products,
      totalPrice: totalPay,
      voucherUsed: {
        voucher,
        discount,
      },
      pay: {
        method: PayMethod.lastPay,
        amount: totalPay,
        status: PayStatus.spending,
      },
      status: OrderStatus.spending,
    };
    // pay online
    if (paymentMethod === "payNow") {
      navigate("/payment", {
        state: {
          payData: {
            totalPrice,
            amount: totalPay,
            address,
            phone: user.phone,
            email: user.email,
            nameOfUser: user.username,
            discount: {
              voucher,
              discount,
            },
          },

          order: { ...order, pay: { ...order.pay, method: PayMethod.payNow } },
        },
      });
    } else {
      setIsLoading({ pay: true });

      try {
        await dispatch(orderActions.createOrder({ user, order }));
        dispatch(clearCart());
        navigate("/quan-li-don-hang");
      } finally {
        setIsLoading({ pay: false });
      }
    }
  };

  return (
    <Paper elevation={9} sx={{ p: 3, width: "25%" }}>
      <Typography fontSize={32} fontWeight={500} pb={3}>
        Thanh Toán
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={18} color={"#555"}>
          Tổng tiền hàng:
        </Typography>
        <Typography fontWeight={600} fontSize={18}>
          {moneyFormat(totalPrice)}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={18} color={"#555"}>
          Phí giao hàng:
        </Typography>
        <Typography my={2} fontWeight={600} fontSize={18}>
          {moneyFormat(totalPrice > freeDeli ? 0 : 25000)}
        </Typography>
      </Box>

      <hr style={{ color: "#ddd" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <TextField
          name="voucher"
          label="Voucher"
          fullWidth
          variant="standard"
          margin="normal"
          onChange={(e) => setVoucher(e.target.value)}
          error={voucherErrText !== ""}
          helperText={voucherErrText}
        />
        <LoadingButton
          loading={isLoading.voucher}
          variant="contained"
          size="small"
          onClick={handleApplyVoucher}
        >
          Áp dụng
        </LoadingButton>
      </Box>

      {discount !== 0 && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={22} color={"#555"}>
            Giảm:
          </Typography>
          <Typography fontSize={22} fontWeight={600} color={mainColor}>
            {discount}%
          </Typography>
        </Box>
      )}

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={22} color={"#555"}>
          Tổng thanh toán:
        </Typography>
        <Typography fontSize={22} fontWeight={600}>
          {moneyFormat(totalPay)}
        </Typography>
      </Box>

      {/* dia chi giao hang */}
      {!user.address ? (
        <Link
          sx={{ fontWeight: 600, textDecoration: "none", my: 1 }}
          href="/tai-khoan"
        >
          Thêm địa chỉ nhận hàng
        </Link>
      ) : (
        <Box display={"flex"} flexDirection={"column"} my={1}>
          <Typography fontSize={15} color={"#555"}>
            Địa chỉ nhận hàng:
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            {address} (
            <Link href="/tai-khoan" sx={{ fontWeight: 300, color: mainColor }}>
              thay đổi
            </Link>
            )
          </Typography>
        </Box>
      )}
      <Box display={"flex"} flexDirection={"row"} my={1} gap={1}>
        <Typography fontSize={15} color={"#555"}>
          Số điện thoại nhận hàng:{" "}
        </Typography>
        <Typography fontSize={16} fontWeight={600}>
          {user.phone}
        </Typography>
      </Box>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <Typography fontWeight={600}>Chọn phương thức thanh toán:</Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleSelectPayment}
        >
          <FormControlLabel
            value="lastPay"
            control={<Radio />}
            label="Thanh toán khi nhận hàng"
          />
          <FormControlLabel
            value="payNow"
            control={<Radio />}
            label="Thanh toán online"
          />
        </RadioGroup>
      </FormControl>

      <LoadingButton
        variant="outlined"
        color="success"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
        loading={isLoading.pay}
        onClick={handlePay}
        disabled={!paymentMethod}
      >
        {paymentMethod === PayMethod.lastPay ? "Đặt hàng" : "Thanh toán"}
      </LoadingButton>
    </Paper>
  );
});

export default PayInformation;
