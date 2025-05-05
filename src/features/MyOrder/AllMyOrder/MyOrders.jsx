import { useEffect, useRef, useState } from "react";
import styles from './MyOrder.module.css';
import orderApi from '../../../api/orderApi';
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);
  const tabList = ["ALL", "PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"];
  const navigate = useNavigate();

  // Fetch all orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getMyOrders();
        console.log("📦 Dữ liệu đơn hàng nhận được từ API:", res);
        setAllOrders(res.data.content);
      } catch (err) {
        console.error("❌ Lỗi lấy danh sách đơn hàng:", err);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on active tab
  useEffect(() => {
    const currentTabStatus = tabList[activeTab];
    let filteredData = [...allOrders];
    if (currentTabStatus !== "ALL") {
      filteredData = filteredData.filter(order => order.status === currentTabStatus);
    }
    setFilteredOrders(filteredData);
  }, [activeTab, allOrders]);

  // Update underline style for tabs
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
      <p className={styles.breadcrumb}>Home / My Order</p>
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

        {filteredOrders.map((order, index) => {
          // Select the first item as the representative product
          const representativeItem = order.orderItems[0] || {};

          return (
            <div key={index} className={styles.orderBox}>
              <div className={styles.item}>
                <img
                  className={styles.itemImage}
                  src={representativeItem.product?.images?.[0]?.url || "/earring-placeholder.png"}
                  alt={representativeItem.product?.title || "Sản phẩm"}
                />
                <div className={styles.itemDetails}>
                  <p>{representativeItem.product?.title || "Không có tên sản phẩm"}</p>
                  <p>x{representativeItem.quantity || 0}</p>
                </div>
                <div className={styles.orderStatus}>
                  {order.status}
                </div>
                <div className={styles.price}>
                  {((representativeItem.price || 0) * (representativeItem.quantity || 0)).toLocaleString('vi-VN')}đ
                </div>
              </div>
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
                  onClick={() => navigate(`/myorder/orderdetail/${order.id}`)}
                >
                  Chi tiết đơn hàng
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.backToShop} onClick={() => navigate('/')}>
          &lt; Tiếp Tục Mua Hàng
      </div>
    </>
  );
};

export default MyOrders;