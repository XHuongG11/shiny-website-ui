//đây là cửa sổ nhỏ để người dùng sửa thông tin cá nhân

import styles from "./AllAddressModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";
import AddressCard from "./AddressCard";

const AllAddressModal = ({ isOpen, onClose }) => { //cái này hong phải lỗi đâu nha do nó phải truyền từ cái kia qua á
      
  if (!isOpen) return null; // Nếu không mở thì ẩn modal
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>SẢN PHẨM THEO DÕI</h2>
            <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark/></button>
        </div>
        <hr />
        <div className={styles.cardBody}>
              <AddressCard/>
              <AddressCard/>
            </div>
      </div>
    </div>
  );
};

export default AllAddressModal;
