import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";
import categoryApi from "../../../../api/categoryApi";

const CategoryFilter = ({ selectedCategoryId, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryApi.getAllCategories();
      let filtered;
      if (selectedCategoryId) {
        filtered = response.data.filter(cat => cat.parent?.id === selectedCategoryId);
      } else {
        filtered = response.data.filter(cat => cat.parent === null);
      }
      setCategories(filtered);
    };

    fetchCategories();
  }, [selectedCategoryId]);

  const handleCategoryClick = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(i => i !== id))
    }
    else {
      setSelectedCategories(prev => [...prev, id])
    }

  }

  useEffect(() => {
    onCategoryChange(selectedCategories)
  }, [selectedCategories])
  return (
    <FilterBox title="Loại sản phẩm">
      {categories.map((cat) => (
        <li key={cat.id} className={styles.li}>
          <label className={styles.filterItem}>
            <input
              type="checkbox"
              className={styles.checkboxSmall}
              onChange={() => handleCategoryClick(cat.id)}
            />
            {cat.name}
          </label>
        </li>
      ))}
    </FilterBox>
  );
};

CategoryFilter.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
  onCategoryChange: PropTypes.func
};

export default CategoryFilter;