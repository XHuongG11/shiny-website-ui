// WishlistPage.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid2 } from "@mui/material";
import CustomerInfo from "./components/CustomerInfo";
import WishlistItems from "./components/WishlistItems";
import styles from "./WishlistPage.module.css";
import userApi from "../../api/userApi";
import Breadcrumb from "../../components/Breadcrumb/breadcrum";

const WishlistPage = () => {
  const userInfo = useSelector((state) => state.user.current);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Callback để cập nhật wishlist
  const updateWishlistState = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.product.id !== productId)
    );
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userInfo || Object.keys(userInfo).length === 0) {
        setError("Bạn cần đăng nhập để xem danh sách yêu thích");
        setLoading(false);
        return;
      }

      if (!userApi) {
        setError("Không thể truy cập API: userApi không được định nghĩa");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const wishlistResponse = await userApi.getWishList({
          params: { page: 1, size: 10 },
        });
        setWishlist(wishlistResponse.data.content);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi tải wishlist: ", err);
        setError("Không thể tải danh sách yêu thích: " + err.message);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userInfo]);

  return (
    <div>
      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb currentPage="Danh sách yêu thích" />
      </div>
      <div className={styles.pageContainer}>
        <Grid2 container spacing={3} className={styles.content}>
          <Grid2 size={{ xs: 12, md: 3.7 }}>
            <CustomerInfo userInfo={userInfo} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8.3 }}>
            <WishlistItems
              wishlist={wishlist}
              loading={loading}
              error={error}
              updateWishlistState={updateWishlistState}
            />
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default WishlistPage;