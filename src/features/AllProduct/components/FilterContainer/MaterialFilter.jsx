import FilterBox from "./FilterBox";
import silverMaterial from "/image/allproduct/silver-material.png";
import goldMaterial from "/image/allproduct/gold-material.png";
import roesgoldMaterial from "/image/allproduct/rose-gold-material.png";
import styles from "./Filter.module.css";

const MaterialFilter = () => {
  return (
    <FilterBox title="Chất liệu">
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={silverMaterial} alt="Bạc" />
          <label> Bạc (23)</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={goldMaterial} alt="Vàng hồng" />
          <label> Vàng hồng (156)</label>
        </div>
      </li>
      <li>
        <div className={styles.filterMaterial}>
          <img className={styles.productMaterial} src={roesgoldMaterial} alt="Vàng" />
          <label> Vàng (58)</label>
        </div>
      </li>
    </FilterBox>
  );
};

export default MaterialFilter;
