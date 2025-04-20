import styles from "./ProductCard.module.css";
import { FaTrashCan } from "react-icons/fa6";
import propTypes from "prop-types";

const ProductCard = ({product, onRemove}) => {


  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={product.images[0]?.url} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3>{product.title}</h3>
        <p className={styles.description}>{product.material || "Không xác định"} /  
         {product.productSizes.map((sizeObj) => (sizeObj.size === "No size" ? "One size" : sizeObj.size)).join(", ")}</p>
        <p className={styles.price}>{new Intl.NumberFormat("vi-VN").format(product.productSizes[0].discountPrice || 0)}₫</p>
      </div>
      <button className={styles.deleteButton} onClick={onRemove}><FaTrashCan /></button>
    </div>
  );
};
ProductCard.propTypes = {
  product: propTypes.object,
  onRemove: propTypes.func.isRequired,
}

export default ProductCard;
