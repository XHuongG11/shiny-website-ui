import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import styles from "./DropdownMenu.module.css";
import { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";

export default function DropdownMenu() {
  const [parentCategories, setParentCatgories] = useState([]);
  const [categories, setCategories] = useState([]);
  const getParentCategories = async () => {
    try {
      const resp = await categoryApi.getAllCategories();
      setCategories(resp.data);
      const parentCategories = resp.data.filter((cat) => cat.parent === null);
      console.log(resp.data);
      setParentCatgories(parentCategories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getParentCategories();
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownMenu}>
        <a href="/products" style={{ fontWeight: "bold" }}>
          Products <ChevronRightRoundedIcon />
        </a>
        <a href="#">
          Collections <ChevronRightRoundedIcon />
        </a>
      </div>
      <div className={styles.dropdownMenuChild}>
        <div className={styles.subDropdownWrapper}>
          {parentCategories.map((category) => {
            // Tìm danh mục con
            const childCategory = categories.filter(
              (cat) => cat.parent?.id === category.id
            );
            console.log("childCategory", childCategory);

            return (
              <div key={category.id} className={styles.subDropdownColumn}>
                <h4>{category.name}</h4>
                {childCategory.length > 0
                  ? childCategory.map((element) => (
                      <a href="#" key={element.id}>
                        {element.name}
                      </a>
                    ))
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
