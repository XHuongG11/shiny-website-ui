import { IoHeartCircle } from "react-icons/io5";
import styles from "./WishlistItems.module.css";
import { useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import userApi from "../../../api/userApi";
import Notification from "../../../components/Alert";
import PropTypes from "prop-types"; // Nhập PropTypes

const WishlistItems = ({ wishlist, loading, error, updateWishlistState }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleToggleWishlist = async (product, action) => {
    try {
      if (action !== "remove") {
        throw new Error("Chỉ hỗ trợ xóa sản phẩm trong danh sách yêu thích");
      }
      await userApi.removeWishList(product.id);
      updateWishlistState(product.id);
      setNotification({
        open: true,
        message: "Đã xóa sản phẩm khỏi danh sách yêu thích",
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi wishlist:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra. Vui lòng thử lại!",
        severity: "error",
      });
    }
  };

  return (
    <div className={styles.wishlistContainer}>
      {notification.open && (
        <Notification
          severity={notification.severity}
          message={notification.message}
          open={notification.open}
          setOpen={() => setNotification({ ...notification, open: false })}
          variant="filled"
        />
      )}
      <div className={styles.wishlistHeader}>
        <h2>
          <IoHeartCircle /> SẢN PHẨM YÊU THÍCH
        </h2>
      </div>
      <hr />
      {loading ? (
        <p className={styles.loadingMessage}>Đang tải danh sách yêu thích...</p>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : wishlist.length > 0 ? (
        <div className={styles.wishlistItems}>
          {wishlist.map((item) => (
            <div key={item.product.id} className={styles.wishlistItem}>
              <ProductCard
                product={item.product}
                isInWishlist={true}
                updateWishlist={handleToggleWishlist}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Danh sách yêu thích của bạn đang trống.
        </p>
      )}
    </div>
  );
};

// Thêm PropTypes để xác thực props
WishlistItems.propTypes = {
  wishlist: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          })
        ),
        productSizes: PropTypes.arrayOf(
          PropTypes.shape({
            discountRate: PropTypes.number,
            price: PropTypes.number,
            discountPrice: PropTypes.number,
          })
        ),
      }).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updateWishlistState: PropTypes.func.isRequired,
};

export default WishlistItems;