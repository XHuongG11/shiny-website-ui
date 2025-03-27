// import imageProduct from '/image/allproduct/imageProduct.png';
import icHeart from '/image/allproduct/ic-heart.png';
import silverColor from '/image/allproduct/silver-color.png';
import goldColor from '/image/allproduct/gold-color.png';
import roseGoldColor from '/image/allproduct/rose-gold-color.png';
import styles from './ProductCard.module.css';
import PropTypes from "prop-types";

// const ProductCard = () => {
//     return (
//         <div className={styles.product}>
//             <img className={styles.productImage} src={imageProduct} alt="product image" />
//             <img className={styles.productFavourite} src={icHeart} alt="favourite product" />
//             <div className={styles.productColor}>
//                 <img src={silverColor} alt="silver color" />
//                 <img src={goldColor} alt="gold color" />
//                 <img src={roseGoldColor} alt="rose gold color" />
//             </div>
//             <p className={styles.productDiscount}>-20% BLACK FRIDAY</p>
//             <p className={styles.productName}>Pulsera Moments Cadena de Serpiente con cierre de Corazón</p>
//             <div className={styles.productPrice}>
//                 <p className={styles.productPriceDiscounted}>47,20 €</p>
//                 <p className={styles.productPriceOriginal}>59,00 €</p>
//             </div>
//         </div>
//     );
// };
const ProductCard = ({ imageSrc, discount, name, discountedPrice, originalPrice }) => {
    return (
        <div className={styles.product}>
            {/* Ảnh sản phẩm */}
            <img className={styles.productImage} src={imageSrc} alt="product image" />

            {/* Biểu tượng yêu thích */}
            <img className={styles.productFavourite} src={icHeart} alt="favourite product" />

            {/* Màu sắc sản phẩm */}
            <div className={styles.productColor}>
                <img src={silverColor} alt="silver color" />
                <img src={goldColor} alt="gold color" />
                <img src={roseGoldColor} alt="rose gold color" />
            </div>

            {/* Giảm giá */}
            {discount && <p className={styles.productDiscount}>{discount}</p>}

            {/* Tên sản phẩm */}
            <p className={styles.productName}>{name}</p>

            {/* Giá sản phẩm */}
            <div className={styles.productPrice}>
                <p className={styles.productPriceDiscounted}>{discountedPrice}</p>
                {originalPrice && <p className={styles.productPriceOriginal}>{originalPrice}</p>}
            </div>
        </div>
    );
};

// Định nghĩa kiểu dữ liệu cho props
ProductCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    favouriteSrc: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    discount: PropTypes.string,
    name: PropTypes.string.isRequired,
    discountedPrice: PropTypes.string.isRequired,
    originalPrice: PropTypes.string,
};

export default ProductCard;

