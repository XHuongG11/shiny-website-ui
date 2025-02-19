import { FaShoppingCart} from "react-icons/fa";
import styles from './PurchaseHistory.module.css';

  const PurchaseHistory = () => {return (
        <div className={styles.card}>
            <div className="card-header">
                <h2><FaShoppingCart className="icon" /> LỊCH SỬ MUA HÀNG</h2>
                <button className="view-all-btn">Xem tất cả</button>
            </div>
            <div className="card-body">
                <p>Charm Pandora Kính Khí Cầu Murano Đỏ</p>
                <span>1 x 2,990,000đ</span>
                <button className="view-more">Xem thêm</button>
            </div>
        </div>
      );
    };
  export default PurchaseHistory;  