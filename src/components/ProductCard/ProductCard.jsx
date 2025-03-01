import imageProduct from '/image/allproduct/imageProduct.png';
import icHeart from '/image/allproduct/ic-heart.png';
import silverColor from '/image/allproduct/silver-color.png';
import goldColor from '/image/allproduct/gold-color.png';
import roseGoldColor from '/image/allproduct/rose-gold-color.png';
import styles from './ProductCard.module.css';

const ProductCard = () => {
    return (
        <div className={styles.product}>
            <img className={styles.productImage} src={imageProduct} alt="product image" />
            <img className={styles.productFavourite} src={icHeart} alt="favourite product" />
            <div className={styles.productColor}>
                <img src={silverColor} alt="silver color" />
                <img src={goldColor} alt="gold color" />
                <img src={roseGoldColor} alt="rose gold color" />
            </div>
            <p className={styles.productDiscount}>-20% BLACK FRIDAY</p>
            <p className={styles.productName}>Pulsera Moments Cadena de Serpiente con cierre de Corazón</p>
            <div className={styles.productPrice}>
                <p className={styles.productPriceDiscounted}>47,20 €</p>
                <p className={styles.productPriceOriginal}>59,00 €</p>
            </div>
        </div>
    );
};

export default ProductCard;