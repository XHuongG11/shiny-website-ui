import styles from './CustomerInfo.module.css';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { useState } from "react";
import EditInfoModal from "./components/EditInfoModal";
import propTypes from "prop-types";

const CustomerInfo = ({ infoCus }) => {
  // Hàm render ô nhập liệu
  const renderInput = (label, icon, value) => (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <div className={styles.inputBox}>
        {icon} <input type="text" disabled value={value || ""} />
      </div>
    </div>
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2> <GiQueenCrown /> THÔNG TIN KHÁCH HÀNG</h2>
        <button className={styles.editbtn} onClick={() => setIsModalOpen(true)}>Chỉnh sửa</button>
        {isModalOpen ? <EditInfoModal onClose={() => setIsModalOpen(false)} infoCus={infoCus} /> : null}
      </div>
      <div className={styles.cardBody}>
        {renderInput("Họ và tên", <FaUser />, infoCus?.fullName)}
        {renderInput("Email", <FaEnvelope />, infoCus?.email)}
        {renderInput("Số điện thoại", <FaPhone />, infoCus?.phone)}
        {renderInput("Ngày sinh", <FaCalendar />, infoCus?.dob)}
        {renderInput("Giới tính", <FaVenusMars size={20} />, infoCus?.gender === "FEMALE" ? "Nữ" : "Nam")}

      </div>
    </div>
  );
};
CustomerInfo.propTypes = {
  infoCus: propTypes.object,
}
export default CustomerInfo;  