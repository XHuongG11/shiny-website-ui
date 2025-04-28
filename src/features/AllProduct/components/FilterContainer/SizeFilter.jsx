import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

const SizeFilter = ({onSizeChange}) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleClick = (size) => {
    if (selectedSizes.includes(size)) {
      // Bỏ chọn nếu đã được chọn
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      // Thêm vào danh sách đã chọn
      setSelectedSizes(prev => [...prev, size]);
    }

  };
  useEffect(() => {
    onSizeChange(selectedSizes);
}, [selectedSizes, setSelectedSizes]);
  return (
    <FilterBox title="Size">
      <div className={styles.filterSize}>
      {[ "One size", 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 38, 40, 42, 44, 45, 46, 48, 50, 51, 52, 53, 54, 55].map((size) => (
         <button
         key={size}
         className={`${styles.filterSizeNumber} ${selectedSizes.includes(size) ? styles.selected : ''}`}
         onClick={() => handleClick(size)}
       >
         {size}
       </button>
      ))}
    </div>
    </FilterBox>
  );
};
SizeFilter.propTypes = {
  onSizeChange: PropTypes.func.isRequired
}
export default SizeFilter;