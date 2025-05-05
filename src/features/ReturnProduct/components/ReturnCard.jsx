import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ReturnCard.module.css';

const ReturnCard = ({ product, quantity, price, discountPrice, onReturnChange }) => {
  const [returnQuantity, setReturnQuantity] = useState(0);
  const [reason, setReason] = useState('');
  const [reasonDescription, setReasonDescription] = useState('');
  const [bank, setBank] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [images, setImages] = useState([]);
  const maxChars = 500;
  const fileInputRef = useRef();

  // Chỉ gọi onReturnChange khi dữ liệu thực sự thay đổi
  useEffect(() => {
    const isFormComplete = returnQuantity > 0 && reason && reasonDescription && images.length > 0;
    onReturnChange(product.id, {
      quantity: returnQuantity,
      reason,
      reasonDescription,
      images,
      isFormComplete,
    });
  }, [returnQuantity, reason, reasonDescription,  images.length, product.id, onReturnChange]); // Dùng images.length thay vì images

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 0;
    if (qty >= 0 && qty <= quantity) {
      setReturnQuantity(qty);
    }
  };

  const handleBankChange = (e) => {
    const input = e.target.value;
    setBank(input);
    setCharCount(input.length);
  };

  const handleReasonDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setReasonDescription(input);
      setCharCount(input.length);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); // Giữ tham chiếu ổn định
  };

  const handleSelectReasonChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.productSection}>
        <img
          src={product.images?.[0]?.url || '/image/placeholder.png'}
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
          <p className={styles.productOptions}>Số lượng đã mua: {quantity}</p>
        </div>
      </div>
      <div className={styles.returnSection}>
        <div className={styles.returnForm}>
          <div className={styles.rowWrapper}>
            <div className={styles.quantityWrapper}>
              <label htmlFor={`quantity-${product.id}`} className={styles.quantityLabel}>
                Số lượng muốn hoàn trả:
              </label>
              <input
                type="number"
                id={`quantity-${product.id}`}
                value={returnQuantity}
                onChange={handleQuantityChange}
                min="0"
                max={quantity}
                className={styles.quantityInput}
              />
            </div>
            <div className={styles.titleReason}>
              <label htmlFor="returnReason" className={styles.reasonlabel}>Lý do hoàn trả: </label>
              <select
                id="returnReason"
                name="returnReason"
                className={styles.reasonSelect}
                value={reason}
                onChange={handleSelectReasonChange}
              >
                <option value="">Chọn lý do</option>
                <option value="BROKEN">Bị hỏng</option>
                <option value="SIZE_PROBLEM">Lỗi size</option>
                <option value="NOT_AS_DESCRIBED">Không như mô tả</option>
              </select>
            </div>
          </div>
          <div className={styles.imageUploadSection}>
            <p className={styles.imageUploadTitle}>Hình ảnh sản phẩm lỗi<span className={styles.batbuoc}> *</span>:</p>
            <div className={styles.imageGrid}>
              {images.map((img, index) => (
                <div key={index} className={styles.imageBox}>
                  <img src={img.url} alt={`upload-${index}`} className={styles.previewImage} />
                </div>
              ))}
              <div className={styles.uploadContainer} onClick={handleAddImageClick}>
                <div className={styles.plusSign}>+</div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>        
          <div className={styles.reasonHeader}>
            <p className={styles.titleReason}>Mô tả lý do<span className={styles.batbuoc}> *</span>:</p>
            <p className={styles.charCount}>
              {charCount}/{maxChars} ký tự
            </p>
          </div>
          <textarea
            className={styles.reasonText}
            placeholder="Hãy chia sẻ lý do bạn muốn hoàn trả sản phẩm"
            value={reasonDescription}
            onChange={handleReasonDescriptionChange}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
};

ReturnCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  onReturnChange: PropTypes.func.isRequired,
};

export default ReturnCard;