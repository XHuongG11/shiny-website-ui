import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ReturnProduct.module.css';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import ReturnCard from './components/ReturnCard';
import orderApi from '../../api/orderApi';

function ReturnProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];
  const orderId = location.state?.orderId;
  const [returns, setReturns] = useState({});

  useEffect(() => {
    if (!location.state?.orderId || !location.state?.selectedItems?.length) {
      console.error('Thiếu orderId hoặc selectedItems trong location.state');
      alert('Vui lòng chọn sản phẩm từ trang đơn hàng.');
      navigate('/orders', { replace: true });
    }
  }, [location.state, navigate]);

  const handleReturnChange = (productId, returnData) => {
    setReturns((prev) => ({
      ...prev,
      [productId]: returnData,
    }));
  };

  const isAllFormsComplete = selectedItems.every((item) => {
    if (!item || !item.product || !item.product.id) {
      console.warn('Mục không hợp lệ trong selectedItems:', item);
      return false;
    }
    const returnData = returns[item.product.id];
    return returnData && returnData.isFormComplete;
  });

  const handleSubmitReturns = async () => {
    try {
      if (!orderId) {
        throw new Error('Không tìm thấy ID đơn hàng. Vui lòng quay lại trang đơn hàng.');
      }
      if (selectedItems.some((item) => !item || !item.product || !item.product.id)) {
        throw new Error('Dữ liệu sản phẩm không hợp lệ trong danh sách đã chọn.');
      }
      if (Object.keys(returns).length === 0) {
        throw new Error('Không có thông tin hoàn trả nào được nhập');
      }

      console.log('returns:', returns);
      console.log('selectedItems:', selectedItems);

      const returnData = Object.entries(returns).map(([productId, data]) => {
        const item = selectedItems.find((item) => String(item.product.id) === productId);
        if (!item) {
          console.error('Không tìm thấy sản phẩm:', productId, 'trong selectedItems:', selectedItems);
          throw new Error(`Không tìm thấy sản phẩm ${productId} trong danh sách đã chọn`);
        }
        if (!data.quantity || !data.reason) {
          throw new Error(`Dữ liệu hoàn trả cho sản phẩm ${productId} không đầy đủ`);
        }
        console.log('item:', item);

        return {
          itemId: item.id,
          quantity: data.quantity,
          returnReason: data.reason.toUpperCase(), // giữ Enum
          description: data.reasonDescription || '',      // LẤY MÔ TẢ thực sự user nhập
        };
      });

      console.log('returnData gửi lên API:', returnData);

      const returnResponse = await orderApi.returnOrderItem({
        orderId: orderId,
        items: returnData,
      });
      console.log('Kết quả từ API /return:', returnResponse.data);

      for (const [productId, data] of Object.entries(returns)) {
        const item = selectedItems.find((item) => String(item.product.id) === productId);
        if (!item) {
          console.warn(`Không tìm thấy sản phẩm với productId ${productId}`);
          continue;
        }
        console.log(`Hình ảnh :`, data.images);
      
        // Lấy danh sách file gốc từ data.images
        const files = data.images.map((img) => img.file);
      
        // Gọi API upload với item.id và danh sách file gốc
        const uploadResponse = await orderApi.uploadReturnItemProof(item.id, files);
        console.log(`Kết quả từ API /return/upload cho sản phẩm ${item.id}:`, uploadResponse.data);
        alert('Yêu cầu hoàn trả đã được gửi thành công!');
        navigate('/thankyou-return');
        window.location.reload();
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hoàn trả:', error);
      console.log('Chi tiết lỗi:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Đã xảy ra lỗi: ${errorMessage}`);
      if (errorMessage === 'Order not found') {
        alert('Đơn hàng không tồn tại. Vui lòng kiểm tra lại.');
      }
    }
  };

  return (
    <div>
      <Breadcrumb currentPage="Hoàn trả sản phẩm" />
      <div className={styles.returnBox}>
        {selectedItems.length > 0 ? (
          selectedItems
            .filter((item) => item && item.product && item.product.id)
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
