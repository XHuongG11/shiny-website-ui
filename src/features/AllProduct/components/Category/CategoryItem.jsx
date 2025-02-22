import styles from './Category.module.css';
import PropTypes from 'prop-types';

const CategoryItem = ({ imageSrc, name }) => {
    return (
        <div className={styles.catagory__item}>
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
};

export default CategoryItem;