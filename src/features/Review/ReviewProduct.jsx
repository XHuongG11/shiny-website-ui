import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReviewProduct.module.css';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import ReviewCard from './components/ReviewCard';
import orderApi from '../../api/orderApi';
import reviewApi from '../../api/reviewApi'; // Import API gửi đánh giá

function ReviewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrder(id);
        console.log("Dữ liệu trả về từ API:", response.data);
        if (!response.data) {
          setError('Đơn hàng không tồn tại hoặc đã bị xóa.');
          setLoading(false);
          return;
        }
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleReviewChange = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: review,
    }));
  };

  const handleSubmitReviews = async () => {
    try {
      const reviewData = Object.entries(reviews).map(([productId, review]) => ({
        productId,
        rating: review.rating,
        content: review.comment?.trim() || "",
      }));
  
      // Gọi API: truyền orderId trên URL, dữ liệu đánh giá trong body
      await reviewApi.addReviews(id, reviewData);
  
      alert('Đánh giá đã được gửi thành công!');
      setReviews({});
      navigate('/thankyou-review');
    } catch (error) {
      console.error('Error submitting reviews:', error);
      setError(error.response?.data?.message || 'Gửi đánh giá thất bại!');
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng</div>;

  return (
    <div>
      <Breadcrumb currentPage="Đánh giá sản phẩm" />
      <div className={styles.reviewBox}>
        {order.reviewed ? ( // Sửa isReviewed thành reviewed
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
        {!order.reviewed && ( // Sửa isReviewed thành reviewed
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={handleSubmitReviews}
          >
            Gửi đánh giá
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewProduct;