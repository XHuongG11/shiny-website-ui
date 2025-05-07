import { Box, Typography, Button, Paper } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useSearchParams } from "react-router-dom";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../LoginSignin/store/authSlice";
import { toast, ToastContainer } from "react-toastify";

function ConfirmDeleteAcccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  const onCancel = () => {
    navigate("/infocus");
  };

  const onConfirm = async () => {
    try {
      if (!token) {
        toast.warn("Token not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }
      const resp = await userApi.confirmDeleteAccount({ token: token });
      if (resp.message === "Success") {
        toast.success("Account deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        dispatch(logout());
        navigate("/");
      } else if (resp.code === "400") {
        toast.error("Token không đúng.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 4 }}>
      <ToastContainer />
      <Box sx={{ textAlign: "center" }}>
        <WarningIcon sx={{ fontSize: 60, color: "warning.main", mb: 2 }} />

        <Typography variant="h5" gutterBottom>
          Xác nhận xóa tài khoản
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Bạn có chắc chắn muốn xóa tài khoản của mình? Sau khi xóa:
        </Typography>

        <Box sx={{ textAlign: "left", mb: 3 }}>
          <Typography component="ul" sx={{ pl: 2 }}>
            <li>Tài khoản của bạn sẽ bị vô hiệu hóa vĩnh viễn</li>
            <li>
              Bạn chỉ có thể liên hệ cho nhân viên hỗ trợ để khôi phục lại tài
              khoản
            </li>
            <li>Bạn sẽ mất quyền truy cập vào tất cả dịch vụ liên quan</li>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="outlined" onClick={onCancel} sx={{ minWidth: 120 }}>
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{ minWidth: 120 }}
          >
            Xóa tài khoản
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ConfirmDeleteAcccount;
