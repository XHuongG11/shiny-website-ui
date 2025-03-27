import Banner from './components/Banner/Banner';
import Category from './components/Category/Category';
import FilterContainer from './components/Filter/FilterContainer';
import ProductContainer from './components/ProductContainer/ProductContainer';
import MoreProduct from './components/MoreProduct/MoreProduct';
import styles from './AllProduct.module.css';
import { Grid2 } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import { useEffect ,useState} from "react";
import productApi from "../../api/productApi";

const AllProduct = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const response = await productApi.getAllProducts({ params: { page: 1, size: 10 } });
            setProductList(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Grid2 container rowSpacing={2} sx={{ alignItems: "center", justifyContent: "center" }} direction="column">
            <Grid2 size={12}>
                <Banner />
            </Grid2>
            <Grid2 size={12} className={styles.headBreadcrumb}>
                <Breadcrumb currentPage="Nhẫn" />
                <p className={styles.results}>{loading ? "Đang tải..." : `${productList.length} Kết quả`}</p>
            </Grid2>
            <Grid2 size={11}>
                <Category />
            </Grid2>
            <Grid2 container size={11}>
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <FilterContainer />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }}>
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : (
                        
                        <ProductContainer products={productList} />
                    )}
                    <button className={styles.productShowmore}>Xem thêm</button>
                </Grid2>
            </Grid2>

            <Grid2 xs={11}>
                <MoreProduct />
            </Grid2>
        </Grid2>
    );
}

export default AllProduct;
