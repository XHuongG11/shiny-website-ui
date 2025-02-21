import styles from './CustomerInfo.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt} from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { useState } from "react";
import EditInfoModal from "./components/EditInfoModal";

const CustomerInfo = () => {
    // Hàm render ô nhập liệu
  const renderInput = (label, icon) => (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <div className={styles.inputBox}>
        {icon} <input type="text" disabled />
      </div>
    </div>
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2> <GiQueenCrown/> THÔNG TIN KHÁCH HÀNG</h2> 
                <button className={styles.editbtn} onClick={() => setIsModalOpen(true)}>Chỉnh sửa</button>
                <EditInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
            <div className={styles.cardBody}>
                {renderInput("Họ và tên", <FaUser />)}
                {renderInput("Email", <FaEnvelope />)}
                {renderInput("Số điện thoại", <FaPhone />)}      
                {renderInput("Phường/Xã", <FaMapMarkerAlt />)}
                {renderInput("Quận/Huyện", <FaMapMarkerAlt />)}
                {renderInput("Tỉnh/Thành", <FaMapMarkerAlt />)}
                {renderInput("Địa chỉ", <FaMapMarkerAlt />)}
            </div>
        </div>
    );
  };
export default CustomerInfo;  