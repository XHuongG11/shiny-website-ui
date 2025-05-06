import PropTypes from "prop-types";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import styles from "./Product.module.css";
import { useState, useEffect } from "react";
import userApi from "../../../../api/userApi";
import { useSelector } from "react-redux";

const ProductContainer = ({ products }) => {
    const productList = Array.isArray(products) ? products : [];
    const [wishlist, setWishlist] = useState([]);
    const user = useSelector((state) => state.user.current);
    const isLoggedIn = !!(user && user.email);

    // Lấy danh sách wishlist khi component mount
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!isLoggedIn) {
                setWishlist([]);
                return;
            }
            try {
                const response = await userApi.getWishList({ params: { page: 1, size: 100 } });
                setWishlist(response.data.content || []);
            } catch (error) {
                setWishlist([]);
            }
        };

        fetchWishlist();
    }, [isLoggedIn]);

    // Hàm để cập nhật wishlist khi thêm/xóa sản phẩm
    const updateWishlist = async (product, action) => {
        try {
            if (action === "add") {
                await userApi.addWishList({ product });
                setWishlist((prev) => [...prev, { product }]);
            } else if (action === "remove") {
                await userApi.removeWishList(product.id);
                setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
            }
        } catch (error) {
            console.error("Lỗi khi xử lý wishlist:", error);
            throw error;
        }
    };
    return (
        <div className={styles.productContainer}>
            {productList.length > 0 ? (
                productList.map((product, index) => (
                    <ProductCard
                        key={`${product.id}-${index}`}
                        product={product}
                        isInWishlist={wishlist.some((item) => item.product.id === product.id)}
                        updateWishlist={updateWishlist}
                    />
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