import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import authApi from "../../api/authApi";
import Notification from "../../components/Alert";

RecoverPassword.propTypes = {};

function RecoverPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [severity, setSeverity] = useState();
  const [message, setMessage] = useState();
  const [openNotification, setOpenNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới.")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]/,
        "Mật khẩu phải có chữ hoa, chữ thường, số, ký tự đặc biệt và dài ít nhất 8 ký tự."
      ),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập xác nhận mật khẩu.")
      .oneOf([yup.ref("newPassword")], "Mật khẩu mới và xác nhận không khớp."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleResetPassSubmit = async (values) => {
    console.log(values);
    const request = {
      token: token,
      newPassword: values.newPassword,
    };
    console.log(token);
    console.log(request);
    try {
      setLoading(true);
      const response = await authApi.verifyResetPassword(request);
      setLoading(false);
      console.log("repsponse", response);
      if (response.code === "200") {
        console.log("repsponse", response);
        setMessage("Đổi tài mật khẩu thành công.");
        setSeverity("success");
        setOpenNotification(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      setSeverity("error");
      setOpenNotification(true);
    }
  };
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "500px",
          margin: "30px auto",
          marginTop: "30px",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit(handleResetPassSubmit)}>
          <h2 style={{ textAlign: "center" }}>
            Nhập thông tin để đặt lại mật khẩu
          </h2>
          <Grid2 container direction="row" gap={3}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="newPassword">
                Mật khẩu mới <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors?.newPassword?.message}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="confirmPassword">
                Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "red" }}>
                {errors?.confirmPassword?.message}
              </FormHelperText>
            </FormControl>
            <Button
              loading={loading}
              loadingPosition="start"
              type="submit"
              variant="contained"
              sx={{
                justifyContent: "flex-end",
                backgroundColor: "green",
              }}
            >
              Xác nhận
            </Button>
          </Grid2>
        </form>
      </Paper>
      <Notification
        message={message}
        open={openNotification}
        severity={severity}
        setOpen={setOpenNotification}
        variant="filled"
      />
    </>
  );
}

export default RecoverPassword;
