import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";

function ThankYou() {
  return (
    <div className={styles.thankYouContainer}>
      <h1 className={styles.title}>🎉 Cảm ơn bạn đã đánh giá sản phẩm!</h1>
      <p className={styles.message}>
        Ý kiến của bạn là động lực để chúng tôi không ngừng cải thiện chất lượng dịch vụ.
      </p>
      <p className={styles.message}>
        Chúng tôi sẽ phản hồi đánh giá của bạn trong thời gian sớm nhất.
      </p>
      <Link to="/myorder" className={styles.homeLink}>
          Xem danh sách đơn hàng
      </Link>
    </div>
  );
}

export default ThankYou;