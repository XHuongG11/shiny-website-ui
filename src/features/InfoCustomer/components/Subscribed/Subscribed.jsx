import { useState } from "react";
import styles from "./Subscribed.module.css";
import { FaBell } from "react-icons/fa";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const SubscribedBanner = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.notificationIcon} onClick={handleToggle}>
        <NotificationsNoneIcon style={{ fontSize: 24}} />
      </div>

      {open && (
        <div className={styles.banner}>
          <h3>
            <FaBell className={styles.bellIcon} /> Đăng ký theo dõi
          </h3>
          <p>Nhận thông báo về các sản phẩm mới nhất ngay khi có mặt!</p>
          <button className={styles.button}>Đăng ký ngay</button>
        </div>
      )}
    </div>
  );
};

export default SubscribedBanner;
