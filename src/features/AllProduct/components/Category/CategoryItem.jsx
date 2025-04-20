import styles from './Category.module.css';
import PropTypes from 'prop-types';

const CategoryItem = ({ imageSrc, name, onClick }) => {
    return (
        <div className={styles.catagory__item}  onClick={onClick}>
            <div className={styles.catagory__itemImage}>
                <img src={imageSrc} alt={name} />
            </div>
            <p className={styles.catagory__itemName}>{name}</p>
        </div>
    );
};

CategoryItem.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default CategoryItem;