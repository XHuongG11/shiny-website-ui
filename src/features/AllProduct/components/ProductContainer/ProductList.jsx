import Product from '../Product/Product';
import styles from './Product.module.css';

const products = [
    {
        imageSrc: "imageProduct.png",
        favouriteSrc: "ic-heart.png",
        colors: ["silver-color.png", "gold-color.png", "rose-gold-color.png"],
        discount: "-20% BLACK FRIDAY",
        name: "Pulsera Moments Cadena de Serpiente con cierre de Corazón",
        discountedPrice: "47,20 €",
        originalPrice: "59,00 €"
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