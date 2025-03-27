import { useState } from "react";
import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
};

function ProductInfo({product}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className={styles.infoProduct}>
      <div className={styles.infoProductImage}>
        <img
          className={styles.productImageMain}
          src={product.images[0]?.url}
          alt="Ảnh sản phẩm"
        />
      </div>
      <div className={styles.infoProductContentContainer}>
        <div className={styles.infoProductContent}>
          <label className={styles.nameProduct}>{product.title}</label>
          <div className={styles.price}>
          <label className={styles.priceCurrent}>{formatPrice(product.productSizes[0].discountPrice)}</label>
          {product.productSizes[0].discountPrice !== product.productSizes[0].price && (
          <label className={styles.basePrice}>{formatPrice(product.productSizes[0].price)}</label>)}
          </div>
          <label>Chọn kích thước: </label>
          <div className={styles.sizeProduct}>
            <button>5.9 in</button>
            <button>6.3 in</button>
            <button>7.1 in</button>
            <button>7.5 in</button>
            <button>8.5 in</button>
          </div>
          <div className={styles.colorProduct}>
            <button>
              <img src="/image/productdetail/colorGoldProduct.png" alt="Vàng gold" />
              <span>Vàng gold</span>
            </button>
            <button>
              <img src="/image/productdetail/colorSilverProduct.png" alt="Bạc" />
              <span>Bạc</span>
            </button>
            <button>
              <img src="/image/productdetail/colorGoldRoseProduct.png" alt="Vàng hồng" />
              <span>Vàng hồng</span>
            </button>
          </div>
          <label className={styles.stockQuantity}>Chỉ còn 1 sản phẩm</label>
          <button className={styles.btnAddToCart}>Thêm vào giỏ hàng</button>
          <button className={styles.btnBuyNow}>Mua ngay</button>
          <button className={styles.favoriteBtn}>
            <img src="/image/productdetail/ic-heart.png" alt="Yêu thích" />
            Thêm vào yêu thích
          </button>

          {/* Dropdown Section */}
          <div className={styles.dropdownContainer}>
            {[
              {
                title: "Chi tiết",
                content: [
                  "Kim cương nhân tạo 0.80ct hình trái tim, gần như không màu hoặc tốt hơn (DEF), độ tinh khiết rất ít tạp chất hoặc tốt hơn (VS+).",
                  "Vàng trắng tái chế 18K, trọng lượng 6.7g (một cặp).",
                  "Độ rộng nhẫn: từ 9mm đến 3mm.",
                ],
              },
              {
                title: "Hướng dẫn chọn size",
                content: ["Hướng dẫn chọn size nhẫn phù hợp với tay bạn."],
              },
              {
                title: "Hình thức vận chuyển",
                content: ["Miễn phí vận chuyển toàn quốc trong 3-5 ngày."],
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${styles.dropdown} ${
                  openDropdown === index ? styles.active : ""
                }`}
              >
                <button
                  className={styles.dropdownBtn}
                  onClick={() => toggleDropdown(index)}
                >
                  <img
                    src={
                      openDropdown === index
                        ? "/image/productdetail/ic_down.png"
                        : "/image/productdetail/ic_right.png"
                    }
                    alt="Icon xuống"
                  />
                  {item.title}
                </button>
                <div
                  className={styles.dropdownContent}
                  style={{
                    maxHeight: openDropdown === index ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out",
                  }}
                >
                  {item.content.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* End Dropdown Section */}
        </div>
      </div>
    </div>
  );
}
ProductInfo.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    productSizes: PropTypes.arrayOf(
      PropTypes.shape({
        discountPrice: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default ProductInfo;
