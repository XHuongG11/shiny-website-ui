import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ReturnProduct.module.css';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import ReturnCard from './components/ReturnCard';
import orderApi from '../../api/orderApi';
import Notification from '../../components/Alert';

function ReturnProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = useMemo(() => location.state?.selectedItems || [], [location.state]);
  const orderId = location.state?.orderId;
  const [returns, setReturns] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!orderId || !selectedItems?.length) {
      navigate('/orders', { replace: true, state: { error: 'Vui lòng chọn sản phẩm từ trang đơn hàng.' } });
    }
  }, [orderId, selectedItems, navigate]);

  const handleReturnChange = useCallback((productId, returnData) => {
    setReturns((prev) => ({
      ...prev,
      [productId]: returnData,
    }));
  }, []);

  const isAllFormsComplete = selectedItems.every((item) => {
    if (!item?.product?.id) {
      console.warn('Mục không hợp lệ trong selectedItems:', item);
      return false;
    }
    return returns[item.product.id]?.isFormComplete || false;
  });

  const handleSubmitReturns = async () => {
    try {
      if (!orderId) throw new Error('Không tìm thấy ID đơn hàng.');
      if (selectedItems.some((item) => !item?.product?.id)) throw new Error('Dữ liệu sản phẩm không hợp lệ.');
      if (!Object.keys(returns).length) throw new Error('Không có thông tin hoàn trả.');

      const returnData = Object.entries(returns).map(([productId, data]) => {
        const item = selectedItems.find((item) => String(item.product.id) === productId);
        if (!item) throw new Error(`Không tìm thấy sản phẩm ${productId}.`);
        if (!data.quantity || !data.reason) throw new Error(`Dữ liệu hoàn trả cho sản phẩm ${productId} không đầy đủ.`);
        return {
          itemId: item.id,
          quantity: data.quantity,
          returnReason: data.reason.toUpperCase(),
          description: data.reasonDescription || '',
        };
      });

      await orderApi.returnOrderItem({ orderId, items: returnData });

      for (const [productId, data] of Object.entries(returns)) {
        const item = selectedItems.find((item) => String(item.product.id) === productId);
        if (!item) continue;
        const files = data.images.map((img) => img.file);
        await orderApi.uploadReturnItemProof(item.id, files);
      }

      setNotification({ open: true, message: 'Yêu cầu hoàn trả đã được gửi thành công!', severity: "success" });
      setTimeout(() => navigate('/thankyou-return'), 2000);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hoàn trả:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setNotification({ open: true, message: `Đã xảy ra lỗi: ${errorMessage}`, severity: "error" });
      if (errorMessage.includes('Order not found')) {
        setNotification({ open: true, message: 'Đơn hàng không tồn tại. Vui lòng kiểm tra lại.', severity: "error" });
      }
    }
  };

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
      <Breadcrumb currentPage="Hoàn trả sản phẩm" />
      <div className={styles.returnBox}>
        {selectedItems.length > 0 ? (
          selectedItems
            .filter((item) => item?.product?.id)
            .map((item) => (
              <ReturnCard
                key={item.id}
                product={item.product}
                quantity={item.quantity}
                price={item.price}
                discountPrice={item.discountPrice}
                onReturnChange={handleReturnChange}
              />
            ))
        ) : (
          <div>Không có sản phẩm để hoàn trả</div>
        )}
        {selectedItems.length > 0 && (
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitBtn}
              onClick={handleSubmitReturns}
              disabled={!isAllFormsComplete}
            >
              Gửi yêu cầu hoàn trả
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnProduct;