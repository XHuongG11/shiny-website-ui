import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
  return (
    <nav>
        <div className={styles.on}>
            <div className={styles.logo}>
                <img src='./src/assets/img/logo.jpg' height="90" width="150"></img>
            </div>
            <div className={styles.navIcons}>
                <SearchRoundedIcon fontSize="large"/>
                <MenuOpenRoundedIcon fontSize="large"/>
            </div>
        </div>
        <div className={styles.duongke}></div>
        <div className={styles.below}>
        <div className={styles.items}>
        <div onClick={toggleDropdown}>
          <a className={styles.link}  href="#">Products</a>
          {isOpen && <DropdownMenu />} {/* Hiển thị menu khi hover */}
        </div>
        <a className={styles.link} href="#">Collections</a>
        <a className={styles.link}  href="#">Gift ideas</a>
        <a className={styles.link}  href="#">Contact Us</a>
      </div>
            <div className={styles.icons}>
                <FavoriteBorderRoundedIcon/>
                <PlaceOutlinedIcon/>
                <PermIdentityOutlinedIcon/>
                <ShoppingBagOutlinedIcon/>
            </div>
        </div>
    </nav>
  );
}
