import { useLocation, useNavigate } from "react-router-dom";
import styles from './OrderDetail.module.css';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  console.log("🐣 Order nhận được từ location.state:", order);
  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>;
  }
  const getOrderStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Đang xử lý đơn hàng";
      case "CONFIRMED":
        return "Đơn hàng đã được xác nhận";
      case "SHIPPING":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELLED":
        return "Đơn hàng đã bị hủy";
      case "RETURNED":
        return "Đơn hàng đã trả lại";
      case "COMPLETED":
        return "Đơn hàng đã hoàn thành";
      default:
        return status; // fallback nếu không khớp
    }
  };
  return (
    <div className={styles.orderDetailPage}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> &gt; 
        <Link to="/myorder/">My Order</Link> 
      </div>
      <div className={styles.orderDetail}>
        <h2 className={styles.title}>CHI TIẾT ĐƠN HÀNG</h2>

        <div className={styles.statusAndAddress}>
          <div className={styles.status}>
            {getOrderStatusText(order.status)}
          </div>
          <div className={styles.address}>
            <div><strong>{order.shippingAddress.recipientName}</strong> ({order.shippingAddress.recipientPhone})</div>
            <div>
              {order.shippingAddress.address}, {order.shippingAddress.village}, {order.shippingAddress.district}, {order.shippingAddress.province}
            </div>
          </div>
        </div>

        <div className={styles.productList}>
          {order.orderItems.map((item, index) => (
            <div key={index} className={styles.productItem}>
              <img
                src={item.product?.images?.[0]?.url || "/earring-placeholder.png"}
                alt={item.product?.title || "Sản phẩm"}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <div className={styles.productName}>{item.product?.title}</div>
                <div className={styles.productQuantity}>x{item.quantity}</div>
              </div>
              <div className={styles.productPrice}>
                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
              </div>
            </div>
          ))}
          <div className={styles.productActions}>
                {order.status === "DELIVERED" && (
<<<<<<< Updated upstream
                  <div>
                    <button className={styles.actionButton} onClick={() => navigate(`/return/${order.id}`)}>Hoàn trả đơn hàng</button>
                  </div>
                )}
                {order.status === "COMPLETED" && (
                  <div>
                    {order.reviewed === true ? (
                      <button className={styles.reviewButton}>Đã đánh giá</button>
                    ) : (
                      <button
                        className={styles.reviewButton}
                        onClick={() => navigate(`/review/${order.id}`)}
                      >
                        Đánh giá
                      </button>
                    )}
=======
                  <div>
                    <button className={styles.actionButton}>Hoàn trả đơn hàng</button>
                  </div>
                )}
                {order.status === "COMPLETED" && (
                  <div>
                    <button className={styles.reviewButton}>Đánh giá</button>
>>>>>>> Stashed changes
                  </div>
                )}
              </div>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.overview}>
            <h3>Tổng quan đơn hàng</h3>
            <div className={styles.overviewRow}>
              <span>Tổng sản phẩm</span><span>{order.totalProductPrice?.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className={styles.overviewRow}>
              <span>Phí vận chuyển</span><span>{order.shippingFee?.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className={styles.overviewRow}>
              <span>Giảm giá</span><span>{order.promotionDiscount?.toLocaleString('vi-VN') || "0"}đ</span>
            </div>
            <div className={styles.overviewRow}>
              <strong>Tổng cộng</strong><strong>{order.totalPrice?.toLocaleString('vi-VN')}đ</strong>
            </div>
          </div>

          <div className={styles.detail}>
            <h3>Chi tiết đơn hàng</h3>
            <div className={styles.detailRow}>
              <span>Số đơn hàng</span><span>{order.id}</span>
            </div>
            <div className={styles.detailRow}>
            <span>Ngày đặt hàng</span>
              <span>{new Date(order.orderDate).toLocaleString('vi-VN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true 
              })}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Phương thức thanh toán</span><span>{order.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.continueShopping}>
      <Link to="/products/">Tiếp tục mua hàng</Link> &gt;
      </div>
    </div>
  );
};

export default OrderDetail;
