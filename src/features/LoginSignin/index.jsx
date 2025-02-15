import { useState } from 'react';
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

LoginRegister.propTypes = {

};

function LoginRegister() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleRegisterClick = () => setIsRightPanelActive(true);
    const handleLoginClick = () => setIsRightPanelActive(false);
    return (
        <div className='body'>
            <div
                className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
                id="container"
            >
                {/* Register Form */}
                <div className="form-container register-container">
                    <form className="form">
                        <h1>Register here.</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button className='button'>Register</button>
                        <span>or use your account</span>
                        <div className="social-container">
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Login Form */}
                <div className="form-container login-container">
                    <form className="form">
                        <h1>Login here.</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <div className="content">
                            <div className="checkbox">
                                <input type="checkbox" id="checkbox" />
                                <label htmlFor="checkbox">Remember me</label>
                            </div>
                            <div className="pass-link">
                                <Link href="#">Forgot password?</Link>
                            </div>
                        </div>
                        <button className='button' type="submit">Login</button>
                        <span>or use your account</span>
                        <div className="social-container">
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </Link>
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                            <Link to="#" className="social">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </div>
                    </form>
                </div >

                {/* Overlay Section */}
                < div className="overlay-container" >
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="title">
                                Hello <br /> friends
                            </h1>
                            <p>If you have an account, login here and have fun</p>
                            <button className="button ghost" onClick={handleLoginClick}>
                                Login
                                <i className="lni lni-arrow-left login"></i>
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="title">
                                Your money <br /> your choice
                            </h1>
                            <p>
                                If you don&apos;t have an account yet, join us and increase your
                                beauty.
                            </p>
                            <button className="button ghost" onClick={handleRegisterClick}>
                                Register
                                <i className="lni lni-arrow-right register"></i>
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
}

export default LoginRegister;