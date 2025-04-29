import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";

function ThankYouReturn() {
  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.title}>🎉 Cảm ơn bạn đã tin tưởng mua sản phẩm của Shiny!</h1>
      <p className={styles.message}>
        Chúng tôi đã tiếp nhận yêu cầu hoàn trả của bạn.
      </p>
      <p className={styles.message}>
        Đội ngũ hỗ trợ sẽ kiểm tra và phản hồi đến bạn trong thời gian sớm nhất.
      </p>
      <Link to="/myorder" className={styles.homeLink}>
        Xem danh sách đơn hàng
      </Link>
    </div>
  );
}

export default ThankYouReturn;
