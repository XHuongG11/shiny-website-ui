import ProductInfo from './components/ProductInfo/ProductInfo';
import ProductImages from './components/ProductImages/ProductImages';
import SimilarProducts from './components/SimilarProducts/SimilarProducts';
import styles from './ProductDetail.module.css';


const ProductDetail = () => {
  return (
    <div className={styles.container}>
      <ProductInfo />
      <ProductImages />
      <SimilarProducts />
    </div>
  );
}

export default ProductDetail;