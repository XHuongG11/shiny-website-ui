import styles from "./Filter.module.css";
import CategoryFilter from "./CategoryFilter";
import MaterialFilter from "./MaterialFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";

const FilterContainer = () => {
  return (
    <div className={styles.filterContainer}>
      <CategoryFilter />
      <MaterialFilter />
      <SizeFilter />
      <PriceFilter />
    </div>
  );
};

export default FilterContainer;
