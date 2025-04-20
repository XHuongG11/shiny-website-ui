import PropTypes from 'prop-types';
import styles from './ProductItem.module.css';

function ProductItem({ product, quantity = 1, productSize }) {
    const title = product?.title || "Charm Vòng Tay Pandora ME";
    const image = product?.images?.length > 0 
        ? product.images[0]?.url 
        : "/imgCart/charm.png";
    const size = productSize?.size || "No size";
    const price = productSize?.price || product?.price || 3580000;

    return (
        <div className={styles.productItem}>
            <div className={styles.productImage}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.productDetails}>
                <div className={styles.productInfo}>
                    <p className={styles.productName}>{title}</p>
                    <p className={styles.productSize}>Size: {size}</p>
                </div>
                <div className={styles.productPrice}>
                    <p className={styles.quantity}>x{quantity}</p>
                    <p className={styles.price}>{price.toLocaleString()}đ</p>
                </div>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    product: PropTypes.object,
    quantity: PropTypes.number,
    productSize: PropTypes.object,
};

export default ProductItem;
