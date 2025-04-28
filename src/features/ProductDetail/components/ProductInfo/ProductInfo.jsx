import { useState, useEffect } from "react";
import styles from "./ProductInfo.module.css";
import PropTypes from "prop-types";
import userApi from "../../../../api/userApi";
import CartApi from "../../../../api/cartApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import silverMaterial from "/image/allproduct/material_silver.png";
import whiteGoldMaterial from "/image/allproduct/material_white_gold.png";
import gold10KMaterial from "/image/allproduct/material_gold10k.png";
import gold18KMaterial from "/image/allproduct/material_gold18k.png";
import gold24KMaterial from "/image/allproduct/material_gold24k.png";
import platinumKMaterial from "/image/allproduct/material_platinum.png";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
};
const materialImages = {
  "Bạc": silverMaterial,
  "Vàng trắng": whiteGoldMaterial,
  "Vàng 10K": gold10KMaterial,
  "Vàng 18K": gold18KMaterial,
  "Vàng 24K": gold24KMaterial,
  "Platinum": platinumKMaterial,
};

function ProductInfo({ product }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false); // State để kiểm tra sản phẩm có trong wishlist không
  const [selectedSize, setSelectedSize] = useState(null);

  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!(user && user.email); // Kiểm tra người dùng đã đăng nhập hay chưa
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
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size when clicked
  };
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate("/login");
      return;
    }
    
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    try {
      // Tìm productSizeId tương ứng với size đã chọn
      const selectedProductSize = product.productSizes.find(
        (sizeObj) => sizeObj.size === selectedSize
      );

      if (!selectedProductSize) {
        alert("Kích thước không hợp lệ.");
        return;
      }

      await CartApi.addItemToCart(selectedProductSize.id, 1); // 1 là số lượng
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.data || error.message);
      alert("Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau.");
    }
  };
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để mua hàng.");
      navigate("/login");
      return;
    }
  
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi mua.");
      return;
    }
  
    const selectedProductSize = product.productSizes.find(
      (sizeObj) => sizeObj.size === selectedSize
    );
  
    if (!selectedProductSize) {
      alert("Kích thước không hợp lệ.");
      return;
    }
  
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
  
    // Lưu vào localStorage
    localStorage.setItem("checkoutItems", JSON.stringify([tempOrder]));
  
    // Chuyển hướng
    navigate("/checkouts");
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
            {product.productSizes.map((sizeObj, index) => (
              <button
                key={index}
                onClick={() => handleSizeClick(sizeObj.size)}
                className={`${styles.sizeButton} ${selectedSize === sizeObj.size ? styles.selected : ""}`}
              >
                {sizeObj.size === "No size" ? "One size" : sizeObj.size}
              </button>
            ))}
          </div>

          <div className={styles.colorProduct}>
            <button>
              <img
                src={materialImages[product.material] || silverMaterial}
                alt={product.material}
              />
              <span>{product.material}</span>
            </button>
          </div>
          <label className={styles.stockQuantity}>Chỉ còn 1 sản phẩm</label>
          <button className={styles.btnAddToCart} onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          <button className={styles.btnBuyNow}onClick={handleBuyNow}>Mua ngay</button>
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
                content: product.description ? product.description.split(".").filter(line => line.trim() !== "")
                  : [],
              },
              {
                title: "Hướng dẫn chọn size",
                content: [
                  "Việc chọn size chính xác là yếu tố quan trọng giúp bạn cảm thấy thoải mái và tự tin khi đeo các sản phẩm trang sức như vòng tay, nhẫn hay các loại vòng cổ. Dưới đây là một số cách đơn giản giúp bạn lựa chọn size phù hợp:",
                  "1. Sử dụng thước dây mềm: Đo chu vi vị trí bạn muốn đeo sản phẩm (ví dụ, cổ tay, ngón tay, cổ) bằng một thước dây mềm. Hãy chắc chắn rằng thước dây không quá chật hoặc quá lỏng. Sau khi đo, bạn có thể đối chiếu với bảng size để xác định kích cỡ phù hợp.",
                  "2. Sử dụng sản phẩm có sẵn: Nếu bạn có một chiếc vòng tay, nhẫn hoặc sản phẩm tương tựu vừa vặn, bạn có thể đo đường kính hoặc chu vi của sản phẩm đó và đối chiếu với bảng size của chúng tôi để tìm kích cỡ tương ứng.",
                  "3. Thử trực tiếp sản phẩm: Nếu có thể, bạn nên đến cửa hàng để thử trực tiếp sản phẩm và cảm nhận sự phù hợp của sản phẩm trên cơ thể mình.",
                  "Lưu ý: Các vùng trên cơ thể có thể thay đổi kích thước trong ngày (ví dụ, cổ tay, ngón tay có thể to lên vào cuối ngày). Do đó, bạn nên chọn size khi cảm thấy thoải mái nhất.",
                  "Nếu bạn vẫn không chắc chắn về size của mình, chúng tôi luôn sẵn sàng hỗ trợ và tư vấn thêm cho bạn."
                ],
              },
              {
                title: "Hình thức vận chuyển",
                content: [
                  "Chúng tôi cung cấp dịch vụ vận chuyển miễn phí toàn quốc cho mọi đơn hàng, đảm bảo bạn nhận được sản phẩm trong thời gian từ 3 đến 5 ngày làm việc, tùy thuộc vào khu vực giao hàng.",
                  "Quá trình vận chuyển được thực hiện nhanh chóng và an toàn, với các đối tác vận chuyển uy tín để đảm bảo sản phẩm đến tay bạn trong tình trạng hoàn hảo nhất.",
                  "Nếu bạn cần gấp hoặc yêu cầu vận chuyển đặc biệt, chúng tôi cũng cung cấp các lựa chọn giao hàng nhanh với mức phí hợp lý. Để biết thêm chi tiết, vui lòng liên hệ với chúng tôi để được hỗ trợ."
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${styles.dropdown} ${openDropdown === index ? styles.active : ""
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
    description: PropTypes.string,
    material: PropTypes.string.isRequired,
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
