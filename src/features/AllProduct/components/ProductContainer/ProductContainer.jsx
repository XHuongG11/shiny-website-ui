import PropTypes from "prop-types";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";

const ProductContainer = ({ products }) => {
    const productList = Array.isArray(products?.data?.content) ? products.data.content : [];
    console.log("Fetch product list successfully:", productList);
    return (
        <div className={styles.productContainer}>
            {productList.length > 0 ? (
                productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p>Không có sản phẩm nào.</p>
            )}
        </div>
    );
};


ProductContainer.propTypes = {
    products: PropTypes.shape({
        data: PropTypes.shape({
            content: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    title: PropTypes.string.isRequired, 
                    description: PropTypes.string,
                    price: PropTypes.number,
                })
            ).isRequired, 
        }).isRequired, 
    }).isRequired, 
};


export default ProductContainer;
