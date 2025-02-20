import styles from "./AddressCard.module.css"; // Import CSS
import { SlNote } from "react-icons/sl";
const AddressCard = () => {
  return (
    <div className={styles.card}>
        {<span className={styles.defaultLabel}>Mặc định</span>}
      <div className={styles.info}>
        <strong >Nguyễn Lê Mỹ Hoàng - 0944296007</strong>
        <p>71 Tôn Đức Thắng, Long Thới, Long Thành Trung, Hòa Thành, Tây Ninh</p>
      </div>     
      <button className={styles.editButton}>
        <SlNote/>
      </button>
    </div>
  );
};

export default AddressCard;
