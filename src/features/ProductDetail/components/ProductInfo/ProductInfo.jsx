import styles from './ProductInfo.module.css';
import './script.js';

function ProductInfo() {
    return (
      <div className={styles.infoProduct}>
        <div className={styles.infoProductImage}>
          <img className={styles.productImageMain} src="/image/productdetail/product1.png" alt="Ảnh sản phẩm" />
        </div>
        <div className={styles.infoProductContentContainer}>
          <div className={styles.infoProductContent}>
            <label className={styles.nameProduct}>LOEV Diamond Band</label>
            <div className={styles.price}>
              <label className={styles.priceCurrent}>200.540.000₫</label>
              <label className={styles.basePrice}>224.554.000₫</label>
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
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdown}>
                <button className={styles.dropdownBtn}>
                  <img src="/image/productdetail/ic_right.png" alt="Icon xuống" />
                  Chi tiết
                </button>
                <div className={styles.dropdownContent}>
                  <li>Kim cương nhân tạo 0.80ct hình trái tim, gần như không màu hoặc tốt hơn (DEF), độ tinh khiết rất ít tạp chất hoặc tốt hơn (VS+).</li>
                  <li>Vàng trắng tái chế 18K, trọng lượng 6.7g (một cặp).</li>
                  <li>Độ rộng nhẫn: từ 9mm đến 3mm.</li>
                </div>
              </div>
              <div className={styles.dropdown}>
                <button className={styles.dropdownBtn}>
                  <img src="/image/productdetail/ic_right.png" alt="Icon xuống" />
                  Hướng dẫn chọn size
                </button>
                <div className={styles.dropdownContent}>
                  <li>Hướng dẫn chọn size nhẫn phù hợp với tay bạn.</li>
                </div>
              </div>
              <div className={styles.dropdown}>
                <button className={styles.dropdownBtn}>
                  <img src="/image/productdetail/ic_right.png" alt="Icon xuống" />
                  Hình thức vận chuyển
                </button>
                <div className={styles.dropdownContent}>
                  <li>Miễn phí vận chuyển toàn quốc trong 3-5 ngày.</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductInfo;