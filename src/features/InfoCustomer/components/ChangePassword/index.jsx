import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import userApi from "../../../../api/userApi";
import Notification from "../../../../components/Alert";

ModalChangePassword.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
};

function ModalChangePassword({ handleCloseModal, openDialog }) {
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

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseModal}
        maxWidth="xs"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());

              let errorFields = {};
              const oldPassword = formJson.oldPassword.trim();
              const newPassword = formJson.newPassword.trim();
              const confirmPassword = formJson.confirmPassword.trim();

              // handle exception
              if (!oldPassword)
                errorFields.oldPassword = "Vui lòng nhập mật khẩu cũ.";
              if (!newPassword)
                errorFields.newPassword = "Vui lòng nhập mật khẩu mới.";
              if (!confirmPassword)
                errorFields.confirmPassword =
                  "Vui lòng nhập xác nhận mật khẩu.";
              if (confirmPassword !== newPassword)
                errorFields.confirmPassword =
                  "Mật khẩu mới và xác nhận mật khẩu không khớp.";
              if (Object.keys(errorFields).length > 0) {
                setErrors(errorFields);
                return;
              }
              setErrors({});

              // call api
              try {
                setLoading(true);
                await userApi.changePassword({
                  oldPassword: oldPassword,
                  newPassword: newPassword,
                });
                setLoading(false);
                setOpenNotification(true);
                setMessage("Thay đổi mật khẩu thành công.");
                setSeverity("success");
                handleCloseModal();
              } catch (error) {
                console.log("Error", error);
                if (error.status == 400) {
                  setOpenNotification(true);
                  setMessage("Mật khẩu cũ không chính xác.");
                  setSeverity("error");
                  setLoading(false);
                }
              }
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Thay đổi mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textShadow: "none" }}>
            Điền mật khẩu cũ và mật khẩu mới để thay đổi mật khẩu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label={
              <span>
                Mật khẩu cũ <span style={{ color: "red" }}>*</span>
              </span>
            }
            type="text"
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
            fullWidth
            variant="standard"
          />

          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              <span>
                Mật khẩu mới <span style={{ color: "red" }}>*</span>
              </span>
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              fullWidth
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
              {errors.newPassword}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              <span>
                Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
              </span>
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              fullWidth
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
              {errors.confirmPassword}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            Hủy bỏ
          </Button>
          <Button
            variant="outlined"
            loading={loading}
            loadingPosition="start"
            sx={{ color: "green" }}
            type="submit"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {openNotification && (
        <Notification
          message={message}
          open={openNotification}
          severity={severity}
          setOpen={setOpenNotification}
          variant="filled"
        />
      )}
    </>
  );
}

export default ModalChangePassword;
