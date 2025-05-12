import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./ProductReviews.module.css";
import reviewApi from "../../../../api/reviewApi";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingBreakdown, setRatingBreakdown] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [openResponses, setOpenResponses] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!productId) {
          throw new Error("Product ID is required");
        }
        const response = await reviewApi.getReviewsByProduct(productId);
        const fetchedReviews = response.data.content || [];
        console.log("Fetched Reviews:", fetchedReviews);
        setReviews(fetchedReviews);

        // Calculate average rating
        const totalRatings = fetchedReviews.length;
        const sumRatings = fetchedReviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(1) : 0;
        setAverageRating(avgRating);

        // Calculate rating breakdown
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        fetchedReviews.forEach((review) => {
          breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
        });
        setRatingBreakdown(breakdown);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đánh giá:", error);
        setError("Không thể tải đánh giá. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const toggleResponse = (index) => {
    console.log(`Toggling response for index ${index}, current state:`, openResponses[index]);
    setOpenResponses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
      <h2 className={styles.reviewTitle}>Đánh giá & Nhận xét</h2>
      {reviews.length > 0 ? (
        <>
          <div className={styles.ratingSummary}>
            <div className={styles.averageRating}>
              <span className={styles.ratingNumber}>
                <FaStar className={styles.fullStar} />
                {averageRating}
              </span>
              <span className={styles.reviewCount}>{reviews.length} đánh giá</span>
            </div>
            <div className={styles.ratingBreakdown}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className={styles.breakdownRow}>
                  {[...Array(star)].map((_, index) => (
                    <FaStar key={index} className={styles.breakdownStar} />
                  ))}
                  {[...Array(5 - star)].map((_, index) => (
                    <FaStar
                      key={index + star}
                      className={styles.breakdownEmptyStar}
                    />
                  ))}
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${
                          reviews.length > 0
                            ? (ratingBreakdown[star] / reviews.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className={styles.ratingBreakdown}>{ratingBreakdown[star]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.reviewsList}>
            {reviews.map((review, index) => (
              <article key={index} className={styles.reviewItem}>
                <header className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>
                    {review.reviewer?.fullName || "Người dùng ẩn danh"}
                  </span>
                  <p className={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                </header>
                <div className={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.rating
                          ? styles.filledStar
                          : styles.emptyStar
                      }
                    />
                  ))}
                </div>
                <p className={styles.reviewContent}>
                  {review.content || "Không có nội dung đánh giá."}
                </p>
                {/* Hiển thị phản hồi nếu có */}
                {review.response && review.response.content && (
                  <div className={styles.reviewResponse}>
                    <header className={styles.responseHeader}>
                      <span className={styles.responseBy}>
                        Phản hồi từ Người bán
                      </span>
                      <div className={styles.responseToggle}>
                        <p className={styles.responseDate}>
                          {new Date(review.response.createdAt).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <button
                          onClick={() => toggleResponse(index)}
                          className={styles.toggleButton}
                          aria-label={openResponses[index] ? "Ẩn phản hồi" : "Hiện phản hồi"}
                        >
                          {openResponses[index] ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>
                    </header>
                    {openResponses[index] && (
                      <p className={`${styles.responseContent} ${openResponses[index] ? styles.show : ''}`}>
                        {review.response.content}
                      </p>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.ratingSummary}>
            <div className={styles.averageRating}>
              <span className={styles.ratingNumber}>
                <FaStar className={styles.fullStar} />
                0.0
              </span>
              <span className={styles.reviewCount}>0 đánh giá</span>
            </div>
            <div className={styles.ratingBreakdown}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className={styles.breakdownRow}>
                  {[...Array(star)].map((_, index) => (
                    <FaStar key={index} className={styles.breakdownStar} />
                  ))}
                  {[...Array(5 - star)].map((_, index) => (
                    <FaStar
                      key={index + star}
                      className={styles.breakdownEmptyStar}
                    />
                  ))}
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: '0%',
                      }}
                    />
                  </div>
                  <span className={styles.ratingBreakdown}>{ratingBreakdown[star]}</span>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.noReviews}>Chưa có đánh giá nào cho sản phẩm này.</p>
        </>
      )}
    </section>
  );
};

ProductReviews.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductReviews;