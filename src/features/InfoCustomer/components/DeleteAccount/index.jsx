import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import userApi from "../../../../api/userApi";
import { toast, ToastContainer } from "react-toastify";

DeleteAccount.propTypes = {};

function DeleteAccount() {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const confirmDelete = async () => {
    try {
      const resp = await userApi.deleteAccount();
      if (resp.message === "Success") {
        setOpenConfirmDialog(false);
        setOpenNotification(true);
      } else if (resp.code === "400") {
        toast.error("Không thể xóa tài khoản này.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (resp.code === "1000") {
        toast.error("Không tìm thấy tài khoản.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <Button
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={() => setOpenConfirmDialog(true)}
      >
        Xóa tài khoản
      </Button>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa tài khoản không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      >
        <DialogContent>
          Chúng tôi đã gửi cho bạn 1 email xác nhận việc xóa tài khoản. Bạn vui
          lòng kiểm tra email, làm theo chỉ dẫn để hoàn tất việc xóa tài khoản.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotification(false)} variant="outlined">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteAccount;
