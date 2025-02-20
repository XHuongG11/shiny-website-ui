import styles from "./ProductCard.module.css";
import { FaTrashCan } from "react-icons/fa6";

const ProductCard = () => {
    
  return (
    <div className={styles.card}>
        <div className={styles.imgContainer}>
            <img src='./image/infocustomer/SP01.png'className={styles.image} />
        </div>
      <div className={styles.details}>
        <h3>Charm Pandora Khinh Khí Cầu Murano Đỏ</h3>
        <p className={styles.description}>Bạc / One size</p>
        <p className={styles.price}>2,990,000₫</p>
      </div>

      <button className={styles.deleteButton}><FaTrashCan/>
      </button>
    </div>
  );
};

export default ProductCard;
