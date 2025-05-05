import styles from "./CustomerInfo.module.css";
import { GiQueenCrown } from "react-icons/gi";
import PropTypes from "prop-types";

const CustomerInfo = ({ userInfo }) => {
    console.log("Thông tin người dùng: ", userInfo);
  return (
    <div className={styles.userInfo}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <h2><GiQueenCrown /> THÔNG TIN TÀI KHOẢN</h2>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Họ và tên</span>
          <span className={styles.value}>{userInfo?.fullName || "N/A"}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Giới tính</span>
          <span className={styles.value}>{userInfo?.gender || "N/A"}</span>
        </div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={styles.label}>User Name</span>
          <span className={styles.value}>{userInfo?.username || "N/A"}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Số điện thoại</span>
          <span className={styles.value}>{userInfo?.phone || "N/A"}</span>
        </div>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.label}>Email</span>
        <span className={styles.value}>{userInfo?.email || "N/A"}</span>
      </div>
    </div>
  );
};
CustomerInfo.propTypes = {
    userInfo: PropTypes.shape({
      fullName: PropTypes.string,
      gender: PropTypes.string,
      username: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
  };
  
export default CustomerInfo;