import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
    const priceRanges = [
        { label: "Dưới 1.000.000 VNĐ", min: 0, max: 1000000 },
        { label: "1.000.000 - 2.000.000 VNĐ", min: 1000000, max: 2000000 },
        { label: "2.000.000 - 3.000.000 VNĐ", min: 2000000, max: 3000000 },
        { label: "3.000.000 - 5.000.000 VNĐ", min: 3000000, max: 5000000 },
        { label: "Trên 5.000.000 VNĐ", min: 5000000, max: null },
    ];

    const handlePriceChange = (min, max) => {
        if (minPrice === min && maxPrice === max) {
            onPriceChange(null, null);
        } else {
            onPriceChange(min, max);
        }
    };

    return (
        <FilterBox title="Mức giá">
            {priceRanges.map((range) => (
                <li key={range.label} className={styles.pricename}>
                <label className={styles.filterItem}>
                    <input
                    type="checkbox"
                    className={styles.checkboxSmall}
                    checked={minPrice === range.min && maxPrice === range.max}
                    onChange={() => handlePriceChange(range.min, range.max)}
                    />
                    {range.label}
                </label>
                </li>
            ))}
            </FilterBox>
    );
};

PriceFilter.propTypes = {
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    onPriceChange: PropTypes.func.isRequired,
};

export default PriceFilter;