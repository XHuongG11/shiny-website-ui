//đây là cửa sổ nhỏ để người dùng sửa thông tin cá nhân

import styles from "./AllWishListModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";
import propTypes from "prop-types";
import ProductCard from "./ProductCard";

const AllWishListModal = ({ isOpen, wishlist, onClose, onRemove }) => { //cái này hong phải lỗi đâu nha do nó phải truyền từ cái kia qua á
      
  if (!isOpen) return null; // Nếu không mở thì ẩn modal
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>SẢN PHẨM THEO DÕI</h2>
            <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark/></button>
        </div>
        <hr />
        <div className={styles.cardBody}>
              {wishlist.length > 0 ? (
                wishlist.map((item) => { // Hiển thị tối đa 2 sản phẩm
                  return <ProductCard key={item.product.id} product={item.product}  onRemove={() => onRemove(item.product.id)}/>; // Truyền product vào ProductCard
                })
              ) : (
                <p className={styles.emptyMessage}>Danh sách yêu thích của bạn đang trống.</p>
              )}
            </div>
      </div>
    </div>
  );
};
AllWishListModal.propTypes = {
  onClose: propTypes.func,
  isOpen: propTypes.func,
  wishlist: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        product: propTypes.object.isRequired, // Đảm bảo mỗi phần tử có thuộc tính product
      })
    ).isRequired,
    onRemove: propTypes.func.isRequired,
}

export default AllWishListModal;
