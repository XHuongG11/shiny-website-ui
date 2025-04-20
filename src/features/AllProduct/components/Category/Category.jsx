import CategoryItem from './CategoryItem';
import styles from './Category.module.css';
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryApi from '../../../../api/categoryApi';
import productApi from '../../../../api/productApi';

const Category = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // Lay danh sach category cha
                const categoryResponse = await categoryApi.getAllCategories();
                const parentCategories = categoryResponse.data.filter(cat => cat.parent === null);
                
                // Lay 1000 san pham dau tien de lay hinh
                const productResponse = await productApi.getAllProducts({ params: { size: 1000 } });
                const products = productResponse.data.content;

                // Cập nhật mỗi category với ảnh từ sản phẩm đầu tiên (nếu có)
                const updatedCategories = parentCategories.map(category => {
                    // Tìm sản phẩm trong category con
                    // Vì id category trong product là cac id category con nen lay id category con bat ki(dau tien)
                    const childCategory = categoryResponse.data.find(cat => cat.parent && cat.parent.id === category.id);
                    const filteredProducts = childCategory 
                        ? products.filter(product => product.category.id === childCategory.id) 
                        : [];
                    // Chọn ảnh của sản phẩm đầu tiên trong danh sách lọc được
                    const firstProduct = filteredProducts.length > 0 ? filteredProducts[0] : null;
                    const image = firstProduct?.images?.[0]?.url || '/image/allproduct/ring.jpg';

                    return { ...category, image };
                });

                setCategories(updatedCategories);
            } catch (error) {
                console.error("Lỗi khi tải categories và images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Đang tải danh mục...</div>;
    }

    return (
        <div className={styles.catagory}>
            {categories.map(category => (
                <CategoryItem
                    key={category.id}
                    imageSrc={category.image}
                    name={category.name}
                    onClick={() => onCategorySelect(category.id)}
                />
            ))}
        </div>
    );
};

Category.propTypes = {
    onCategorySelect: PropTypes.func.isRequired,
};

export default Category;
