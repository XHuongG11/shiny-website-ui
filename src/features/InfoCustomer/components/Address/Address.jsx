import { FaTruckFast } from "react-icons/fa6";
import styles from './Address.module.css';
import AddressCard from "./components/AddressCard";
import AddAddress from "./components/AddAddress";
import { useState } from "react";
import AllAddressModal from "./components/AllAddressModal";
  const Address= () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2><FaTruckFast className="icon" /> DANH SÁCH ĐỊA CHỈ</h2>
                <button className={styles.viewallBtn} onClick={() => setIsModalOpen(true)}>Xem tất cả</button>
                <AllAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
            <div className={styles.cardBody}>
                <AddressCard/>
                <AddAddress/>
            </div>
        </div>
      );
    };
  export default Address;  