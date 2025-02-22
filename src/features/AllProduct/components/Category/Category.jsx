import CategoryItem from './CategoryItem';
import styles from './Category.module.css';

import ringImage from '/image/allproduct/ring.jpg';

const Category = () => {
    const categories = [
        { imageSrc: ringImage, name: "Nhẫn bạc" },
        { imageSrc: ringImage, name: "Nhẫn bạc" },
        { imageSrc: ringImage, name: "Nhẫn bạc" },
        { imageSrc: ringImage, name: "Nhẫn bạc" },
        { imageSrc: ringImage, name: "Nhẫn bạc" },
    ];

    return (
        <div className={styles.catagory}>
            {categories.map((category, index) => (
                <CategoryItem key={index} imageSrc={category.imageSrc} name={category.name} />
            ))}
        </div>
    );
};

export default Category;
