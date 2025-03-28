// này là cái khung có dấu cộng với thêm địa chỉ

import styles from "./AddAddress.module.css"; // Import CSS
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";
import AddressModal from "./AddressModal";
import propTypes from "prop-types";

function AddressCard({ onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.card}>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        <IoIosAddCircle />
      </button>
      {isModalOpen ? (
        <AddressModal
          onClose={() => setIsModalOpen(false)}
          action="ADD"
          address={{}}
          onUpdate={onUpdate}
        />
      ) : null}

      <button
        className={styles.viewallBtn}
        onClick={() => setIsModalOpen(true)}
      >
        Thêm địa chỉ
      </button>
      {isModalOpen ? (
        <AddressModal
          onClose={() => setIsModalOpen(false)}
          action="ADD"
          address={{}}
          onUpdate={onUpdate}
        />
      ) : null}
    </div>
  );
}

AddressCard.propTypes = {
  onUpdate: propTypes.func,
};
export default AddressCard;
