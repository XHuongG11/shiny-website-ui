// import imageProduct from '/image/allproduct/imageProduct.png';
import icHeart from '/image/allproduct/ic-heart.png';
import silverColor from '/image/allproduct/silver-color.png';
import goldColor from '/image/allproduct/gold-color.png';
import roseGoldColor from '/image/allproduct/rose-gold-color.png';
import styles from './ProductCard.module.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};
const ProductCard = ({ product}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${product.id}`, { state: { product } }); // Chuyển dữ liệu qua state
    };

    return (
        <div className={styles.product} onClick={handleClick} style={{ cursor: "pointer" }}>
            {/* Ảnh sản phẩm */}
            <img className={styles.productImage} src={product.images[0].url} alt="product image" />

            {/* Biểu tượng yêu thích */}
            <img className={styles.productFavourite} src={icHeart} alt="favourite product" />

            {/* Màu sắc sản phẩm */}
            <div className={styles.productColor}>
                <img src={silverColor} alt="silver color" />
                <img src={goldColor} alt="gold color" />
                <img src={roseGoldColor} alt="rose gold color" />
            </div>

            {/* Giảm giá */}
            {product.productSizes[0].discountRate > 0 && (
                <p className={styles.productDiscount}>
                    -{product.productSizes[0].discountRate}% BLACK FRIDAY
                </p>
            )}

            {/* Tên sản phẩm */}
            <p className={styles.productName}>{product.title}</p>

            {/* Giá sản phẩm */}
            <div className={styles.productPrice}>
                {/* Nếu discountedPrice khác originalPrice mới hiển thị */}
                 {product.productSizes[0].discountPrice !== product.productSizes[0].price && (
                    <p className={styles.productPriceOriginal}>{formatPrice(product.productSizes[0].price)}</p>      
                )}
                <p className={styles.productPriceDiscounted}>{formatPrice(product.productSizes[0].discountPrice)}</p>
            </div>
        </div>
    );
};

// Định nghĩa kiểu dữ liệu cho props
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })).isRequired,
        productSizes: PropTypes.arrayOf(
            PropTypes.shape({
                discountRate:PropTypes.number,
                price: PropTypes.number,
                discountPrice: PropTypes.number,
            })
        ).isRequired,
    }).isRequired,
};

export default ProductCard;

