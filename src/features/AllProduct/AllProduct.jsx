import Banner from './components/Banner/Banner';
import Category from './components/Category/Category';
import FilterContainer from './components/Filter/FilterContainer';
import ProductContainer from './components/ProductContainer/ProductContainer';
import MoreProduct from './components/MoreProduct/MoreProduct';
import styles from './AllProduct.module.css';
import { Grid2 } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';

const AllProduct = () => {
    return (
        <Grid2 container rowSpacing={2} sx={{ alignItems: "center", justifyContent: "center" }} direction="column">
            <Grid2 size={12}>
                <Banner />
            </Grid2>
            <Grid2 size={12} className={styles.headBreadcrumb}>
                <Breadcrumb currentPage="Nhẫn" />
                <p className={styles.results}>200 Results</p>
            </Grid2>
            <Grid2 size={11}>
                <Category />
            </Grid2>
            <Grid2 container size={11}>
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <FilterContainer />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }}>
                    <ProductContainer />
                    <button className={styles.productShowmore}>Xem thêm</button>
                </Grid2>
            </Grid2>

            <Grid2 xs={11}>
                <MoreProduct />
            </Grid2>
        </Grid2 >
    )
}

export default AllProduct;
