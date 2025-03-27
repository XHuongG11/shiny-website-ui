import { useState, useEffect } from "react";
import ProductContainer from "../ProductContainer/ProductContainer";
import productApi from "../../../../api/productApi";
import styles from "./Product.module.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts({ params: { _page: 1, _limit: 10 } });
                setProducts(response.data?.data?.content || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={styles.productContainer}>
            {loading ? <p>Đang tải sản phẩm...</p> : <ProductContainer products={products} />}
            <button className={styles.productShowmore}>Xem thêm</button>
        </div>
    );
};

export default ProductList;
