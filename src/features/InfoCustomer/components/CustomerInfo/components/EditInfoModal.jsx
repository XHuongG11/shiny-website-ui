//đây là cửa sổ nhỏ để người dùng sửa thông tin cá nhân

import styles from "./EditInfoModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";

const EditInfoModal = ({ isOpen, onClose }) => { //cái này hong phải lỗi đâu nha do nó phải truyền từ cái kia qua á
      
  if (!isOpen) return null; // Nếu không mở thì ẩn modal
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>CHỈNH SỬA THÔNG TIN</h2>
            <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark/></button>
        </div>
        <hr />
        <div className={styles.inputGroup}>
            <input className={styles.text} type="text" placeholder="Họ và tên" />
            <input className={styles.text} type="text" placeholder="Email" />
            <input className={styles.text} type="text" placeholder="Số điện thoại" />
            <select><option>Chọn Tỉnh/Thành phố</option></select>
            <select><option>Chọn Quận/Huyện</option></select>
            <select><option>Chọn Phường/Xã</option></select>
            <input className={styles.text} type="text" placeholder="Nhập số nhà, địa chỉ" />
        </div>

        <button className={styles.submitBtn}>Lưu</button>
      </div>
    </div>
  );
};

export default EditInfoModal;
