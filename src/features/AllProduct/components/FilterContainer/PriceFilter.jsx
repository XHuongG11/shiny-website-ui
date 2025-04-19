import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";

const PriceFilter = () => {
  return (
    <FilterBox title="Mức giá">
      <li><input type="checkbox" className={styles.checkboxSmall} /> Dưới 1.000.000 VNĐ</li>
      <li><input type="checkbox" className={styles.checkboxSmall} /> 1.000.000 - 2.000.000 VNĐ</li>
      <li><input type="checkbox" className={styles.checkboxSmall} /> 2.000.000 - 3.000.000 VNĐ</li>
      <li><input type="checkbox" className={styles.checkboxSmall} /> 3.000.000 - 5.000.000 VNĐ</li>
      <li><input type="checkbox" className={styles.checkboxSmall} /> Trên 5.000.000 VNĐ</li>
    </FilterBox>
  );
};

export default PriceFilter;
