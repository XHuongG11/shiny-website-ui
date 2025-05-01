import { useState } from "react";
import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";
import CartApi from "../../../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../../../../components/Alert";
import silverMaterial from "/image/allproduct/material_silver.png";
import whiteGoldMaterial from "/image/allproduct/material_white_gold.png";
import gold10KMaterial from "/image/allproduct/material_gold10k.png";
import gold18KMaterial from "/image/allproduct/material_gold18k.png";
import gold24KMaterial from "/image/allproduct/material_gold24k.png";
import platinumKMaterial from "/image/allproduct/material_platinum.png";

const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "₫";

const materialImages = {
  "Bạc": silverMaterial,
  "Vàng trắng": whiteGoldMaterial,
  "Vàng 10K": gold10KMaterial,
  "Vàng 18K": gold18KMaterial,
  "Vàng 24K": gold24KMaterial,
  "Platinum": platinumKMaterial,
};

const dropdownData = [
  {
    title: "Chi tiết",
    content: (desc) => (desc ? desc.split(".").filter(line => line.trim()) : []),
  },
  {
    title: "Hướng dẫn chọn size",
    content: () => [
      "Chọn size chính xác giúp thoải mái khi đeo trang sức:",
      "1. Dùng thước dây đo chu vi, đối chiếu bảng size.",
      "2. Đo sản phẩm vừa vặn có sẵn và so sánh.",
      "3. Thử trực tiếp tại cửa hàng nếu có thể.",
      "Lưu ý: Size cơ thể có thể thay đổi, chọn khi thoải mái nhất.",
      "Liên hệ để được tư vấn thêm.",
    ],
  },
  {
    title: "Hình thức vận chuyển",
    content: () => [
      "Miễn phí vận chuyển toàn quốc, giao 3-5 ngày.",
      "Vận chuyển an toàn với đối tác uy tín.",
      "Giao hàng nhanh với phí hợp lý, liên hệ để biết thêm.",
    ],
  },
];

function ProductInfo({ product, isInWishlist, updateWishlist }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();
  const isLoggedIn = !!useSelector((state) => state.user.current)?.email;

  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      setNotification({ open: true, message: "Vui lòng đăng nhập để thêm vào danh sách yêu thích.", severity: "error" });
      return setTimeout(() => navigate("/login"), 2000);
    }
    if (!product?.id) return setNotification({ open: true, message: "Sản phẩm không hợp lệ.", severity: "error" });

    try {
      const action = isInWishlist ? "remove" : "add";
      await updateWishlist(product, action);
      setNotification({
        open: true,
        message: `Đã ${action === "add" ? "thêm" : "xóa"} sản phẩm ${action === "add" ? "vào" : "khỏi"} danh sách yêu thích!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật wishlist:", error);
      setNotification({ open: true, message: "Có lỗi xảy ra. Vui lòng thử lại!", severity: "error" });
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return navigate("/login");
    }
    if (!selectedSize) return alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");

    const sizeObj = product.productSizes.find((s) => s.size === selectedSize);
    if (!sizeObj) return alert("Kích thước không hợp lệ.");

    try {
      await CartApi.addItemToCart(sizeObj.id, 1);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau.");
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để mua hàng.");
      return navigate("/login");
    }
    if (!selectedSize) return alert("Vui lòng chọn kích thước trước khi mua.");

    const sizeObj = product.productSizes.find((s) => s.size === selectedSize);
    if (!sizeObj) return alert("Kích thước không hợp lệ.");

    const tempOrder = {
      productId: product.id,
      title: product.title,
      image: product.images[0]?.url,
      material: product.material,
      size: selectedSize,
      price: sizeObj.discountPrice,
      quantity: 1,
      productSizeId: sizeObj.id,
      product,
      productSize: sizeObj,
    };

    localStorage.setItem("checkoutItems", JSON.stringify([tempOrder]));
    navigate("/checkouts");
  };

  return (
    <div className={styles.infoProduct}>
      {notification.open && (
        <Notification
          severity={notification.severity}
          message={notification.message}
          open={notification.open}
          setOpen={() => setNotification({ ...notification, open: false })}
          variant="filled"
        />
      )}
      <div className={styles.infoProductImage}>
        <img className={styles.productImageMain} src={product.images[0]?.url} alt="Ảnh sản phẩm" />
      </div>
      <div className={styles.infoProductContentContainer}>
        <div className={styles.infoProductContent}>
          <label className={styles.nameProduct}>{product.title}</label>
          <div className={styles.price}>
            <label className={styles.priceCurrent}>{formatPrice(product.productSizes[0].discountPrice)}</label>
            {product.productSizes[0].discountPrice !== product.productSizes[0].price && (
              <label className={styles.basePrice}>{formatPrice(product.productSizes[0].price)}</label>
            )}
          </div>
          <label>Chọn kích thước: </label>
          <div className={styles.sizeProduct}>
            {product.productSizes.map((sizeObj, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(sizeObj.size)}
                className={`${styles.sizeButton} ${selectedSize === sizeObj.size ? styles.selected : ""}`}
              >
                {sizeObj.size === "No size" ? "One size" : sizeObj.size}
              </button>
            ))}
          </div>
          <div className={styles.colorProduct}>
            <button>
              <img src={materialImages[product.material] || silverMaterial} alt={product.material} />
              <span>{product.material}</span>
            </button>
          </div>
          <label className={styles.stockQuantity}>Chỉ còn 1 sản phẩm</label>
          <button className={styles.btnAddToCart} onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          <button className={styles.btnBuyNow} onClick={handleBuyNow}>Mua ngay</button>
          <button
            className={`${styles.favoriteBtn} ${isInWishlist ? styles.added : ""}`}
            onClick={handleToggleWishlist}
          >
            <span className={styles.icon}></span>
            {isInWishlist ? "Đã thêm vào danh mục yêu thích" : "Lưu vào danh mục theo dõi"}
          </button>
          <div className={styles.dropdownContainer}>
            {dropdownData.map(({ title, content }, i) => (
              <div key={i} className={`${styles.dropdown} ${openDropdown === i ? styles.active : ""}`}>
                <button className={styles.dropdownBtn} onClick={() => setOpenDropdown(openDropdown === i ? null : i)}>
                  <img
                    src={openDropdown === i ? "/image/productdetail/ic_down.png" : "/image/productdetail/ic_right.png"}
                    alt="Icon"
                  />
                  {title}
                </button>
                <div
                  className={styles.dropdownContent}
                  style={{ maxHeight: openDropdown === i ? "500px" : "0", overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}
                >
                  {content(product.description).map((text, j) => (
                    <li key={j}>{text}</li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    material: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string.isRequired })).isRequired,
    productSizes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        size: PropTypes.string.isRequired,
        discountPrice: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isInWishlist: PropTypes.bool.isRequired,
  updateWishlist: PropTypes.func.isRequired,
};

export default ProductInfo;