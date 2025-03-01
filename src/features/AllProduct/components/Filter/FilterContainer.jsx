import FilterBox from "./FilterBox";
import silverMaterial from "/image/allproduct/silver-material.png";
import goldMaterial from "/image/allproduct/gold-material.png";
import roesgoldMaterial from "/image/allproduct/rose-gold-material.png";
import styles from "./Filter.module.css";

const FilterContainer = () => {
  return (
    <div className={styles.filterContainer}>
      {/* Loại sản phẩm */}
      <FilterBox title="Loại sản phẩm">
        <li>
          <input type="checkbox" id="charms" className={styles.checkboxSmall} />
          Charms (23)
        </li>
        <li><input className={styles.checkboxSmall} type="checkbox" /> Lắc tay (58)</li>
        <li><input type="checkbox" className={styles.checkboxSmall} /> Nhẫn (156)</li>
        <li><input type="checkbox" className={styles.checkboxSmall} /> Vòng tay (42)</li>
        <li><input type="checkbox" className={styles.checkboxSmall} /> Hoa tai (127)</li>
      </FilterBox>
      {/* Chất liệu */}
      <FilterBox title="Chất liệu">
        <li>
          <div className={styles.filterMaterial}>
            <img className={styles.productMaterial} src={silverMaterial} alt="Bạc" />
            <label> Bạc (23)</label>
          </div>
        </li>
        <li>
          <div className={styles.filterMaterial}>
            <img className={styles.productMaterial} src={goldMaterial} alt="Vàng hồng" />
            <label> Vàng hồng (156)</label>
          </div>
        </li>
        <li>
          <div className={styles.filterMaterial}>
            <img className={styles.productMaterial} src={roesgoldMaterial} alt="Vàng" />
            <label> Vàng (58)</label>
          </div>
        </li>
      </FilterBox>

      {/* Size */}
      <FilterBox title="Size">
        <div className={styles.filterSize}>
          {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((size) => (
            <button key={size} className={styles.filterSizeNumber}>{size}</button>
          ))}
        </div>
      </FilterBox>

      {/* Mức giá */}
      <FilterBox title="Mức giá">
        <li><input type="checkbox" name="price" value="under-1m" className={styles.checkboxSmall} /> Dưới 1.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="1m-2m" className={styles.checkboxSmall} /> 1.000.000 - 2.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="2m-3m" className={styles.checkboxSmall} /> 2.000.000 - 3.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="3m-5m" className={styles.checkboxSmall} /> 3.000.000 - 5.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="above-5m" className={styles.checkboxSmall} /> Trên 5.000.000 VNĐ</li>
      </FilterBox>
    </div>
  );
};

export default FilterContainer;
