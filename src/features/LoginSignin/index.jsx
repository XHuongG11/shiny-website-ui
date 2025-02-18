import { useState } from 'react';
import styles from './styles.module.css'; // Importing the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

LoginRegister.propTypes = {};

function LoginRegister() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleRegisterClick = () => setIsRightPanelActive(true);
    const handleLoginClick = () => setIsRightPanelActive(false);

    return (
        <div className={styles.body}>
            <div
                className={`${styles.container} ${isRightPanelActive ? styles['right-panel-active'] : ''}`}
                id="container"
            >
                {/* Register Form */}
                <div className={`${styles['form-container']} ${styles['register-container']}`}>
                    <form className={styles.form}>
                        <h1>Register here.</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button className={styles.button}>Register</button>
                        <span>or use your account</span>
                        <div className={styles['social-container']}>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Login Form */}
                <div className={`${styles['form-container']} ${styles['login-container']}`}>
                    <form className={styles.form}>
                        <h1>Login here.</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <div className={styles.content}>
                            <div className={styles.checkbox}>
                                <input type="checkbox" id="checkbox" />
                                <label htmlFor="checkbox">Remember me</label>
                            </div>
                            <div className={styles['pass-link']}>
                                <Link href="#">Forgot password?</Link>
                            </div>
                        </div>
                        <button className={styles.button} type="submit">Login</button>
                        <span>or use your account</span>
                        <div className={styles['social-container']}>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#" className={styles.social}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Overlay Section */}
                <div className={styles['overlay-container']}>
                    <div className={styles.overlay}>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1 className={styles.title}>
                                Hello <br /> friends
                            </h1>
                            <p>If you have an account, login here and have fun</p>
                            <button className={`${styles.button} ${styles.ghost}`} onClick={handleLoginClick}>
                                Login
                                <i className="lni lni-arrow-left login"></i>
                            </button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                            <h1 className={styles.title}>
                                Your money <br /> your choice
                            </h1>
                            <p>
                                If you don&apos;t have an account yet, join us and increase your
                                beauty.
                            </p>
                            <button className={`${styles.button} ${styles.ghost}`} onClick={handleRegisterClick}>
                                Register
                                <i className="lni lni-arrow-right register"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
