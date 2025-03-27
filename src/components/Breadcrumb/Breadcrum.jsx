import PropTypes from "prop-types";
import styles from './breadcrumb.module.css';
Breadcrumb.propTypes = {
    currentPage: PropTypes.string.isRequired,
};

function Breadcrumb({ currentPage }) {
    return (
        <nav className={styles.breadcrumb}>
            <a href="/">Home</a> &gt; <span>{currentPage}</span>
        </nav>
    );
}

export default Breadcrumb;