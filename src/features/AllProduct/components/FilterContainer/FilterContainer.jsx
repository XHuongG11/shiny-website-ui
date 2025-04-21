import styles from "./Filter.module.css";
import CategoryFilter from "./CategoryFilter";
import MaterialFilter from "./MaterialFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import PropTypes from "prop-types";

const FilterContainer = ({
    selectedCategoryId,
    onFilterChange,
    filterCategories,
    filterMaterial,
    filterMinPrice,
    filterMaxPrice,
}) => {
    return (
        <div className={styles.filterContainer}>
            <CategoryFilter
                selectedCategoryId={selectedCategoryId}
                selectedCategories={filterCategories}
                onCategoryChange={(categories) => onFilterChange('categories', categories)}
            />
            <MaterialFilter
                selectedMaterial={filterMaterial}
                onMaterialChange={(material) => onFilterChange('material', material)}
            />
            <SizeFilter
                onSizeChange={(sizes) => onFilterChange('sizes', sizes)}
            />
            <PriceFilter
                minPrice={filterMinPrice}
                maxPrice={filterMaxPrice}
                onPriceChange={(min, max) => {
                    onFilterChange('minPrice', min);
                    onFilterChange('maxPrice', max);
                }}
            />
        </div>
    );
};

FilterContainer.propTypes = {
    selectedCategoryId: PropTypes.number,
    onFilterChange: PropTypes.func.isRequired,
    filterCategories: PropTypes.arrayOf(PropTypes.number).isRequired,
    filterMaterial: PropTypes.string,
    filterMinPrice: PropTypes.number,
    filterMaxPrice: PropTypes.number,
    filterSizes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    setFilterSizes: PropTypes.func.isRequired,
};

export default FilterContainer;