import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";
import categoryApi from "../../../../api/categoryApi"; // Cập nhật path nếu khác

const CategoryFilter = ({ selectedCategoryId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        let filtered;
        if (selectedCategoryId) {
          filtered = response.data.filter(cat => cat.parent?.id === selectedCategoryId);
        } else {
          filtered = response.data.filter(cat => cat.parent === null);
        }
        setCategories(filtered);
      } catch (error) {
        console.error("Lỗi khi tải category:", error);
      }
    };

    fetchCategories();
  }, [selectedCategoryId]);

  return (
    <FilterBox title="Loại sản phẩm">
      {categories.map((cat) => (
        <li key={cat.id}>
          <input type="checkbox" className={styles.checkboxSmall} />
          {cat.name}
        </li>
      ))}
    </FilterBox>
  );
};

CategoryFilter.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
};

export default CategoryFilter;
