import { FaTruckFast } from "react-icons/fa6";
import styles from './Address.module.css';
import AddressCard from "./components/AddressCard";
import AddAddress from "./components/AddAddress";

  const Address= () => {return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2><FaTruckFast className="icon" /> DANH SÁCH ĐỊA CHỈ</h2>
                <button className={styles.viewallBtn}>Xem tất cả</button>
            </div>
            <div className={styles.cardBody}>
                <AddressCard/>
                <AddAddress/>
            </div>
        </div>
      );
    };
  export default Address;  