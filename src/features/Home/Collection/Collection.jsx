import styles from './Collection.module.css';

const collections = [
    { img: 'img/collectionImg/collection1.png', title: 'Sweet Valentine', link: '#' },
    { img: 'img/collectionImg/collection2.png', title: 'Eternal Beauty', link: '#' },
    { img: 'img/collectionImg/collection3.png', title: 'Personal Identity', link: '#' },
    { img: 'img/collectionImg/collection4.png', title: 'Disney x Pandora', link: '#' }
];

const Collection = () => {
    return (
        <div>
            <h1 className={styles.h1}>COLLECTION</h1>
            <div className={styles.collection}>
                {collections.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <img src={item.img} alt={item.title} />
                        <div className={styles.textC}>
                            <h3>{item.title}</h3>
                            <a href={item.link}>LOOK NOW</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;