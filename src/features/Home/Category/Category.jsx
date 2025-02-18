import styles from './Category.module.css';

const categories = [
    { img: 'img/productTypeImg/newin.png', name: 'NEW IN' },
    { img: 'img/productTypeImg/charms.png', name: 'CHARMS' },
    { img: 'img/productTypeImg/bracelets.png', name: 'BRACELETS' },
    { img: 'img/productTypeImg/rings.png', name: 'RINGS' },
    { img: 'img/productTypeImg/earrings.png', name: 'EARRINGS' },
    { img: 'img/productTypeImg/necklaces.png', name: 'NECKLACES' }
];

const Category = () => {
    return (
<div className={styles.categoryContainer}>
            {categories.map((category, index) => (
                <div key={index} className={styles.category}>
                    <img src={category.img} alt={category.name} />
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Category;