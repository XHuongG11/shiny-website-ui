import { useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import styles from './Address.module.css';
import AddAddress from "./components/AddAddress";
import AddressCard from "./components/AddressCard";
import AllAddressModal from "./components/AllAddressModal";
import propTypes from "prop-types";
const Address = ({ addresses, onUpdate }) => {
  const defaultAddress = addresses.find((address) => address.default === true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2><FaTruckFast className="icon" /> DANH SÁCH ĐỊA CHỈ</h2>
        <button className={styles.viewallBtn} onClick={() => setIsModalOpen(true)}>Xem tất cả</button>
        {isModalOpen ? <AllAddressModal onClose={() => setIsModalOpen(false)} addresses={addresses} onUpdate={onUpdate} /> : null}
      </div>
      <div className={styles.cardBody}>
        <AddressCard address={defaultAddress} onUpdate={onUpdate} />      
        <AddAddress onUpdate={onUpdate} />
      </div>
    </div>
  );
};
Address.propTypes = {
  addresses: propTypes.array,
  onUpdate: propTypes.func,
}
export default Address;  