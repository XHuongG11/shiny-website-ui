import Banner from './components/Banner/Banner';
import Category from './components/Category/Category';
import FilterContainer from './components/FilterContainer/FilterContainer';
import ProductContainer from './components/ProductContainer/ProductContainer';
import MoreProduct from './components/MoreProduct/MoreProduct';
import styles from './AllProduct.module.css';
import { Grid2 } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/breadcrum';
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { useLocation, useNavigate } from "react-router-dom";

const AllProduct = () => {
    const location = useLocation();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null); // Thêm state xử lý lỗi
    const pageSize = 21;
    const [searchQuery, setSearchQuery] = useState("");
    // State cho các bộ lọc
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterMaterial, setFilterMaterial] = useState(null);
    const [filterMinPrice, setFilterMinPrice] = useState(null);
    const [filterMaxPrice, setFilterMaxPrice] = useState(null);
    const [filterSizes, setFilterSizes] = useState([]);

    // Lấy từ khóa tìm kiếm từ URL
    useEffect(() => {
        const query = new URLSearchParams(location.search).get("query");
        console.log("Search query from URL:", query);
        setSearchQuery(query || "");
        setPage(1);
        setProductList([]);
        setError(null);
    }, [location.search]);

    const navigate = useNavigate();

    const fetchProducts = async (currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const params = { page: currentPage, size: pageSize };
            if (selectedCategoryId) {
                params.categoryId = selectedCategoryId;
            }
            if (searchQuery) {
                params.title = searchQuery;
            }
            if (filterCategories.length > 0) {
                params.categories = filterCategories;
            }
            if (filterMaterial) {
                params.material = filterMaterial;
            }
            if (filterMinPrice !== null) {
                params.minPrice = filterMinPrice;
            }
            if (filterMaxPrice !== null) {
                params.maxPrice = filterMaxPrice;
            }
            if (filterSizes.length > 0) {
                params.productSizes = filterSizes;
            }

            console.log("API params:", params);
            // Luôn gọi API search-and-filter để hỗ trợ cả tìm kiếm và lọc
            const response = await productApi.searchAndFilterProducts({ params });

            // set url
            const newParams = { ...params };
            delete newParams.page;
            delete newParams.size;
          
            const queryString = new URLSearchParams(newParams).toString();
            console.log(queryString)
            // navigate(`?${queryString}`, { replace: true });

            console.log("Dữ liệu API trả về:", response.data);
            const products = response.data.content || [];
            setProductList(prev => [...prev, ...products]);
            setTotalPages(response.data.totalPages || 1);
            if (products.length === 0 && currentPage === 1) {
                setError("Không tìm thấy sản phẩm nào.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Đã xảy ra lỗi khi tải sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchProducts khi page hoặc bất kỳ bộ lọc nào thay đổi
    useEffect(() => {
        fetchProducts(page);
    }, [page, selectedCategoryId, searchQuery, filterCategories, filterMaterial, filterMinPrice, filterMaxPrice, filterSizes]);

    const handleCategorySelect = (categoryId) => {
        console.log("Đã chọn category có ID:", categoryId);
        setSelectedCategoryId(categoryId);

        setFilterCategories([categoryId])
      
        setPage(1);
        setProductList([]);
        setError(null);
    };

    const handleShowMore = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };
    // Hàm xử lý thay đổi bộ lọc
    const handleFilterChange = (filterType, value) => {
        setPage(1);
        setProductList([]);
        setError(null);
        switch (filterType) {
            case 'categories':
                setFilterCategories(value);
                break;
            case 'material':
                setFilterMaterial(value);
                break;
            case 'minPrice':
                setFilterMinPrice(value);
                break;
            case 'maxPrice':
                setFilterMaxPrice(value);
                break;
            case 'sizes':
                setFilterSizes(value);
                break;
            default:
                break;
        }
    };

    return (
        <Grid2 container rowSpacing={2} sx={{ alignItems: "center", justifyContent: "center" }} direction="column">
            <Grid2 size={12}>
                <Banner />
            </Grid2>
            <Grid2 size={12} className={styles.headBreadcrumb}>
                <Breadcrumb currentPage={searchQuery ? `Tìm kiếm: ${searchQuery}` : "Nhẫn"} />
                <p className={styles.results}>
                    {loading && productList.length === 0
                        ? "Đang tải..."
                        : `${productList.length} Kết quả`}
                </p>
            </Grid2>
            <Grid2 size={10}>
                <Category onCategorySelect={handleCategorySelect} />
            </Grid2>
            <Grid2 container size={10}>
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <FilterContainer
                        selectedCategoryId={selectedCategoryId}
                        onFilterChange={handleFilterChange}
                        filterCategories={filterCategories}
                        filterMaterial={filterMaterial}
                        filterMinPrice={filterMinPrice}
                        filterMaxPrice={filterMaxPrice}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }}>
                    {loading && productList.length === 0 ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : productList.length === 0 ? (
                        <p>Không tìm thấy sản phẩm nào.</p>
                    ) : (
                        <ProductContainer products={productList} />
                    )}
                    {page < totalPages && !error && (
                        <button onClick={handleShowMore} className={styles.productShowmore}>
                            {loading ? "Đang tải thêm..." : "Xem thêm"}
                        </button>
                    )}
                </Grid2>
            </Grid2>
            <Grid2 xs={11}>
                <MoreProduct />
            </Grid2>
        </Grid2>
    );
};

export default AllProduct;