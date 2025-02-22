import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const FilterBox = ({ title, children }) => {
    return (
        <div className={styles.filter__box}>
            <h4>{title}</h4>
            <ul>{children}</ul>
        </div>
    );
};

FilterBox.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default FilterBox;
