import FilterBox from "./FilterBox";
import silverMaterial from "/image/allproduct/material_silver.png";
import whiteGoldMaterial from "/image/allproduct/material_white_gold.png";
import gold10KMaterial from "/image/allproduct/material_gold10k.png";
import gold18KMaterial from "/image/allproduct/material_gold18k.png";
import gold24KMaterial from "/image/allproduct/material_gold24k.png";
import platinumKMaterial from "/image/allproduct/material_platinum.png";
import styles from "./Filter.module.css";

const MaterialFilter = () => {
  return (
    <FilterBox title="Chất liệu">
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={silverMaterial} alt="Bạc" />
          <label> Bạc</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={whiteGoldMaterial} alt="Vàng trắng" />
          <label> Vàng trắng</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={gold10KMaterial} alt="Vàng 10K" />
          <label> Vàng 10K</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={gold18KMaterial} alt="Vàng 18K<" />
          <label> Vàng 18K</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={gold24KMaterial} alt="Vàng 24K" />
          <label> Vàng 24K</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={platinumKMaterial} alt="Bạch kim" />
          <label> Bạch kim</label>
        </div>
      </li>
    </FilterBox>
  );
};

export default MaterialFilter;
