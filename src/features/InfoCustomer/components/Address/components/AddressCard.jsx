//này là cái khung hiện địa chỉ mặc định

import propTypes from "prop-types";
import { useState } from "react";
import { SlNote } from "react-icons/sl";
import styles from "./AddressCard.module.css"; // Import CSS
import AddressModal from "./AddressModal";
import DeleteIcon from "@mui/icons-material/Delete";
import userApi from "../../../../../api/userApi";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

const AddressCard = ({ address, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleDeleteAddress = () => {
    setOpenConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (!address?.id) return;
    userApi
      .deleteAddress(address.id)
      .then(() => {
        onUpdate(address, true);
      })
      .catch((error) => console.error("Xoa that bai:", error));
    setOpenConfirmDialog(false);
  };

  return (
    <div className={styles.card}>
      {address?.default ? (
        <span className={styles.defaultLabel}>Mặc định</span>
      ) : (
        <DeleteIcon
          sx={{
            position: "absolute",
            top: "10px",
            right: "-8px",
            color: "#e23745",
            cursor: "pointer",
          }}
          onClick={handleDeleteAddress}
        />
      )}
      <div className={styles.info}>
        {address ? (
          <>
            <strong>
              {" "}
              {address.recipientName} - {address.recipientPhone}
            </strong>
            <p>
              {address.address}, {address.village}, {address.district},{" "}
              {address.province}
            </p>
          </>
        ) : (
          <p>Không có dữ liệu địa chỉ</p>
        )}
      </div>
      <button
        className={styles.editButton}
        onClick={() => setIsModalOpen(true)}
      >
        <SlNote />
      </button>
      {isModalOpen ? (
        <AddressModal
          onClose={() => setIsModalOpen(false)}
          action="EDIT"
          address={address}
          onUpdate={onUpdate}
        />
      ) : null}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa địa chỉ này không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Hủy</Button>
          <Button onClick={confirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
AddressCard.propTypes = {
  address: propTypes.object,
  onUpdate: propTypes.func,
};
export default AddressCard;
