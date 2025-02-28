import styles from './viewProduct.module.css'; // Import CSS Module

const ViewProduct = () => {
    return (
        <section className={styles.viewedProducts}>
            <h2>Sản phẩm đã xem</h2>
            <div className={styles.productList}>
                {/* Sản phẩm 1 */}
                <div className={styles.product}>
                    <img src="/imgCart/charm.png" alt="Vòng Pandora" />
                    <span className={styles.wishlistIcon}></span>
                    <p className={styles.discount}>-20% BLACK FRIDAY</p>
                    <p className={styles.productName}>Vòng Pandora Moments Bạc Khóa Crown O</p>
                    <div className={styles.colorOptions}>
                        <div
                            className={styles.colorImg}
                            style={{ backgroundImage: "url('/imgCart/silver.jpg')" }}
                        ></div>
                        <div
                            className={styles.colorImg}
                            style={{ backgroundImage: "url('/imgCart/gold.jpg')" }}
                        ></div>
                        <div
                            className={styles.colorImg}
                            style={{ backgroundImage: "url('/imgCart/pink.jpg')" }}
                        ></div>
                    </div>
                    <p className={styles.price}>
                        <span className={styles.currentPrice}>4,567,000đ</span>{' '}
                        <span className={styles.oldPrice}>5,456,000đ</span>
                    </p>
                </div>

                {/* Sản phẩm 2 */}
                <div className={styles.product}>
                    <img src="/imgCart/charm.png" alt="Vòng Pandora" />
                    <span className={styles.wishlistIcon}>❤</span>
                    <p className={styles.discount}>-20% BLACK FRIDAY</p>
                    <p className={styles.productName}>
                        Vòng Pandora Moments Mạ Vàng Hồng 14K Khóa Tim Tròn
                    </p>
                    <p className={styles.price}>
                        <span className={styles.currentPrice}>4,567,000đ</span>{' '}
                        <span className={styles.oldPrice}>5,456,000đ</span>
                    </p>
                </div>

                {/* Sản phẩm 3 */}
                <div className={styles.product}>
                    <img src="/imgCart/charm.png" alt="Vòng Pandora" />
                    <span className={styles.wishlistIcon}>❤</span>
                    <p className={styles.productName}>
                        Vòng Pandora Mạ Vàng 14K Mắt Xích Nối Thanh Khắc Chữ
                    </p>
                    <p className={styles.price}>
                        <span className={styles.currentPrice}>3,569,000đ</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ViewProduct;