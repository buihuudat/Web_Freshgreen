import { Box, Button, TextField, Typography } from "@mui/material";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAppDispatch } from "../../redux/hooks";
import { useRef, useState } from "react";
import { mainColor } from "../../constants/colors";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { LoginBg } from "../../constants/images";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { authActions } from "../../actions/authActions";

interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}
declare var window: ExtendedWindow;

export default function LoginWithSMS() {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const [errText, setErrText] = useState("");
  const [verify, setVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const recaptchaContainer = document.getElementById("recaptcha-container");

  const verifyCapcha = async () => {
    if (recaptchaContainer && !recaptchaContainer.hasChildNodes()) {
      if (phone === "" || phone.length < 10) return;
      let verify = new RecaptchaVerifier(auth, recaptchaContainer, {
        size: "invisible",
        callback: (response: any) => {
          setVerify(true);
        },
      });

      await signInWithPhoneNumber(auth, phone, verify)
        .then((confirmationResult) => {
          console.log(confirmationResult);
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
          NotificationToast({
            message:
              "Bạn đã thực hiện hành động này nhiều lần, Vui lòng thử lại sau.",
            type: "error",
          });
          setVerify(false);
        });
    }
    return <div ref={recaptchaRef} id="recaptcha-container"></div>;
  };

  const login = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result: any) => {
        dispatch(
          authActions.sms(
            formatPhoneNumber(result.user.phoneNumber).replace(/\D/g, "")
          )
        )
          .unwrap()
          .then(() => {
            setLoading(false);
            navigate("/");
          })
          .catch((error: any) => {
            if (error.message) {
              NotificationToast({ message: error.message, type: "error" });
            }
            setVerify(false);
            setOtp("");
          });
      })
      .catch((error: any) => {
        NotificationToast({ message: "Đã xảy ra lỗi", type: "error" });
        setVerify(false);
        setOtp("");
      });
  };

  return (
    <Box
      display={{ sm: "flex", xs: "column" }}
      flexDirection={"row"}
      justifyContent={"space-around"}
    >
      <img
        src={LoginBg}
        alt="login bg"
        style={window.innerWidth < 600 ? { width: "100%" } : {}}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={{ sm: 500, xs: "100%" }}
      >
        <Typography fontWeight={600} fontSize={30}>
          Đăng nhập bằng SMS
        </Typography>

        <Box>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e!)}
            style={{
              width: 300,
              height: 80,
              fontSize: 23,
            }}
            defaultCountry="VN"
          />
        </Box>

        <div id="recaptcha-container"></div>

        {verify ? (
          <Box>
            <TextField
              label="OTP"
              margin="normal"
              sx={{ width: { sm: 300, xs: "100%" } }}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={errText !== ""}
              helperText={errText}
            />
            <LoadingButton
              variant="contained"
              color="success"
              sx={{ mt: 2, width: { sm: 300, xs: "100%" } }}
              type="submit"
              onClick={login}
              loading={loading}
            >
              Đăng nhập
            </LoadingButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2, width: { sm: 300, xs: "100%" } }}
            type="submit"
            onClick={verifyCapcha}
            disabled={phone === ""}
          >
            Xác nhận
          </Button>
        )}
        <Link
          to={"/dang-nhap"}
          style={{
            fontWeight: 600,
            color: mainColor,
            paddingTop: 10,
            textDecoration: "none",
          }}
        >
          Quay lại trang Đăng nhập
        </Link>
        <Typography>
          Bạn chưa có tài khoản?{" "}
          <Link
            to={"/dang-ky"}
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: mainColor,
            }}
          >
            Đăng ký ngay
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
