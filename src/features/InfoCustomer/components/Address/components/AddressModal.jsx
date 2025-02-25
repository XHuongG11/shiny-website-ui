//đây là cửa sổ nhỏ để người dùng điền thông tin thêm địa chỉ

import styles from "./AddressModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";

const AddressModal = ({ isOpen, onClose }) => { //cái này hong phải lỗi đâu nha do nó phải truyền từ cái kia qua á
      
  if (!isOpen) return null; // Nếu không mở thì ẩn modal
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>THÊM ĐỊA CHỈ</h2>
            <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark/></button>
        </div>
        <hr />
        
        <h3 style={{ fontWeight: "bold" }}>Thông tin người nhận</h3>
        <input className={styles.text} type="text" placeholder="Tên người nhận" />
        <input className={styles.text} type="text" placeholder="Số điện thoại" />
        <hr />

        <h3 style={{ fontWeight: "bold" }}>Địa chỉ</h3>
        <div className={styles.inputGroup}>
          <select><option>Chọn Tỉnh/Thành phố</option></select>
          <select><option>Chọn Quận/Huyện</option></select>
          <select><option>Chọn Phường/Xã</option></select>
          <input className={styles.text} type="text" placeholder="Nhập số nhà, địa chỉ" />
        </div>

        <button className={styles.submitBtn}>Hoàn thành</button>
      </div>
    </div>
  );
};

export default AddressModal;
