import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReturnOrder.module.css';
import orderApi from '../../api/orderApi'; // Import API để lấy đơn hàng
import Breadcrumb from '../../components/Breadcrumb/breadcrum';

const ReturnOrder = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Hook để điều hướng
  const [order, setOrder] = useState(null); // State để lưu thông tin đơn hàng
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải
  const [error, setError] = useState(null); // State để lưu lỗi
  const [selectedProducts, setSelectedProducts] = useState([]); // State để lưu sản phẩm được chọn

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrder(id); // Gọi API để lấy đơn hàng
        console.log('Dữ liệu trả về từ API:', response.data);
        if (!response.data) {
          setError('Đơn hàng không tồn tại hoặc đã bị xóa.');
          setLoading(false);
          return;
        }
        setOrder(response.data); // Lưu thông tin đơn hàng vào state
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
        setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleNext = () => {
    const selectedItems = order.orderItems.filter((item) =>
      selectedProducts.includes(item.id)
    );
    navigate('/returnproduct', { state: { orderId: order.id,selectedItems, } }); // Truyền danh sách sản phẩm đã chọn
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng</div>;

  return (
    <div>
      <Breadcrumb currentPage="Hoàn trả sản phẩm" />
      <div className={styles.container}>
        <h1 className={styles.title}>Chọn sản phẩm muốn hoàn trả</h1>
        <ul className={styles.productList}>
          {order.orderItems && order.orderItems.length > 0 ? (
            order.orderItems.map((item) => (
              <li key={item.id} className={styles.productItem}>
                <input
                  type="checkbox"
                  id={`select-${item.id}`}
                  checked={selectedProducts.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className={styles.checkbox}
                />
                <div className={styles.productContent}>
                  <img
                    src={item.product.images && item.product.images.length > 0 ? item.product.images[0].url: '/image/placeholder.png'}
                    alt={item.product.name}
                    className={styles.productImage}
                  />
                  <div className={styles.productDetail}>
                    <span className={styles.productTitle}>{item.product.title}</span>
                    <span className={styles.productPrice}>{item.price.toLocaleString()} VNĐ</span>
                    <span className={styles.productText}>
                      Số lượng đã mua: {item.quantity}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div>Không có sản phẩm trong đơn hàng</div>
          )}
        </ul>
        <div className={styles.buttonContainer}>
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={selectedProducts.length === 0}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnOrder;