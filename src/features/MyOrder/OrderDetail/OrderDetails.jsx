import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./OrderDetail.module.css";
import orderApi from "../../../api/orderApi";

const OrderDetail = () => {
  const { id } = useParams(); // Changed from orderId to id to match route :id
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // State for order data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch order details when component mounts
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOrder(id);
        console.log("🐣 Order nhận được từ API:", res);
        setOrder(res.data); // Assuming API returns order data in res.data
        setError(null);
      } catch (err) {
        console.error("❌ Lỗi lấy chi tiết đơn hàng:", err);
        setError("Không thể tải chi tiết đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError("Không tìm thấy ID đơn hàng.");
      setLoading(false);
    }
  }, [id]);

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
        return status; // Fallback if status doesn't match
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "PROCESSING":
        return "Đang xử lý thanh toán";
      case "PAID":
        return "Đã thanh toán";
      case "REFUNDED":
        return "Đã hoàn tiền";
      default:
        return "Không xác định";
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className={styles.orderDetailPage}>
        <div>Đang tải...</div>
      </div>
    );
  }

  // Render error state
  if (error || !order) {
    return (
      <div className={styles.orderDetailPage}>
        <div>{error || "Không tìm thấy đơn hàng"}</div>
        <Link to="/myorder/" className={styles.backLink}>
          Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

  // Render order details
  return (
    <div className={styles.orderDetailPage}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> <Link to="/myorder/">My Order</Link>
      </div>
      <div className={styles.orderDetail}>
        <h2 className={styles.title}>CHI TIẾT ĐƠN HÀNG</h2>

        <div className={styles.statusAndAddress}>
          <div className={styles.status}>
            {getOrderStatusText(order.status)}
          </div>
          <div className={styles.address}>
            <div>
              <strong>{order.shippingAddress.recipientName}</strong> (
              {order.shippingAddress.recipientPhone})
            </div>
            <div>
              {order.shippingAddress.address}, {order.shippingAddress.village},{" "}
              {order.shippingAddress.district}, {order.shippingAddress.province}
            </div>
          </div>
        </div>

        <div className={styles.productList}>
          {order.orderItems.map((item, index) => (
            <div key={index} className={styles.productItem}>
              <img
                src={
                  item.product?.images?.[0]?.url || "/earring-placeholder.png"
                }
                alt={item.product?.title || "Sản phẩm"}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <div className={styles.productName}>{item.product?.title}</div>
                <div className={styles.productQuantity}>x{item.quantity}</div>
              </div>
              <div className={styles.productPrice}>
                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
              </div>
            </div>
          ))}
          <div className={styles.productActions}>
            {order.status === "DELIVERED" && (
              <button
                className={styles.actionButton}
                onClick={() => navigate(`/return/${order.id}`)}
              >
                Hoàn trả đơn hàng
              </button>
            )}
            {order.status === "COMPLETED" && (
              <div>
                {order.reviewed ? (
                  <button className={styles.reviewButton} disabled>
                    Đã đánh giá
                  </button>
                ) : (
                  <button
                    className={styles.reviewButton}
                    onClick={() => navigate(`/review/${order.id}`)}
                  >
                    Đánh giá
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.overview}>
            <h3>Tổng quan đơn hàng</h3>
            <div className={styles.overviewRow}>
              <span>Tổng sản phẩm</span>
              <span>{order.totalProductPrice?.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className={styles.overviewRow}>
              <span>Phí vận chuyển</span>
              <span>{order.shippingFee?.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className={styles.overviewRow}>
              <span>Giảm giá</span>
              <span>
                {order.promotionDiscount?.toLocaleString("vi-VN") || "0"}đ
              </span>
            </div>
            <div className={styles.overviewRow}>
              <strong>Tổng cộng</strong>
              <strong>{order.totalPrice?.toLocaleString("vi-VN")}đ</strong>
            </div>
          </div>

          <div className={styles.detail}>
            <h3>Chi tiết đơn hàng</h3>
            <div className={styles.detailRow}>
              <span>Số đơn hàng</span>
              <span>{order.id}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Ngày đặt hàng</span>
              <span>
                {new Date(order.orderDate).toLocaleString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span>Phương thức thanh toán</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Trạng thái thanh toán</span>
              <span>{getPaymentStatusText(order.payment?.status || 'PROCESSING')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.continueShopping}>
        <Link to="/products/">Tiếp tục mua hàng</Link>
      </div>
    </div>
  );
};

export default OrderDetail;
