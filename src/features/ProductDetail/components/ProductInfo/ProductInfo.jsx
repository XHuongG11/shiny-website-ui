import { useState, useEffect  } from "react";
import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";
import userApi from "../../../../api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
};

function ProductInfo({product}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false); // State để kiểm tra sản phẩm có trong wishlist không

  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !user; // Kiểm tra người dùng đã đăng nhập hay chưa
  const navigate = useNavigate(); // Hook để điều hướng
  // Lấy danh sách wishlist từ API nếu người dùng đã đăng nhập
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Người dùng chưa đăng nhập, không tải danh sách wishlist.");
      return;
    }

    if (!product || !product.id) {
      console.error("Product không hợp lệ hoặc không có id.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await userApi.getWishList({ params: { page: 1, size: 100 } });
        console.log("Danh sách wishlist: ", response.data.content);
        const exists = response.data.content.some((item) => item.product.id === product.id);
        setIsInWishlist(exists);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách wishlist:", error);
      }
    };

    fetchWishlist();
  }, [product, isLoggedIn]); // Chỉ gọi API khi người dùng đã đăng nhập và product có id hợp lệ

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích.");
      navigate("/login");
      return; // Ngăn chặn logic tiếp theo nếu chưa đăng nhập
    }
  
    if (isInWishlist) {
      // Nếu sản phẩm đã có trong danh sách yêu thích, xóa nó
      userApi
        .removeWishList(product.id)
        .then(() => {
          console.log("Xóa thành công sản phẩm khỏi danh sách yêu thích");
          alert("Sản phẩm đã được xóa khỏi danh mục yêu thích!");
          setIsInWishlist(false); // Cập nhật trạng thái
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm khỏi danh mục yêu thích:", error.response?.data || error.message);
        });
    } else {
      // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó
      const request = { product: product };
      userApi
        .addWishList(request)
        .then(() => {
          console.log("Thêm thành công sản phẩm vào danh sách yêu thích");
          alert("Sản phẩm đã được thêm vào danh mục yêu thích!");
          setIsInWishlist(true); // Cập nhật trạng thái
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sản phẩm vào danh mục yêu thích:", error.response?.data || error.message);
        });
    }
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
          <button className={`${styles.favoriteBtn} ${isInWishlist ? styles.added : ""}`} onClick={handleToggleWishlist}>
            <span className={styles.icon}>
            </span>
            {isInWishlist ? "Đã thêm vào danh mục yêu thích" : "Lưu vào danh mục theo dõi"}
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
    id: PropTypes.number.isRequired,
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
