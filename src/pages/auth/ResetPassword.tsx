import { Box, TextField, Typography, IconButton } from "@mui/material";
import { LoginBg } from "../../constants/images";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
import { mainColor } from "../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const InitialErrText: {
  email: string;
  password: string;
  confirmPassword: string;
} = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowCfPass, setIsShowCfPass] = useState(false);
  const [errText, setErrText] = useState(InitialErrText);
  const [data, setData] = useState(InitialErrText);

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const verifyEmail = async () => {
    await sendPasswordResetEmail(auth, data.email)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log(123);
    }
  });

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data: ResetPasswordType = {
  //     email: formData.get("email") as string,
  //     password: formData.get("password") as string,
  //     confirmPassword: formData.get("confirmPassword") as string,
  //   };

  //   setErrText(InitialErrText);

  //   await dispatch(authActions.resetPassword(data))
  //     .unwrap()
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((err: any) => {
  //       err?.errors &&
  //         err.errors.forEach((e: any) => {
  //           switch (e.path) {
  //             case "phone":
  //               setErrText((prev) => ({
  //                 ...prev,
  //                 phone: e.msg,
  //               }));
  //               break;
  //             case "password":
  //               setErrText((prev) => ({
  //                 ...prev,
  //                 password: e.msg,
  //               }));
  //               break;
  //             default:
  //               break;
  //           }
  //         });
  //     });
  // };

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
        component={"form"}
        // onSubmit={verifyEmail}
      >
        <Typography fontWeight={600} fontSize={30}>
          Quên mật khẩu
        </Typography>
        <TextField
          label="Email"
          name="email"
          margin="normal"
          sx={{ width: { sm: 400, xs: "100%" } }}
          required
          value={data.email}
          onChange={(e) =>
            setData((pre) => ({
              ...pre,
              email: e.target.value,
            }))
          }
          error={errText.email !== ""}
          helperText={errText.email}
        />
        {/* <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <TextField
            label="Mật khẩu mới"
            name="password"
            margin="normal"
            type={isShowPass ? "text" : "password"}
            autoComplete="false"
            sx={{ width: { sm: 400, xs: "100%" } }}
            required
            error={errText.password !== ""}
            helperText={errText.password}
            value={data.password}
            onChange={(e) =>
              setData((pre) => ({
                ...pre,
                password: e.target.value,
              }))
            }
          />
          <IconButton onClick={() => setIsShowPass(!isShowPass)}>
            <RemoveRedEyeIcon
              sx={{ color: isShowPass ? mainColor : "normal" }}
            />
          </IconButton>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <TextField
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            margin="normal"
            type={isShowCfPass ? "text" : "password"}
            autoComplete="false"
            sx={{ width: { sm: 400, xs: "100%" } }}
            required
            error={errText.password !== ""}
            helperText={errText.password}
            value={data.confirmPassword}
            onChange={(e) =>
              setData((pre) => ({
                ...pre,
                confirmPassword: e.target.value,
              }))
            }
          />
          <IconButton onClick={() => setIsShowCfPass(!isShowCfPass)}>
            <RemoveRedEyeIcon
              sx={{ color: isShowCfPass ? mainColor : "normal" }}
            />
          </IconButton>
        </Box> */}
        <LoadingButton
          variant="contained"
          color="success"
          sx={{ mt: 2, width: { sm: 400, xs: "100%" } }}
          // type="submit"
          onClick={verifyEmail}
          loading={loading}
        >
          Xác nhận
        </LoadingButton>
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
};

export default ResetPassword;