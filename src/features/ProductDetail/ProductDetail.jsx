import ProductInfo from './components/ProductInfo/ProductInfo';
import ProductImages from './components/ProductImages/ProductImages';
import SimilarProducts from './components/SimilarProducts/SimilarProducts';
import styles from './ProductDetail.module.css';
import { useLocation } from "react-router-dom";
import ProductReviews from './components/ProductReviews/ProductReviews';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  if (!product) {
    return <p>Không tìm thấy sản phẩm!</p>;
  }
  return (
    <div className={styles.container}>
      <ProductInfo product={product} />
      <ProductImages images={product.images} />
      <ProductReviews productId={product.id} />
      <SimilarProducts/>
    </div>
  );
}

export default ProductDetail;