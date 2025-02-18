import styles from './GiftGuide.module.css';

const GiftGuide = () => {
    return (
        <div className={styles.giftGuide}>
            <img className={styles.img} src="img/giftImg/gift.png" alt="Gift Guide" />
            <div className={styles.text}>
                <h3>Gift Guide</h3>
                <p>The definitive selection to celebrate in style</p>
            </div>
        </div>
    );
};

export default GiftGuide;
