import Product from './Product';
import styles from './Product.module.css';

const ProductContainer = () => {
    const productTemplate = [
        {
            imageSrc: "imageProduct.png",
            favouriteSrc: "ic-heart.png",
            colors: ["silver-color.png", "gold-color.png", "rose-gold-color.png"],
            discount: "-20% BLACK FRIDAY",
            name: "Pulsera Moments Cadena de Serpiente con cierre de Corazón",
            discountedPrice: "47,20 €",
            originalPrice: "59,00 €"
        },
        // Thêm các sản phẩm khác
    ];
    const products = Array(9).fill(productTemplate);
    return (
        <div className={styles.productContainer}>
            {products.map((product, index) => (
                <Product key={index} {...product} />
            ))}
        </div>
    );
};

export default ProductContainer;