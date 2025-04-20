import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import styles from "./Filter.module.css";
import categoryApi from "../../../../api/categoryApi"; // Cập nhật path nếu khác

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        const parentCategories = response.data.filter(cat => cat.parent === null);
        setCategories(parentCategories);
      } catch (error) {
        console.error("Lỗi khi tải category:", error);
      }
    };

    fetchCategories();
  }, []);

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

export default CategoryFilter;
