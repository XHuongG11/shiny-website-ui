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
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  const roles = ["CUSTOMER", "STAFF", "ADMIN"];

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
    email: yup
      .string()
      .email("Email không hợp lệ.")
      .required("Vui lòng nhập email."),
    newPassword: yup.string().required("Vui lòng nhập mật khẩu mới."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp.")
      .required("Vui lòng xác nhận mật khẩu."),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      role: "CUSTOMER",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleResetPassSubmit = async (values) => {
    console.log(values);
    const request = {
      email: values.email,
      role: values.role,
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
            <TextField
              id="email"
              {...register("email")}
              label={
                <>
                  Email <span style={{ color: "red" }}>*</span>
                </>
              }
              variant="standard"
              fullWidth
              type="email"
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />

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
            <FormControl error={!!errors?.role} fullWidth>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    fullWidth
                    id="role"
                    {...field}
                    label="Role"
                    labelId="role"
                    value={field.value}
                    variant="standard"
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors?.role?.message}</FormHelperText>
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
