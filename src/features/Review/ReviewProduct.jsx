import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReviewProduct.module.css';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import ReviewCard from './components/ReviewCard';
import orderApi from '../../api/orderApi';
import reviewApi from '../../api/reviewApi';
import Notification from '../../components/Alert';

function ReviewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({});
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrder(id);
        console.log('Dữ liệu trả về từ API:', response.data);
        if (!response.data) {
          setError('Đơn hàng không tồn tại hoặc đã bị xóa.');
          setLoading(false);
          return;
        }
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Lỗi khi tải đơn hàng.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleReviewChange = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: review,
    }));
  };

  const handleSubmitReviews = async () => {
    try {
      // Nếu không có đánh giá nào, tạo một đánh giá mặc định cho mỗi sản phẩm
      const reviewData = order.orderItems.map((item) => {
        const productId = item.product.id;
        const review = reviews[productId] || {};
        return {
          productId,
          rating: review.rating || 5, // Mặc định rating là 0 nếu không có
          content: review.comment?.trim() || null, // Lưu null nếu không có nội dung
        };
      });

      await reviewApi.addReviews(id, reviewData);

      setNotification({
        open: true,
        message: 'Đánh giá đã được gửi thành công!',
        severity: 'success',
      });
      setReviews({});
      setTimeout(() => navigate('/thankyou-review'), 2000);
    } catch (error) {
      console.error('Error submitting reviews:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Gửi đánh giá thất bại!';
      setNotification({
        open: true,
        message: `Đã xảy ra lỗi: ${errorMessage}`,
        severity: 'error',
      });
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng</div>;

  return (
    <div>
      {notification.open && (
        <Notification
          severity={notification.severity}
          message={notification.message}
          open={notification.open}
          setOpen={() => setNotification({ ...notification, open: false })}
          variant="filled"
        />
      )}
      <Breadcrumb currentPage="Đánh giá sản phẩm" />
      <div className={styles.reviewBox}>
        {order.reviewed ? (
          <div>Đơn hàng này đã được đánh giá</div>
        ) : order.orderItems && order.orderItems.length > 0 ? (
          order.orderItems.map((item) => (
            <ReviewCard
              key={item.id}
              product={item.product}
              quantity={item.quantity}
              price={item.price}
              discountPrice={item.discountPrice}
              onReviewChange={handleReviewChange}
            />
          ))
        ) : (
          <div>Không có sản phẩm để đánh giá</div>
        )}
        {!order.reviewed && (
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitBtn}
              onClick={handleSubmitReviews}
            >
              Gửi đánh giá
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewProduct;