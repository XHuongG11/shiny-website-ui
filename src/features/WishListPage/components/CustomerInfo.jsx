import styles from "./CustomerInfo.module.css";
import { GiQueenCrown } from "react-icons/gi";
import { useState, useEffect } from "react";
import userApi from "../../../api/userApi";

const CustomerInfo = () => {
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [error, setError] = useState(null); // State để quản lý lỗi

  // Gọi API getInfo khi component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await userApi.getInfo(); // Gọi API getInfo
        setUserInfo(response.data); // Lưu dữ liệu vào state (giả sử API trả về dữ liệu trong response.data)
        console.log("Thông tin người dùng: ", response.data);
      } catch (err) {
        setError("Không thể lấy thông tin người dùng");
        console.error("Lỗi khi gọi API getInfo: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Hiển thị khi đang loading
  if (loading) {
    return <div>Đang tải thông tin...</div>;
  }

  // Hiển thị khi có lỗi
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>
            <GiQueenCrown /> THÔNG TIN TÀI KHOẢN
          </h2>
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
export default CustomerInfo;