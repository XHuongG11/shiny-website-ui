import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import { useState } from 'react';

const SizeFilter = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleClick = (size) => {
    if (selectedSizes.includes(size)) {
      // Bỏ chọn nếu đã được chọn
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      // Thêm vào danh sách đã chọn
      setSelectedSizes([...selectedSizes, size]);
    }
  };

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

export default SizeFilter;