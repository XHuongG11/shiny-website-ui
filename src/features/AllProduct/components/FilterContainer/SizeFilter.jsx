import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";

const SizeFilter = () => {
  return (
    <FilterBox title="Size">
      <div className={styles.filterSize}>
        {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((size) => (
          <button key={size} className={styles.filterSizeNumber}>{size}</button>
        ))}
      </div>
    </FilterBox>
  );
};

export default SizeFilter;