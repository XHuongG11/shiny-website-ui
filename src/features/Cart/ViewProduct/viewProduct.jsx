import ProductCard from '../../../components/ProductCard/ProductCard';
import styles from './viewProduct.module.css'; // Import CSS Module

const ViewProduct = () => {
    const productTemplate = [
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
        // Thêm các sản phẩm khác
    ];
    const products = Array(3).fill(productTemplate);
    return (
        <section className={styles.viewedProducts}>
            <h2>Sản phẩm đã xem</h2>
            <div className={styles.productList}>
                {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
                

            </div>
        </section>
    );
};

export default ViewProduct;