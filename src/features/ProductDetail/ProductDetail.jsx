import { useState, useEffect } from "react";
import ProductInfo from './components/ProductInfo/ProductInfo';
import ProductImages from './components/ProductImages/ProductImages';
import SimilarProducts from './components/SimilarProducts/SimilarProducts';
import styles from './ProductDetail.module.css';
import { useLocation } from "react-router-dom";
import ProductReviews from './components/ProductReviews/ProductReviews';
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const location = useLocation();
  const { product, isInWishlist: initialIsInWishlist = false } = location.state || {};
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!(user && user.email);

  // Lấy danh sách wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isLoggedIn) {
        console.log("Người dùng chưa đăng nhập, không tải danh sách wishlist.");
        setWishlist([]);
        return;
      }

      try {
        const response = await userApi.getWishList({ params: { page: 1, size: 100 } });
        setWishlist(response.data.content || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách wishlist:", error);
        setWishlist([]);
      }
    };

    // Chỉ gọi API nếu không có initialIsInWishlist hoặc không có product
    if (!location.state?.isInWishlist || !product) {
      fetchWishlist();
    } else {
      // Khởi tạo wishlist dựa trên initialIsInWishlist
      setWishlist(initialIsInWishlist ? [{ product: { id: product.id } }] : []);
    }
  }, [isLoggedIn, location.state, product]);

  // Hàm cập nhật wishlist
  const updateWishlist = async (product, action) => {
    if (!isLoggedIn) {
      throw new Error("Người dùng chưa đăng nhập.");
    }

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

  if (!product) {
    return <p>Không tìm thấy sản phẩm!</p>;
  }

  // Tính toán isInWishlist dựa trên wishlist state
  const finalIsInWishlist = wishlist.some((item) => item.product.id === product.id);

  return (
    <div className={styles.container}>
      <ProductInfo
        product={product}
        isInWishlist={finalIsInWishlist}
        updateWishlist={updateWishlist}
      />
      <ProductImages images={product.images} />
      <ProductReviews productId={product.id} />
      <SimilarProducts />
    </div>
  );
};

export default ProductDetail;