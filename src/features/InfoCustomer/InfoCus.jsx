import { Button, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userApi from "../../api/userApi";
import Breadcrumb from "../../components/Breadcrumb/breadcrum";
import styles from "./InfoCus.module.css";
import Address from "./components/Address/Address";
import Banner from "./components/Banner/Banner";
import CustomerInfo from "./components/CustomerInfo/CustomerInfo";
import WishList from "./components/WishList/WishList";
import SubscribedBanner from "./components/Subscribed/Subscribed";
import ModalChangePassword from "./components/ChangePassword";
import { logout } from "../LoginSignin/store/authSlice";
import { useNavigate } from "react-router-dom";
import MemberShipRank from "./components/CustomerInfo/MemberShipRank";
import DeleteAccount from "./components/DeleteAccount";

const InfoCustomer = () => {
  const [infocus, setInfoCus] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subscribedForNews, setSubscribedForNews] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [openModalChangePass, setOpenModalChangePass] = useState(false);

  const handleClickChangePass = () => {
    setOpenModalChangePass(true);
  };

  const handleCloseModal = () => {
    setOpenModalChangePass(false);
  };

  const handleClickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const fetchAddress = async () => {
    const addressResponse = await userApi.getAddresses();
    setAddresses(addressResponse.data.content);
  };
  const fetchWishlist = async () => {
    const wishlistResponse = await userApi.getWishList({
      params: { page: 1, size: 10 },
    }); // Gọi API để lấy danh sách wishlist
    setWishlist(wishlistResponse.data.content); // Lưu danh sách wishlist vào state
  };
  const fetchInfoCus = async () => {
    try {
      const resp = await userApi.getInfo();
      setInfoCus(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setSubscribedForNews(infocus?.subscribedForNews || false);
  }, [infocus]);

  useEffect(() => {
    fetchInfoCus();
    fetchAddress();
    fetchWishlist();
  }, []);

  const handleSubscribe = async () => {
    try {
      const response = await userApi.registerForNews(!subscribedForNews); // Gửi trạng thái ngược lại
      if (response) {
        const message = subscribedForNews
          ? "Bạn đã hủy đăng ký nhận thông báo!"
          : "Bạn đã đăng ký nhận thông báo thành công!";
        alert(message);
        setSubscribedForNews(!subscribedForNews); // Cập nhật trạng thái
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    }
  };

  const updateAddresses = (newAddress, isDelete = false) => {
    setAddresses((prev) => {
      if (isDelete) {
        const newList = prev.filter((addr) => addr.id !== newAddress.id);
        return newList;
      }
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
      return newAddresses;
    });
  };
  const RemoveWishlist = async (id) => {
    try {
      await userApi.removeWishList(id); // Gọi API để xóa sản phẩm khỏi wishlist
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== id)
      ); // Cập nhật state
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi wishlist:", error);
    }
    await fetchWishlist(); // Gọi lại API để lấy danh sách wishlist mới
  };

  return (
    <div className={styles.infoCus}>
      <Banner fullName={infocus?.fullName} />
      <Breadcrumb currentPage="Thông tin tài khoản" />
      <SubscribedBanner
        onSubscribe={handleSubscribe}
        isSubscribed={subscribedForNews}
      />
      {/* <div className={styles.container}> */}
      <Grid2
        container
        direction="row"
        spacing={3}
        sx={{ justifyContent: "center" }}
      >
        <Grid2
          container
          size={{ md: 5, xs: 11 }}
          direction="column"
          spacing={3}
        >
          <Grid2 size={12}>
            <CustomerInfo infoCus={infocus} />
          </Grid2>
          <Grid2 size={12}>
            <MemberShipRank infoCus={infocus} />
          </Grid2>
        </Grid2>
        <Grid2
          container
          size={{ md: 5, xs: 11 }}
          direction="column"
          spacing={3}
        >
          <Grid2 size={12}>
            <WishList wishlist={wishlist} onRemove={RemoveWishlist} />
          </Grid2>
          <Grid2 size={12}>
            <Address addresses={addresses} onUpdate={updateAddresses} />
          </Grid2>
          <Grid2
            container
            size={12}
            direction="row"
            sx={{ justifyContent: "flex-end" }}
          >
            <DeleteAccount />
            <Button
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={handleClickChangePass}
            >
              Thay đổi mật khẩu
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleClickLogout}
            >
              Đăng xuất
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Notification */}
      <ModalChangePassword
        handleCloseModal={handleCloseModal}
        openDialog={openModalChangePass}
      />
    </div>
  );
};
export default InfoCustomer;
