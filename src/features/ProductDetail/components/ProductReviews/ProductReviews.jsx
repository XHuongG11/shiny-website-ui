import{ useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import styles from "./ProductReviews.module.css";
import reviewApi from "../../../../api/reviewApi";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!productId) {
          throw new Error("Product ID is required");
        }
        const response = await reviewApi.getReviewsByProduct(productId);
        setReviews(response.data.content || []);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error);
        setError("Không thể tải đánh giá. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaStar className={styles.loadingIcon} />
        <p>Đang tải đánh giá...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className={styles.reviewSection}>
      <h2 className={styles.reviewTitle}>
        <FaStar className={styles.starIcon} />
        Đánh giá sản phẩm
      </h2>
      {reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review, index) => (
            <article key={index} className={styles.reviewItem}>
              <header className={styles.reviewHeader}>
                <span className={styles.reviewerName}>
                  {review.reviewer?.fullName || "Người dùng ẩn danh"}
                </span>
                <div className={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={star <= review.rating ? styles.filledStar : styles.emptyStar}
                    />
                  ))}
                </div>
              </header>
              <p className={styles.reviewContent}>
                {review.content || "Không có nội dung đánh giá."}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.noReviews}>Chưa có đánh giá nào cho sản phẩm này.</p>
      )}
    </section>
  );
};

ProductReviews.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductReviews;