import { useState } from "react";
import styles from "./Subscribed.module.css";
import { FaBell } from "react-icons/fa";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import propTypes from "prop-types";

const SubscribedBanner = ({ onSubscribe ,isSubscribed} ) => {
  const [open, setOpen] = useState(false);
  
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.notificationIcon} onClick={handleToggle}>
        <NotificationsNoneIcon style={{ fontSize: 28}} />
      </div>

      {open && (
        <div className={styles.banner}>
          <h3>
            <FaBell className={styles.bellIcon} /> Đăng ký theo dõi
          </h3>
          <p className={styles.Notifications}>
            {isSubscribed
              ? "Bạn đã đăng kí nhận các thông báo về các sản phẩm mới"
              : "Nhận thông báo về các sản phẩm mới nhất ngay khi có mặt!"}
          </p>
          <button className={styles.button} onClick={onSubscribe}>
            {isSubscribed ? "Hủy theo dõi" : "Đăng ký ngay"}
          </button>
        </div>
      )}
    </div>
  );
};
// Thêm propTypes để xác định kiểu dữ liệu của props
SubscribedBanner.propTypes = {
  onSubscribe: propTypes.func.isRequired, // Xác định onSubscribe là một hàm và bắt buộc
  isSubscribed: propTypes.func.isRequired,
};
export default SubscribedBanner;
