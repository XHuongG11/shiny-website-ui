import { MdProductionQuantityLimits } from "react-icons/md";
import styles from './WishList.module.css';
import ProductCard from "./components/ProductCard";
import { useState } from "react";
import AllWishListModal from "./components/AllWishListModal";
import propTypes from "prop-types";

const WishList = ({ wishlist , onRemove }) => { // Destructure prop wishlist từ props
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2><MdProductionQuantityLimits className="icon" /> SẢN PHẨM THEO DÕI</h2>
        <button className={styles.viewallBtn} onClick={() => setIsModalOpen(true)}>Xem tất cả</button>
        <AllWishListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} wishlist={wishlist} onRemove={onRemove}/>
      </div>
      
      <div className={styles.cardBody}>
        {wishlist.length > 0 ? (
          wishlist.slice(0, 2).map((item) => { // Hiển thị tối đa 2 sản phẩm
            return <ProductCard key={item.product.id} product={item.product} onRemove={() => onRemove(item.product.id)} />; // Truyền product vào ProductCard
          })
        ) : (
          <p className={styles.emptyMessage}>Danh sách yêu thích của bạn đang trống.</p>
        )}
      </div>
    </div>
  );
};

WishList.propTypes = {
  wishlist: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      product: propTypes.object.isRequired, // Đảm bảo mỗi phần tử có thuộc tính product
    })
  ).isRequired,
  onRemove: propTypes.func.isRequired,
};

export default WishList;