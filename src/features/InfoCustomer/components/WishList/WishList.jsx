import { MdProductionQuantityLimits } from "react-icons/md";
import styles from './WishList.module.css';
import ProductCard from "./components/ProductCard";
import { useState } from "react";
import AllWishListModal from "./components/AllWishListModal";

  const WishList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2><MdProductionQuantityLimits className="icon" /> SẢN PHẨM THEO DÕI</h2>
                <button className={styles.viewallBtn} onClick={() => setIsModalOpen(true)}>Xem tất cả</button>
                <AllWishListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
            
            <div className={styles.cardBody}>
              <ProductCard/>
              <ProductCard/>
            </div>
        </div>
      );
    };
  export default WishList;  