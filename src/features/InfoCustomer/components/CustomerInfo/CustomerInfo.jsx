import styles from './CustomerInfo.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt} from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";

// Hàm render ô nhập liệu
const renderInput = (label, icon) => (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <div className={styles.inputBox}>
        {icon} <input type="text" disabled />
      </div>
    </div>
  );
const CustomerInfo = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2> <GiQueenCrown/> THÔNG TIN KHÁCH HÀNG</h2> 
                <button className={styles.editbtn}>Chỉnh sửa</button>
            </div>
            <div className={styles.cardBody}>
                {renderInput("Họ và tên", <FaUser />)}
                {renderInput("Email", <FaEnvelope />)}
                {renderInput("Số điện thoại", <FaPhone />)}
                {renderInput("Địa chỉ", <FaMapMarkerAlt />)}
                {renderInput("Phường/Xã", <FaMapMarkerAlt />)}
                {renderInput("Quận/Huyện", <FaMapMarkerAlt />)}
                {renderInput("Tỉnh/Thành", <FaMapMarkerAlt />)}
            </div>
        </div>
    );
  };
export default CustomerInfo;  