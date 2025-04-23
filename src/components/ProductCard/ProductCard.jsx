// import imageProduct from '/image/allproduct/imageProduct.png';
import icHeart from '/image/allproduct/ic-heart.png';
import styles from './ProductCard.module.css';
import PropTypes from "prop-types";
import { useNavigate, } from "react-router-dom";
import { useState,useEffect } from "react";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";


const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};
const ProductCard = ({ product}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.current);
    const isLoggedIn = !!(user && user.email); // Kiểm tra người dùng đã đăng nhập hay chưa
    const handleClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
    };
    const [isInWishlist, setIsInWishlist] = useState(false);
    const handleToggleWishlist = async (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click vào toàn bộ card
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích.");
            navigate("/login");
            return;
        }

        try {
            if (isInWishlist) {
                // Xóa sản phẩm khỏi wishlist
                await userApi.removeWishList(product.id);
                alert("Đã xóa sản phẩm khỏi danh sách yêu thích!");
                setIsInWishlist(false);
            } else {
                // Thêm sản phẩm vào wishlist
                await userApi.addWishList({ productId: product.id });
                alert("Đã thêm sản phẩm vào danh sách yêu thích!");
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error("Lỗi khi xử lý wishlist:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!isLoggedIn) {
                console.log("Người dùng chưa đăng nhập, không tải danh sách wishlist.");
                return;
            }

            try {
                const response = await userApi.getWishList({ params: { page: 1, size: 100 } });
                const wishlist = response.data.content || [];
                const isProductInWishlist = wishlist.some((item) => item.productId === product.id);
                setIsInWishlist(isProductInWishlist);
            } catch (error) {
                console.error("Lỗi khi tải danh sách wishlist:", error);
            }
        };

        fetchWishlist();
    }, [isLoggedIn, product.id]);

    return (
        <div className={styles.product} onClick={handleClick} style={{ cursor: "pointer" }}>
            {/* Ảnh sản phẩm */}
            <img className={styles.productImage} src={product?.images[0]?.url} alt="product image" />
            {/* Biểu tượng yêu thích */}
            <img className={styles.productFavourite} src={icHeart} alt="favourite product" onClick={handleToggleWishlist}/>
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

