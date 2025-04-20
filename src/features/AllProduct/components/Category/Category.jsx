import CategoryItem from './CategoryItem';
import styles from './Category.module.css';
import { useEffect ,useState} from "react";
import categoryApi from '../../../../api/categoryApi';
// tam thoi
import ringImage from '/image/allproduct/ring.jpg';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getAllCategories();
                const parentCategories = response.data.filter(cat => cat.parent === null);
                console.log("Dữ liệu categories:", parentCategories);
                setCategories( parentCategories);
            } catch (error) {
                console.error("Lỗi khi tải categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={styles.catagory}>
            {categories.map((category, index) => (
                <CategoryItem key={index} imageSrc={ringImage} name={category.name} />
            ))}
        </div>
    );
};

export default Category;

