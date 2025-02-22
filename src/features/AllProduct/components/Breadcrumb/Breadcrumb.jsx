import styles from './Breadcrumb.module.css';

const Breadcrumb = () => {
    return (
        <div className={styles.headBreadcrumb}>
            <nav className={styles.breadcrumb}>
                <a href="index.html">Home</a> &gt; <span>Nhẫn</span>
            </nav>
            <p className={styles.results}>200 Results</p>
        </div>
    );
};

export default Breadcrumb;
