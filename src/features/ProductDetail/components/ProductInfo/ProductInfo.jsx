import { useState, useEffect } from "react";
import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";
import CartApi from "../../../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import silverMaterial from "/image/allproduct/material_silver.png";
import whiteGoldMaterial from "/image/allproduct/material_white_gold.png";
import gold10KMaterial from "/image/allproduct/material_gold10k.png";
import gold18KMaterial from "/image/allproduct/material_gold18k.png";
import gold24KMaterial from "/image/allproduct/material_gold24k.png";
import platinumKMaterial from "/image/allproduct/material_platinum.png";

// CSS tùy chỉnh cho react-toastify
const toastStyles = `
  .Toastify__toast {
    font-size: 18px;
    padding: 20px 30px;
    min-height: 80px;
    min-width: 400px;
    border-radius: 8px;
  }
  .Toastify__toast-body {
    line-height: 1.5;
  }
  .Toastify__toast--success {
    background-color: #f0f9f4;
    color: #2d3436;
  }
  .Toastify__toast--error {
    background-color: #fef2f2;
    color: #2d3436;
  }
  .Toastify__toast--warning {
    background-color: #fff7ed;
    color: #2d3436;
  }
`;

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
  const [stockQuantity, setStockQuantity] = useState(0);
  const navigate = useNavigate();
  const isLoggedIn = !!useSelector((state) => state.user.current)?.email;

  useEffect(() => {
    if (product.productSizes.length > 0) {
      const totalStock = product.productSizes.reduce((acc, sizeObj) => acc + sizeObj.stock, 0);
      setStockQuantity(totalStock);
    }
  }, [product]);

  const handleToggleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để thêm vào danh sách yêu thích.", { autoClose: 2000 });
      return setTimeout(() => navigate("/login"), 2000);
    }
    if (!product?.id) return toast.error("Sản phẩm không hợp lệ.", { autoClose: 2000 });

    try {
      const action = isInWishlist ? "remove" : "add";
      await updateWishlist(product, action);
      toast.success(
        `Đã ${action === "add" ? "thêm" : "xóa"} sản phẩm ${action === "add" ? "vào" : "khỏi"} danh sách yêu thích!`,
        { autoClose: 2000 }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật wishlist:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!", { autoClose: 2000 });
    }
  };

  const handleAddToCart = async () => {

    if (!selectedSize) {
      toast.warn("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.", { autoClose: 2000 });
      return;
    }

    const sizeObj = product.productSizes.find((s) => s.size === selectedSize);
    if (!sizeObj) {
      toast.error("Kích thước không hợp lệ.", { autoClose: 2000 });
      return;
    }

    try {
      await CartApi.addItemToCart(sizeObj.id, 1);
      toast.success(
        <span style={{ fontWeight: "bold"}}>
          <p className={styles.tilteThem}>Thêm vào giỏ hàng thành công!</p>
          <p style={{ textShadow: "none" , marginTop: "5px", fontSize: "16px" }}>
            Ấn <a href="/cart" className={styles.thongbao}>vào đây</a> để tới trang giỏ hàng
          </p>
        </span>,
        { autoClose: 5000 }
      );
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error(error?.response?.data?.message || "Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau. ❌", { autoClose: 2000 });
    }
  };

  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để mua hàng.", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!selectedSize) {
      toast.warn("Vui lòng chọn kích thước trước khi mua.", { autoClose: 2000 });
      return;
    }

    const selectedProductSize = product.productSizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );

    if (!selectedProductSize) {
      toast.error("Kích thước không hợp lệ.", { autoClose: 2000 });
      return;
    }
    setLoading(true);

    try {
      await CartApi.removeItemFromCart(selectedProductSize.id);
      await CartApi.addItemToCart(selectedProductSize.id, 1);

      const tempOrder = {
        productId: product.id,
        title: product.title,
        image: product.images[0]?.url,
        material: product.material,
        size: selectedSize,
        price: selectedProductSize.discountPrice,
        quantity: 1,
        productSizeId: selectedProductSize.id,
        product: product,
        productSize: selectedProductSize,
      };

      localStorage.setItem("checkoutItems", JSON.stringify([tempOrder]));
      navigate("/checkouts");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau. ❌", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    const selectedSizeObj = product.productSizes.find((s) => s.size === size);
    if (selectedSizeObj) {
      setStockQuantity(selectedSizeObj.stock);
    }
  };

  return (
    <div className={styles.infoProduct}>
      <style>{toastStyles}</style>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                onClick={() => handleSelectSize(sizeObj.size)}
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
          <label className={styles.stockQuantity}>
            {stockQuantity === 0
              ? 'Hết hàng!!!'
              : stockQuantity < 5
              ? `Chỉ còn lại: ${stockQuantity} sản phẩm`
              : `Số lượng: ${stockQuantity} sản phẩm`}
          </label>

          {stockQuantity > 0 && (
            <>
              <button className={styles.btnAddToCart} onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className={styles.btnBuyNow} onClick={handleBuyNow}>
                Mua ngay
              </button>
            </>
          )}
          <button
            className={`${styles.favoriteBtn} ${isInWishlist ? styles.added : ""}`}
            onClick={handleToggleWishlist}
          >
            <span className={styles.icon}></span>
            {isInWishlist ? "Đã theo dõi sản phẩm" : "Theo dõi sản phẩm"}
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