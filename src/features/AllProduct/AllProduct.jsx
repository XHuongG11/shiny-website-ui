import Banner from './components/Banner/Banner';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import Category from './components/Category/Category';
import FilterContainer from './components/Filter/FilterContainer';
import ProductContainer from './components/ProductContainer/ProductContainer';
import MoreProduct from './components/MoreProduct/MoreProduct';
import styles from './AllProduct.module.css';

const AllProduct = () => {
    return (
    <div className={styles.container}>
            <Banner />
            <div className={styles.grid}>
                <Breadcrumb />
                <Category />
                <div className={styles.gridRow}>
                    <div className={styles.gridColumn1}>
                        <FilterContainer />
                    </div>
                    <div className={styles.gridColumn3}>
                        <ProductContainer />
                        <button className={styles.productShowmore}>Xem thêm</button>
                    </div>
                </div>
                <div className={styles.gridRow}>
                    <MoreProduct />
                </div>
            </div>
        </div>
  )
}

export default AllProduct;
