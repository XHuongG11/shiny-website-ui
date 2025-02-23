import styles from './SimilarProducts.module.css';
import Product from './src/features/AllProduct/components/ProductContainer/Product';

const products = [
    {
      imageSrc: "/image/productdetail/imageProduct.png",
      favouriteSrc: "/image/productdetail/ic-heart.png",
      colors: [
        "/image/productdetail/silver-color.png",
        "/image/productdetail/gold-color.png",
        "/image/productdetail/rose-gold-color.png",
      ],
      discount: "-20% BLACK FRIDAY",
      name: "Pulsera Moments Cadena de Serpiente con cierre de Corazón",
      discountedPrice: "47,20 €",
      originalPrice: "59,00 €",
    },
    {
      imageSrc: "/image/productdetail/imageProduct2.png",
      favouriteSrc: "/image/productdetail/ic-heart.png",
      colors: [
        "/image/productdetail/silver-color.png",
        "/image/productdetail/gold-color.png",
        "/image/productdetail/rose-gold-color.png",
      ],
      discount: "-15% SUMMER SALE",
      name: "Anillo de Diamante con Corte en Corazón",
      discountedPrice: "120,00 €",
      originalPrice: "140,00 €",
    },
    {
      imageSrc: "/image/productdetail/imageProduct3.png",
      favouriteSrc: "/image/productdetail/ic-heart.png",
      colors: [
        "/image/productdetail/silver-color.png",
        "/image/productdetail/gold-color.png",
        "/image/productdetail/rose-gold-color.png",
      ],
      discount: "-10% NEW COLLECTION",
      name: "Collar de Plata con Detalles en Oro",
      discountedPrice: "80,00 €",
      originalPrice: "90,00 €",
    },
  ];
  const ProductList = () => {
    return (
      <div className={styles.productContainer}>
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    );
  };
  
  export default ProductList;