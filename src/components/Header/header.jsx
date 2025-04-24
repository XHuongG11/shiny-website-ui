import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import styles from "./Header.module.css";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/LoginSignin/store/authSlice";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.current);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    navigate("/infocus");
    setAnchorEl(null);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Chuyển hướng đến trang tìm kiếm với query

      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <nav>
      <div className={styles.on}>
        <div className={styles.logo}>
          <img src="../image/logo/logo.jpg" height="90" width="150"></img>
        </div>
        <div className={styles.navIcons}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput} // Thêm class để style
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi nhập
            onKeyPress={handleKeyPress} // Xử lý khi nhấn Enter
          />
          <SearchRoundedIcon fontSize="large" onClick={handleSearch} />
          <MenuOpenRoundedIcon fontSize="large" />
        </div>
      </div>
      <div className={styles.duongke}></div>
      <div className={styles.below}>
        <div className={styles.items}>
          <div onClick={toggleDropdown}>
            <a className={styles.link} href="#">
              Products
            </a>
            {isOpen && <DropdownMenu />} {/* Hiển thị menu khi hover */}
          </div>
          <a className={styles.link} href="#">
            Collections
          </a>
          <a className={styles.link} href="#">
            Gift ideas
          </a>
          <a className={styles.link} href="#">
            Contact Us
          </a>
        </div>
        <div className={styles.icons}>
          <FavoriteBorderRoundedIcon />
          <PlaceOutlinedIcon />
          <PermIdentityOutlinedIcon sx={{ cursor: "pointer" }}  onClick={handleClick} />
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ marginTop: "5px" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {Object.keys(userInfo).length === 0
              ? [
                  <MenuItem key="login" onClick={handleLogin}>
                    <LoginIcon sx={{ marginRight: "5px" }} />
                    Đăng nhập
                  </MenuItem>,
                  <MenuItem key="login" onClick={handleLogin}>
                    <AppRegistrationIcon sx={{ marginRight: "5px" }} />
                    Đăng ký
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="profile" onClick={handleProfileClick}>
                    <ContactPageIcon sx={{ marginRight: "5px" }} />
                    Thông tin cá nhân
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: "5px" }} />
                    Đăng xuất
                  </MenuItem>,
                ]}
          </Menu>

          <ShoppingBagOutlinedIcon />
        </div>
      </div>
    </nav>
  );
}
