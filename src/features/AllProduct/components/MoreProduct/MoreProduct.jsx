import styles from './MoreProduct.module.css';
import imageLarge from '/image/allproduct/more_image_large.png';
import imageSmall from '/image/allproduct/more_image_small.png';

const MoreProduct = () => {
    return (
        <div className={styles.moreProduct}>
            <div className={styles.moreProductLlabel}>Những sản phẩm khác</div>
            <div className={styles.moreProductCcontainer}>
                {[1, 2, 3].map((index) => (
                    <div key={index} className={styles.moreProductColumn}>
                        {index % 2 === 0 ? (
                            <>
                                {/* Large trước, Small sau */}
                                <div className={styles.moreProductProductLarge}>
                                    <img className={styles.moreProductProductImage} src={imageLarge} alt="Sản phẩm lớn" />
                                    <button className={styles.moreProductProductButton}>SHOP NOW</button>
                                </div>
                                <div className={styles.moreProductProductSmall}>
                                    <img className={`${styles.moreProductProductImage} ${styles.moreProductProductImageSmall}`} src={imageSmall} alt="Sản phẩm nhỏ" />
                                    <button className={styles.moreProductProductButton}>SHOP NOW</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Small trước, Large sau */}
                                <div className={styles.moreProductProductSmall}>
                                    <img className={`${styles.moreProductProductImage} ${styles.moreProductProductImageSmall}`} src={imageSmall} alt="Sản phẩm nhỏ" />
                                    <button className={styles.moreProductProductButton}>SHOP NOW</button>
                                </div>
                                <div className={styles.moreProductProductLarge}>
                                    <img className={styles.moreProductProductImage} src={imageLarge} alt="Sản phẩm lớn" />
                                    <button className={styles.moreProductProductButton}>SHOP NOW</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreProduct;
