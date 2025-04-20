import styles from "./Filter.module.css";
import CategoryFilter from "./CategoryFilter";
import MaterialFilter from "./MaterialFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import PropTypes from "prop-types";

const FilterContainer = ({ selectedCategoryId }) => {
  return (
    <div className={styles.filterContainer}>
      <CategoryFilter selectedCategoryId={selectedCategoryId}/>
      <MaterialFilter />
      <SizeFilter />
      <PriceFilter />
    </div>
  );
};
FilterContainer.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
};

export default FilterContainer;
