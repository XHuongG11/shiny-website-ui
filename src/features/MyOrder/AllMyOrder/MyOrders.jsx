import { useEffect, useRef, useState } from "react";
import styles from './MyOrder.module.css';
import orderApi from '../../../api/orderApi';
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [allOrders, setAllOrders] = useState([]); // Dữ liệu tất cả đơn hàng
  const [filteredOrders, setFilteredOrders] = useState([]); // Dữ liệu đã lọc theo tab
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);
  const tabList = ["ALL", "PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"];
  const navigate = useNavigate();

  // Fetch tất cả các đơn hàng một lần khi component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getMyOrders();
        console.log("📦 Dữ liệu đơn hàng nhận được từ API:", res);
        setAllOrders(res.data.content); // Lưu tất cả đơn hàng vào state
      } catch (err) {
        console.error("❌ Lỗi lấy danh sách đơn hàng:", err);
      }
    };

    fetchOrders();
  }, []);
  // Lọc đơn hàng theo trạng thái của tab khi activeTab thay đổi
  useEffect(() => {
    const currentTabStatus = tabList[activeTab];
    let filteredData = [...allOrders]; // Sao chép tất cả đơn hàng

    // Nếu không phải tab "ALL", lọc theo trạng thái
    if (currentTabStatus !== "ALL") {
      filteredData = filteredData.filter(order => order.status === currentTabStatus);
    }

    setFilteredOrders(filteredData); // Cập nhật danh sách đơn hàng đã lọc
  }, [activeTab, allOrders]); // Chạy lại mỗi khi activeTab hoặc allOrders thay đổi

  // Cập nhật thanh underline khi tab thay đổi
  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeTab]);
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      setAllOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(`❌ Lỗi cập nhật trạng thái đơn hàng:`, err);
    }
  };
    return (
    <>
      <p className={styles.breadcrumb}>Home &gt; My Order</p>
      <div className={styles.container}>
        <h2 className={styles.title}>ĐƠN HÀNG CỦA TÔI ({filteredOrders.length} ĐƠN HÀNG)</h2>
        <div className={styles.tabs}>
          {tabList.map((tab, i) => (
            <div
              key={i}
              className={`${styles.tab} ${i === activeTab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(i)}
              ref={(el) => (tabRefs.current[i] = el)}
            >
              {tab}
            </div>
          ))}
          <div
            className={styles.underline}
            style={{ width: underlineStyle.width, left: underlineStyle.left }}
          />
          <button className={styles.cartButton}>Giỏ hàng của tôi</button>
        </div>

        {filteredOrders.map((order, index) => (
          <div key={index} className={styles.orderBox}>
            {order.orderItems.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.item}>
                <img
                  className={styles.itemImage}
                  src={item.product?.images?.[0]?.url || "/earring-placeholder.png"}
                  alt={item.product?.title || "Sản phẩm"}
                />
                <div className={styles.itemDetails}>
                  <p>{item.product?.title || "Không có tên sản phẩm"}</p>
                  <p>x{item.quantity}</p>
                </div>
                <div
                  className={styles.orderStatus}
                >
                  {order.status}
                </div>
                <div className={styles.price}>
                  {((item.price || 0)* item.quantity).toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
            <div className={styles.actions}>
              {order.status === "PENDING" ? (
                  <button 
                    className={styles.actionBtn}
                    onClick={() => handleUpdateOrderStatus(order.id, "CANCELLED")}
                  >
                    Hủy đơn hàng
                  </button>
              ) : order.status === "CANCELLED" ? (
                <button className={styles.disabledBtn}>
                  Đã hủy đơn hàng
                </button>
              ) : null}
              {order.status === "DELIVERED" ? (
                <button 
                  className={styles.actionBtn}
                  onClick={() => handleUpdateOrderStatus(order.id, "COMPLETED")}
                >
                  Xác nhận đơn hàng
                </button>
              ) : order.status === "COMPLETED" ? (
                <button className={styles.disabledBtn}>
                  Đã xác nhận đơn hàng
                </button>
              ) : null}
              <button 
                className={styles.detailBtn}
                onClick={() => navigate('/myorder/orderdetail', { state: { order } })}
              >
                Chi tiết đơn hàng
              </button>
            </div>
            {/* Hiển thị trạng thái với màu sắc dưới phần số lượng */}
          </div>
        ))}
      </div>
      <div className={styles.backToShop}>
        &lt; Tiếp Tục Mua Hàng
      </div>
    </>
  );
};

export default MyOrders;
