//này là cái khung hiện địa chỉ mặc định

import propTypes from "prop-types";
import { useState } from "react";
import { SlNote } from "react-icons/sl";
import styles from "./AddressCard.module.css"; // Import CSS
import AddressModal from "./AddressModal";

const AddressCard = ({ address, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      {address?.default ? <span className={styles.defaultLabel}>Mặc định</span> : null}
      <div className={styles.info}>
        {address ?
          <>
            < strong > {address.recipientName} - {address.recipientPhone}</strong>
            <p>{address.address}, {address.village}, {address.district}, {address.province}</p>
          </>
          : <p>Không có dữ liệu địa chỉ</p>}
      </div >
      <button className={styles.editButton} onClick={() => setIsModalOpen(true)}>
        <SlNote />
      </button>
      {
        isModalOpen ?
          <AddressModal onClose={() => setIsModalOpen(false)} action="EDIT" address={address} onUpdate={onUpdate} /> : null
      }
    </div >
  );
};
AddressCard.propTypes = {
  address: propTypes.object,
  onUpdate: propTypes.func,
}
export default AddressCard;
