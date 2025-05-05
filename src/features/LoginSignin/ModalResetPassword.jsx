import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Notification from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  sendEmailResetPassword,
  verifyResetPassword,
} from "./store/emailSlice";

ModalResetPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function ModalResetPassword(props) {
  const { open, handleClose } = props;

  const [openVerify, setOpenVerify] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const loading = useSelector((state) => state.email.loading);

  const dispatch = useDispatch();
  return (
    <>
      {openNotification && (
        <Notification
          message={message}
          open={openNotification}
          severity={severity}
          setOpen={setOpenNotification}
          variant="filled"
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        slotProps={{
          paper: {
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());

              let fieldErrors = {};
              const email = formJson.email?.trim();
              if (!email) fieldErrors.email = "Vui lòng nhập email.";
              if (Object.keys(fieldErrors).length > 0) {
                setErrors(fieldErrors);
                return;
              }

              setErrors({});
              if (!openVerify) {
                // gửi email reset
                const resultAction = await dispatch(
                  sendEmailResetPassword({ email: email, role: "CUSTOMER" })
                );

                if (sendEmailResetPassword.fulfilled.match(resultAction)) {
                  const responseMessage = resultAction.payload?.message;
                  if (responseMessage === "Customer not found") {
                    setMessage("Email chưa được đăng ký tài khoản.");
                    setSeverity("error");
                    setOpenNotification(true);
                  } else if (responseMessage === "Success") {
                    console.log(responseMessage);
                    console.log("Success");
                    setOpenVerify(true);
                  }
                }
              } else {
                // xác thực code
                const code = formJson.code?.trim();
                const newPassword = formJson.newPassword?.trim();
                const confirmPassword = formJson.confirmPassword?.trim();
                const role = "CUSTOMER";

                if (!code) fieldErrors.code = "Vui lòng nhập mã xác nhận.";
                if (!newPassword) {
                  fieldErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
                } else if (newPassword.length < 8) {
                  fieldErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
                } else if (
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]/.test(
                    newPassword
                  )
                ) {
                  fieldErrors.newPassword =
                    "Mật khẩu phải có chữ hoa, chữ thường, số, ký tự đặc biệt và dài ít nhất 8 ký tự.";
                }
                if (!confirmPassword)
                  fieldErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
                if (
                  newPassword &&
                  confirmPassword &&
                  newPassword !== confirmPassword
                )
                  fieldErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";

                if (Object.keys(fieldErrors).length > 0) {
                  setErrors(fieldErrors);
                  return;
                }
                setErrors({});

                const resultAction = await dispatch(
                  verifyResetPassword({
                    email: email,
                    role: role,
                    newPassword: newPassword,
                    code: code,
                  })
                );
                if (verifyResetPassword.fulfilled.match(resultAction)) {
                  setMessage("Đổi tài mật khẩu thành công.");
                  setSeverity("success");
                  setOpenNotification(true);
                  handleClose();
                }
                if (verifyResetPassword.rejected.match(resultAction)) {
                  console.log(resultAction.payload);
                  setMessage(resultAction.payload?.message);
                  setSeverity("error");
                  setOpenNotification(true);
                }
              }
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textShadow: "none" }}>
            Nhập địa chỉ email để đặt lại mật khẩu.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label={
              <span>
                Email <span style={{ color: "red" }}>*</span>
              </span>
            }
            type="email"
            fullWidth
            variant="standard"
            error={!!errors.email}
            helperText={errors.email}
          />
          {openVerify && (
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="code"
                name="code"
                label={
                  <span>
                    Code <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.code}
                helperText={errors.code}
              />
              <TextField
                autoFocus
                margin="dense"
                id="newPassword"
                name="newPassword"
                label={
                  <span>
                    Mật khẩu mới <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.newPassword}
                helperText={errors.newPassword}
              />
              <TextField
                autoFocus
                margin="dense"
                id="confirmPassword"
                name="confirmPassword"
                label={
                  <span>
                    Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            loading={loading}
            loadingPosition="start"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalResetPassword;
