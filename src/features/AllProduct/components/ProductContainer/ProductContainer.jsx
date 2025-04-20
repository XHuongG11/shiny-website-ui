import PropTypes from "prop-types";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";

const ProductContainer = ({ products }) => {
    const productList = Array.isArray(products) ? products : [];
    console.log("ProductContainer product list successfully:", productList);
    return (
        <div className={styles.productContainer}>
            {productList.length > 0 ? (
                productList.map((product, index) => (
                    <ProductCard key={`${product.id}-${index}`} product={product} />
                ))
            ) : (
                <p>Không có sản phẩm nào.</p>
            )}
        </div>
    );
};

ProductContainer.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number,
        })
    ).isRequired,
};

export default ProductContainer;
