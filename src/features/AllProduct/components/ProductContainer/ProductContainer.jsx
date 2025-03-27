import PropTypes from "prop-types";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";

const ProductContainer = ({ products }) => {
    // Đảm bảo products.data.content tồn tại và là một mảng
    const productList = Array.isArray(products?.data?.content) ? products.data.content : [];
    console.log("Fetch product list successfully:", productList);

    return (
        <div className={styles.productContainer}>
            {productList.length > 0 ? (
                productList.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        name={product.title} 
                        imageSrc= {product.images[0].url}
                        originalPrice={product.productSizes.length > 0 ? product.productSizes[0].price : ""}
                        discountedPrice={product.productSizes.length > 0 ? product.productSizes[0].discountPrice : ""}
                        />
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
