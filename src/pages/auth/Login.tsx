import { Box, TextField, Typography, IconButton } from "@mui/material";
import { LoginBg } from "../../utils/Constants/images";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
import { mainColor } from "../../utils/Constants/colors";
import { LoginType } from "../../types/authType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authActions } from "../../actions/authActions";
import { RootState } from "../../redux/store";

const InitialErrText: { phone: string; password: string } = {
  phone: "",
  password: "",
};

const Login = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [errText, setErrText] = useState(InitialErrText);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginType = {
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
    };

    setErrText(InitialErrText);

    await dispatch(authActions.login(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case "phone":
                setErrText((prev) => ({
                  ...prev,
                  phone: e.msg,
                }));
                break;
              case "password":
                setErrText((prev) => ({
                  ...prev,
                  password: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });
  };

  return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
      <img src={LoginBg} alt="login bg" />
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={500}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Typography fontWeight={600} fontSize={30}>
          Đăng nhập
        </Typography>
        <TextField
          label="Số điện thoại"
          name="phone"
          margin="normal"
          sx={{ width: 400 }}
          required
          error={errText.phone !== ""}
          helperText={errText.phone}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <TextField
            label="Mật khẩu"
            name="password"
            margin="normal"
            type={isShowPass ? "text" : "password"}
            autoComplete="false"
            sx={{ width: 400 }}
            required
            error={errText.password !== ""}
            helperText={errText.password}
          />
          <IconButton onClick={() => setIsShowPass(!isShowPass)}>
            <RemoveRedEyeIcon
              sx={{ color: isShowPass ? mainColor : "normal" }}
            />
          </IconButton>
        </Box>
        <LoadingButton
          variant="contained"
          color="success"
          sx={{ mt: 2, width: 400 }}
          type="submit"
          loading={loading}
        >
          Đăng nhập
        </LoadingButton>
        <Typography sx={{ pt: 2 }}>
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

export default Login;
