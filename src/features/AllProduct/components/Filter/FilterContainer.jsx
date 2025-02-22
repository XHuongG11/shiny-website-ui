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
          <input type="checkbox" id="charms" />
          Charms (23)
        </li>
        <li><input type="checkbox" /> Lắc tay (58)</li>
        <li><input type="checkbox" /> Nhẫn (156)</li>
        <li><input type="checkbox" /> Vòng tay (42)</li>
        <li><input type="checkbox" /> Hoa tai (127)</li>
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
        <li><input type="checkbox" name="price" value="under-1m" /> Dưới 1.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="1m-2m" /> 1.000.000 - 2.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="2m-3m" /> 2.000.000 - 3.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="3m-5m" /> 3.000.000 - 5.000.000 VNĐ</li>
        <li><input type="checkbox" name="price" value="above-5m" /> Trên 5.000.000 VNĐ</li>
      </FilterBox>
    </div>
  );
};

export default FilterContainer;
