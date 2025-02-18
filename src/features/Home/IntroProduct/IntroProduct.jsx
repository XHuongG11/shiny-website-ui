import styles from './IntroProduct.module.css';

const IntroProduct = () => {
    return (
        <div className={styles.introProduct}>
            <div className={styles.introText}>
                <h2>100% Gold</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Dolor et volutpat in non. 
                    Luctus sit libero urna viverra sed non dui elementum. Dolor et volutpat 
                    in non. Luctus sit libero urna viverra.
                </p>
            </div>
            <img className={styles.img} src="img/introImg/intro.png" alt="Intro Product" />
        </div>
    );
};

export default IntroProduct;
