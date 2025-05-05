import FilterBox from "./FilterBox";
import silverMaterial from "/image/allproduct/material_silver.png";
import whiteGoldMaterial from "/image/allproduct/material_white_gold.png";
import gold10KMaterial from "/image/allproduct/material_gold10k.png";
import gold18KMaterial from "/image/allproduct/material_gold18k.png";
import gold24KMaterial from "/image/allproduct/material_gold24k.png";
import platinumKMaterial from "/image/allproduct/material_platinum.png";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";

const MaterialFilter = ({ selectedMaterial, onMaterialChange }) => {
    const materials = [
        { name: "Bạc", img: silverMaterial },
        { name: "Vàng trắng", img: whiteGoldMaterial },
        { name: "Vàng 10K", img: gold10KMaterial },
        { name: "Vàng 18K", img: gold18KMaterial },
        { name: "Vàng 24K", img: gold24KMaterial },
        { name: "Bạch kim", img: platinumKMaterial },
    ];

    const handleMaterialChange = (material) => {
        onMaterialChange(selectedMaterial === material ? null : material);
    };

    return (
        <FilterBox title="Chất liệu">
            {materials.map((material) => (
                <li className={styles.li} key={material.name}>
                <label className={styles.filterItem}>
                    <input
                    type="checkbox"
                    className={styles.checkboxSmall}
                    checked={selectedMaterial === material.name}
                    onChange={() => handleMaterialChange(material.name)}
                    />
                    <img
                    className={styles.productMaterial}
                    src={material.img}
                    alt={material.name}
                    />
                    <span className={styles.productMaterialname}>{material.name}</span>
                </label>
                </li>
            ))}
            </FilterBox>
    );
};

MaterialFilter.propTypes = {
    selectedMaterial: PropTypes.string,
    onMaterialChange: PropTypes.func.isRequired,
};

export default MaterialFilter;