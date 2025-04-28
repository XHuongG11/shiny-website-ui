import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './ReviewCard.module.css';
import { FaStar } from "react-icons/fa";
const ReviewCard = ({ product, quantity, price, discountPrice, onReviewChange }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;

  const starDescriptions = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];

  const handleStarClick = (star) => {
    setRating(star);
    onReviewChange(product.id, { rating: star, comment });
  };
  
  const handleCommentChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
        setComment(input);
        setCharCount(input.length);
        onReviewChange(product.id, { rating, comment: input });
    }
};

  return (
    <div className={styles.card}>
      {/* Phần trên: Hình ảnh và thông tin sản phẩm */}
      <div className={styles.productSection}>
        <img
          src={product.images && product.images.length > 0 ? product.images[0].url : '/image/placeholder.png'}
          className={styles.productImage}
          alt={product.title}
        />
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.title}</h3>
          <div className={styles.priceWrapper}>
            {discountPrice && discountPrice < price ? (
              <>
                <span className={styles.oldPrice}>{price.toLocaleString()} VNĐ</span>
                <span className={styles.currentPrice}>{discountPrice.toLocaleString()} VNĐ</span>
              </>
            ) : (
              <span className={styles.currentPrice}>{price.toLocaleString()} VNĐ</span>
            )}
          </div>
          <p className={styles.productOptions}>Số lượng: {quantity}</p>
        </div>
      </div>
      {/* Phần dưới: Đánh giá */}
      <div className={styles.reviewSection}>
        <div className={styles.ratingReview}>
        <div className={styles.starsWrapper}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`${styles.starBox} ${star <= rating ? styles.filledStar : styles.emptyStar}`}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>
          <p className={styles.starDescription}>{starDescriptions[rating - 1]}</p>
          <div className={styles.reviewHeader}>
            <p className={styles.titleReview}>Viết đánh giá</p>
            <p className={styles.charCount}>
                {charCount}/{maxChars} ký tự
            </p>
          </div>
          <textarea
            className={styles.reviewText}
            placeholder="Hãy chia sẻ đánh giá của bạn về sản phẩm"
            value={comment}
            onChange={handleCommentChange}
            rows={7}
          />
        </div>
      </div>
    </div>
  );
};

// Định nghĩa propTypes
ReviewCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  productSize: PropTypes.shape({
    size: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  onReviewChange: PropTypes.func.isRequired,
};

export default ReviewCard;