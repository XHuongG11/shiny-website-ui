import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import React, { useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import styles from './Header.module.css';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/authSlice"
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.current);

  const [isOpen, setIsOpen] = useState(false);

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
  }

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
  }
  return (
    <nav>
      <div className={styles.on}>
        <div className={styles.logo}>
          <img src='./src/assets/img/logo.jpg' height="90" width="150"></img>
        </div>
        <div className={styles.navIcons}>
          <SearchRoundedIcon fontSize="large" />
          <MenuOpenRoundedIcon fontSize="large" />
        </div>
      </div>
      <div className={styles.duongke}></div>
      <div className={styles.below}>
        <div className={styles.items}>
          <div onClick={toggleDropdown}>
            <a className={styles.link} href="#">Products</a>
            {isOpen && <DropdownMenu />} {/* Hiển thị menu khi hover */}
          </div>
          <a className={styles.link} href="#">Collections</a>
          <a className={styles.link} href="#">Gift ideas</a>
          <a className={styles.link} href="#">Contact Us</a>
        </div>
        <div className={styles.icons}>
          <FavoriteBorderRoundedIcon />
          <PlaceOutlinedIcon />
          <PermIdentityOutlinedIcon onClick={handleClick} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {Object.keys(userInfo).length === 0
              ? [<MenuItem key="login" onClick={handleLogin}>Login</MenuItem>]
              : [
                <MenuItem key="profile" onClick={handleProfileClick}>Profile</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
              ]
            }
          </Menu>

          <ShoppingBagOutlinedIcon />
        </div>
      </div>
    </nav >
  );
}
