//đây là cửa sổ nhỏ để người dùng sửa thông tin cá nhân

import styles from "./AllAddressModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";
import AddressCard from "./AddressCard";
import propTypes from "prop-types";
const AllAddressModal = ({ onClose, addresses, onUpdate }) => { //cái này hong phải lỗi đâu nha do nó phải truyền từ cái kia qua á

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>DANH SÁCH ĐỊA CHỈ</h2>
          <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark /></button>
        </div>
        <hr/>
        <div className={styles.cardBody}>
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} onUpdate={onUpdate} />))}
        </div>
      </div>
    </div>
  );
};
AllAddressModal.propTypes = {
  onClose: propTypes.func,
  addresses: propTypes.array,
  onUpdate: propTypes.func,
}
export default AllAddressModal;
