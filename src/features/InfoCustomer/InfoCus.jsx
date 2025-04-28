import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";
import Breadcrumb from "../../components/Breadcrumb/breadcrum";
import styles from "./InfoCus.module.css";
import Address from "./components/Address/Address";
import Banner from "./components/Banner/Banner";
import CustomerInfo from "./components/CustomerInfo/CustomerInfo";
import WishList from "./components/WishList/WishList";
import SubscribedBanner from "./components/Subscribed/Subscribed";

const InfoCustomer = () => {
  const infocus = useSelector((state) => state.user.current);

  const [addresses, setAddresses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const fetchAddress = async () => {
    try {
      const addressResponse = await userApi.getAddresses();
      console.log("Danh sách địa chỉ: ", addressResponse.data.content);
      setAddresses(addressResponse.data.content);
    } catch (error) {
      console.log("Lỗi lấy dữ liệu: ", error);
    }
  };
  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await userApi.getWishList({ params: { page: 1, size: 10 } }); // Gọi API để lấy danh sách wishlist
      console.log("Danh sách wishlist: ", wishlistResponse.data.content); // Log danh sách wishlist
      setWishlist(wishlistResponse.data.content); // Lưu danh sách wishlist vào state
    } catch (error) {
      console.log("Lỗi lấy wishlist: ", error);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchWishlist();
  }, []);

  const updateAddresses = (newAddress) => {
    console.log("Địa chỉ mới: ", newAddress);
    setAddresses((prev) => {
      const exists = prev.some((addr) => addr.id === newAddress.id);
      let newAddresses = exists
        ? prev.map((addr) => (addr.id === newAddress.id ? newAddress : addr))
        : [...prev, newAddress];

      if (newAddress.default === true) {
        newAddresses = newAddresses.map((addr) =>
          addr.default === true && newAddress.id !== addr.id
            ? { ...addr, default: false }
            : addr
        );
      }

      console.log("list update: ", newAddresses);
      return newAddresses;
    });
  };
  const RemoveWishlist = async (id) => {
    try {
      await userApi.removeWishList(id); // Gọi API để xóa sản phẩm khỏi wishlist
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id)); // Cập nhật state
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi wishlist:", error);
    }
    await fetchWishlist(); // Gọi lại API để lấy danh sách wishlist mới
  };

  return (
    <div className={styles.infoCus}>
      <Banner fullName={infocus?.fullName} />
      <Breadcrumb currentPage="Thông tin tài khoản" />
      <SubscribedBanner/>
      {/* <div className={styles.container}> */}
      <Grid2
        container
        direction="row"
        spacing={3}
        sx={{ justifyContent: "center" }}
      >
        <Grid2 size={{ md: 5, xs: 11 }}>
          <CustomerInfo infoCus={infocus} />
        </Grid2>
        {/* <div className={styles.containerMore}> */}
        <Grid2
          container
          size={{ md: 5, xs: 11 }}
          direction="column"
          spacing={3}
        >
          <Grid2 size={12}>
            <WishList wishlist={wishlist} onRemove={RemoveWishlist}/>
          </Grid2>
          <Grid2 size={12}>
            <Address addresses={addresses} onUpdate={updateAddresses} />
          </Grid2>
        </Grid2>
        {/* </div> */}
      </Grid2>

      {/* </div> */}
    </div>
  );
};
export default InfoCustomer;
