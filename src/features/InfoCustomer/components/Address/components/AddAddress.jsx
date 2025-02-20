import styles from "./AddAddress.module.css"; // Import CSS
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import AddressModal from "./AddressModal";
const AddressCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.card}>
             
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
            <IoIosAddCircle/>
        </button>
        <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <button className={styles.viewallBtn}>Thêm địa chỉ</button>
    </div>
  );
};

export default AddressCard;
