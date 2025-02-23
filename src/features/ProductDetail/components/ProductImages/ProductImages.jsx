import styles from './ProductImages.module.css';
function ProductImages() {
    return (
      <div className={styles.displayImageProduct}>
        <div className={styles.imageProductContainer}>
          <div className={styles.imageProduct}>
            <img src="/image/productdetail/product2.png" alt="Ảnh 1" />
          </div>
          <div className={styles.imageProduct}>
            <img src="/image/productdetail/product3.png" alt="Ảnh 2" />
          </div>
          <div className={styles.imageProduct}>
            <img src="/image/productdetail/product4.png" alt="Ảnh 3" />
          </div>
          <div className={styles.imageProduct}>
            <img src="/image/productdetail/product5.png" alt="Ảnh 4" />
          </div>
        </div>
      </div>
    );
  }
  
export default ProductImages;