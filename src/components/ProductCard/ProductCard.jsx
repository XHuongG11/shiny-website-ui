import styles from './ProductCard.module.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Notification from "../../components/Alert";

const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ";

const ProductCard = ({ product, isInWishlist, updateWishlist }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.current);
    const isLoggedIn = !!user?.email;
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

    const handleClick = () => navigate(`/product/${product.id}`, { state: { productId: product.id, isInWishlist } });


    const handleToggleWishlist = async (e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            setNotification({ open: true, message: "Vui lòng đăng nhập để thêm vào danh sách yêu thích.", severity: "error" });
            return setTimeout(() => navigate("/login"), 2000);
        }

        try {
            const action = isInWishlist ? "remove" : "add";
            await updateWishlist(product, action);
            setNotification({
                open: true,
                message: `Đã ${action === "add" ? "thêm" : "xóa"} sản phẩm ${action === "add" ? "vào" : "khỏi"} danh sách yêu thích!`,
                severity: "success",
            });
        } catch (error) {
            setNotification({ open: true, message: "Có lỗi xảy ra. Vui lòng thử lại!", severity: "error" });
        }
    };

    return (
        <div className={styles.product} onClick={handleClick} style={{ cursor: "pointer" }}>
            {notification.open && (
                <Notification
                    severity={notification.severity}
                    message={notification.message}
                    open={notification.open}
                    setOpen={() => setNotification({ ...notification, open: false })}
                    variant="filled"
                />
            )}
            <img className={styles.productImage} src={product?.images[0]?.url} alt="product image" />
            <img
                className={styles.productFavourite}
                src={isInWishlist ? '/image/productdetail/heart.png' : '/image/allproduct/ic-heart.png'}
                alt="favourite product"
                onClick={handleToggleWishlist}
            />
            {product.productSizes[0].discountRate > 0 && (
                <p className={styles.productDiscount}>-{product.productSizes[0].discountRate}% BLACK FRIDAY</p>
            )}
            <p className={styles.productName}>{product.title}</p>
            <div className={styles.productPrice}>
                {product.productSizes[0].discountPrice !== product.productSizes[0].price && (
                    <p className={styles.productPriceOriginal}>{formatPrice(product.productSizes[0].price)}</p>
                )}
                <p className={styles.productPriceDiscounted}>{formatPrice(product.productSizes[0].discountPrice)}</p>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })).isRequired,
        productSizes: PropTypes.arrayOf(
            PropTypes.shape({
                discountRate: PropTypes.number,
                price: PropTypes.number,
                discountPrice: PropTypes.number,
            })
        ).isRequired,
    }).isRequired,
    isInWishlist: PropTypes.bool.isRequired,
    updateWishlist: PropTypes.func.isRequired,
};

export default ProductCard;