//này là cái khung hiện địa chỉ mặc định

import styles from "./AddressCard.module.css"; // Import CSS
import { SlNote } from "react-icons/sl";
import { useState } from "react";
import EditAddressModal from "./EditAddressModal";

const AddressCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.card}>
        {<span className={styles.defaultLabel}>Mặc định</span>}
      <div className={styles.info}>
        <strong >Nguyễn Lê Mỹ Hoàng - 0944296007</strong>
        <p>71 Tôn Đức Thắng, Long Thới, Long Thành Trung, Hòa Thành, Tây Ninh</p>
      </div>     
      <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
        <SlNote/>
      </button>
      <EditAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AddressCard;
