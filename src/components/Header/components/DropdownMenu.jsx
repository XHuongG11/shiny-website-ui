import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import styles from './DropdownMenu.module.css';

export default function DropdownMenu() {

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownMenu}>
        <a href="/allproduct" style={{ fontWeight: "bold" }}>Products <ChevronRightRoundedIcon/></a>
        <a href="#">Collections <ChevronRightRoundedIcon/></a>
        <a href="#">Gift ideas <ChevronRightRoundedIcon/></a>
      </div>
      <div className={styles.dropdownColumn}>
        <h4>Rings</h4>
        <a href="#">All rings</a>
        <a href="#">Heart & Promise Rings</a>
        <a href="#">Ring Sets</a>
        <a href="#">Best Seller Rings</a>
      </div>
      <div className={styles.dropdownColumn}>
        <h4>Earrings</h4>
        <a href="#">All earrings</a>
        <a href="#">Drop earrings</a>
      </div>
      <div className={styles.dropdownColumn}>
        <h4>Necklaces</h4>
        <a href="#">Chain necklaces</a>
        <a href="#">Pendant necklaces</a>
        <a href="#">Initial necklaces</a>
        <a href="#">Charm Pendants</a>
      </div>
      <div className={styles.dropdownColumn}>
        <h4>Charms & Bracelets</h4>
        <a href="#">Charm Bracelets</a>
        <a href="#">Bangles</a>
        <a href="#">Chain Bracelets</a>
      </div>
    </div>
  );
}
