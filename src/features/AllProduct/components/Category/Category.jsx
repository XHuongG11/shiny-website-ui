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
                // Lấy danh sách category cha
                const categoryResponse = await categoryApi.getAllCategories();
                const parentCategories = categoryResponse.data.filter(cat => cat.parent === null);
                // Cập nhật mỗi category với ảnh từ sản phẩm đầu tiên (nếu có)
                const updatedCategories = await Promise.all(parentCategories.map(async category => {
                    // Tìm sản phẩm trong category con
                    const childCategory = categoryResponse.data.find(cat => cat.parent && cat.parent.id === category.id);
                    const productResponse = await productApi.getProductsByCategory(childCategory.id, 1, 1);
                    if (productResponse.data && productResponse.data.content && productResponse.data.content.length > 0) {
                        const products = productResponse.data.content;
                        const firstProduct = products[0];
                        const image = firstProduct.images && firstProduct.images.length > 0
                            ? firstProduct.images[0].url // Lấy URL của ảnh đầu tiên
                            : '/image/allproduct/ring.jpg'; // Nếu không có ảnh, sử dụng ảnh mặc định
                        
                        return { ...category, image }; // Trả về category với imageUrl
                    } else {
                        console.log("No products found in this category.");
                        return { ...category, image: '/image/allproduct/ring.jpg' };
                    }
                }));
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
