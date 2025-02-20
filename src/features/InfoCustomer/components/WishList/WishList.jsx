import { MdProductionQuantityLimits } from "react-icons/md";
import styles from './WishList.module.css';
import ProductCard from "./components/ProductCard";

  const WishList = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2><MdProductionQuantityLimits className="icon" /> SẢN PHẨM THEO DÕI</h2>
                <button className={styles.viewallBtn}>Xem tất cả</button>
            </div>
            
            <div className={styles.cardBody}>
              <ProductCard/>
              <ProductCard/>
            </div>
        </div>
      );
    };
  export default WishList;  