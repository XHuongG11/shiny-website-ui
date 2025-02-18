import styles from './Newsletter.module.css';

const Newsletter = () => {
    return (
        <div className={styles.newsletterContainer}>
            <div className={styles.newsletterText}>
                <h2>Get the Latest From ANITA</h2>
                <p>Be the first to hear about new arrivals, promotions, style inspiration and exclusive sneak peeks.</p>
            </div>
            <form className={styles.newsletterForm}>
                <input type="email" placeholder="Enter email address" required />
                <button type="submit">SIGN UP</button>
            </form>
        </div>
    );
};

export default Newsletter;
