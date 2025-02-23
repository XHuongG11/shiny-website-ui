import Product from '../Product/Product';
import styles from './Product.module.css';

const products = [
    {
        imageSrc: "/image/allproduct/imageProduct.png",
        favouriteSrc: "/image/allproduct/ic-heart.png",
        colors: [
        "/image/allproduct/silver-color.png",
        "/image/allproduct/gold-color.png",
        "/image/allproduct/rose-gold-color.png",
        ],
        discount: "-20% BLACK FRIDAY",
        name: "Pulsera Moments Cadena de Serpiente con cierre de Corazón",
        discountedPrice: "47,20 €",
        originalPrice: "59,00 €",
    },
    // Thêm các sản phẩm khác vào đây
];

const ProductList = () => {
    return (
        <div className={styles.productContainer}>
            {products.map((product, index) => (
                <Product key={index} {...product} />
            ))}
            <button className={styles.productShowmore}>Xem thêm</button>
        </div>
    );
};

export default ProductList;