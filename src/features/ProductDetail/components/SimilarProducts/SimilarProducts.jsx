import styles from './SimilarProducts.module.css';
// import Product from './src/features/AllProduct/components/ProductContainer/Product';

function SimilarProducts() {
    return (
      <div className={styles.similarProduct}>
        <label>SẢN PHẨM TƯƠNG TỰ</label>
        <div className={styles.navigationContainer}>
          <button className={styles.circleButton}>
            <img src="/image/productdetail/ic_leftt.png" alt="back" />
          </button>
          
          <div className={styles.containerProduct}>
            <div className={styles.product}>
              <img className={styles.productImage} src="/image/productdetail/imageProduct.png" alt="product image" />
              <img className={styles.productFavourite} src="/image/productdetail/ic-heart.png" alt="favourite product" />
              <div className={styles.productColor}>
                <img src="/image/productdetail/silver-color.png" alt="silver" />
                <img src="/image/productdetail/gold-color.png" alt="gold" />
                <img src="/image/productdetail/rose-gold-color.png" alt="rose gold" />
              </div>
              <p className={styles.productDiscount}>-20% BLACK FRIDAY</p>
              <p className={styles.productName}>Pulsera Moments Cadena de Serpiente con cierre de Corazón</p>
              <div className={styles.productPrice}>
                <p className={styles.productPriceDiscounted}>47,20 €</p>
                <p className={styles.productPriceOriginal}>59,00 €</p>
              </div>
            </div>
            <div className={styles.product}>
              <img className={styles.productImage} src="/image/productdetail/imageProduct.png" alt="product image" />
              <img className={styles.productFavourite} src="/image/productdetail/ic-heart.png" alt="favourite product" />
              <div className={styles.productColor}>
                <img src="/image/productdetail/silver-color.png" alt="silver" />
                <img src="/image/productdetail/gold-color.png" alt="gold" />
                <img src="/image/productdetail/rose-gold-color.png" alt="rose gold" />
              </div>
              <p className={styles.productDiscount}>-20% BLACK FRIDAY</p>
              <p className={styles.productName}>Pulsera Moments Cadena de Serpiente con cierre de Corazón</p>
              <div className={styles.productPrice}>
                <p className={styles.productPriceDiscounted}>47,20 €</p>
                <p className={styles.productPriceOriginal}>59,00 €</p>
              </div>
            </div>
            <div className={styles.product}>
              <img className={styles.productImage} src="/image/productdetail/imageProduct.png" alt="product image" />
              <img className={styles.productFavourite} src="/image/productdetail/ic-heart.png" alt="favourite product" />
              <div className={styles.productColor}>
                <img src="/image/productdetail/silver-color.png" alt="silver" />
                <img src="/image/productdetail/gold-color.png" alt="gold" />
                <img src="/image/productdetail/rose-gold-color.png" alt="rose gold" />
              </div>
              <p className={styles.productDiscount}>-20% BLACK FRIDAY</p>
              <p className={styles.productName}>Pulsera Moments Cadena de Serpiente con cierre de Corazón</p>
              <div className={styles.productPrice}>
                <p className={styles.productPriceDiscounted}>47,20 €</p>
                <p className={styles.productPriceOriginal}>59,00 €</p>
              </div>
            </div>
          </div>
          
          <button className={styles.circleButton}>
            <img src="/image/productdetail/ic_right.png" alt="next" />
          </button>
        </div>
      </div>
    );
  }
  
  export default SimilarProducts;