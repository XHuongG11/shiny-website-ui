import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SimilarProducts.module.css";
import productApi from "../../../../api/productApi";
import ProductCard from "../../../../components/ProductCard/ProductCard";

function SimilarProducts({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0); // Chỉ số bắt đầu của các sản phẩm hiển thị

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!categoryId) return;
      try {
        const response = await productApi.getProductsByCategory(categoryId, 1, 12); // Lấy 6 sản phẩm
        const productsData = response?.data?.content || [];
        setProducts(productsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm tương tự:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [categoryId]);

  const handleNext = () => {
    // Chuyển sang 3 sản phẩm tiếp theo
    if (startIndex + 3 < products.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const handleBack = () => {
    // Quay lại 3 sản phẩm trước đó
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    }
  };

  if (loading) {
    return <p>Đang tải sản phẩm tương tự...</p>;
  }

  return (
    <div className={styles.similarProduct}>
      <label>SẢN PHẨM TƯƠNG TỰ</label>
      <div className={styles.navigationContainer}>
        <button
          className={styles.circleButton}
          onClick={handleBack}
          disabled={startIndex === 0} // Vô hiệu hóa nút "Back" nếu ở đầu danh sách
        >
          <img src="/image/productdetail/ic_leftt.png" alt="back" />
        </button>

        <div className={styles.containerProduct}>
          {products.slice(startIndex, startIndex + 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={false} // Có thể thay đổi nếu cần
              updateWishlist={() => {}} // Hàm trống, có thể thay đổi nếu cần
            />
          ))}
        </div>

        <button
          className={styles.circleButton}
          onClick={handleNext}
          disabled={startIndex + 3 >= products.length} // Vô hiệu hóa nút "Next" nếu ở cuối danh sách
        >
          <img src="/image/productdetail/ic_right.png" alt="next" />
        </button>
      </div>
    </div>
  );
}

SimilarProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default SimilarProducts;