import { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Importing the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Notification from "../../components/Alert";
import ModalResetPassword from "./ModalResetPassword";
LoginRegister.propTypes = {};

function LoginRegister() {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [emailLogin, setEmailLogin] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [openResetPass, setOpenResetPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterClick = () => navigate("/register");
  const handleLoginClick = () => setIsRightPanelActive(false);
  const handleClickForgot = () => {
    setOpenResetPass(true);
  };
  const handleCloseForgot = () => {
    setOpenResetPass(false);
  };
  // handle chuyển trang
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  }, [navigate, shouldRedirect]);

  const handleFormLoginSubmit = async () => {
    try {
      const data = {
        email: emailLogin,
        password: passwordLogin,
        role: "CUSTOMER",
      };
      const action = await dispatch(login(data));
      unwrapResult(action);

      setShouldRedirect(true);
    } catch (error) {
      setError(true);

      if (error.code === "ERR_BAD_REQUEST") {
        setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng");
      } else {
        setErrorMessage(error.message);
      }
      console.log(error);
    }
  };

  return (
    <div className={styles.body}>
      {error && (
        <Notification
          severity="error"
          message={errorMessage}
          open={error}
          setOpen={setError}
          variant="filled"
        />
      )}
      <div
        className={`${styles.container} ${
          isRightPanelActive ? styles["right-panel-active"] : ""
        }`}
        id="container"
      >
        <div
          className={`${styles["form-container"]} ${styles["login-container"]}`}
        >
          <form className={styles.form}>
            <h1>Login here.</h1>

            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setEmailLogin(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPasswordLogin(event.target.value)}
            />
            <div className={styles.content}>
              <div className={styles.checkbox}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember me</label>
              </div>
              <div className={styles["pass-link"]}>
                <Link href="" onClick={handleClickForgot}>
                  Forgot password?
                </Link>
              </div>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={handleFormLoginSubmit}
            >
              Login
            </button>
            <span>or use your account</span>
            <div className={styles["social-container"]}>
              <Link
                to="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=704590983800-2nahpu6ac7oura3nv2ajo2suruahrr11.apps.googleusercontent.com&scope=profile%20email&state=-lRQDRwUy7N4eye0o8p1ArJ_vlA_t0oPAHQyJJOPvZY%3D&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Foauth2%2Fredirect&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow"
                className={styles.social}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </Link>
            </div>
          </form>
        </div>
        {/* Overlay Section */}
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
            >
              <h1 className={styles.title}>
                Hello <br /> friends
              </h1>
              <p>If you have an account, login here and have fun</p>
              <button
                className={`${styles.button} ${styles.ghost}`}
                onClick={handleLoginClick}
              >
                Login
                <i className="lni lni-arrow-left login"></i>
              </button>
            </div>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <h1 className={styles.title}>
                Your money <br /> your choice
              </h1>
              <p>
                If you don&apos;t have an account yet, join us and increase your
                beauty.
              </p>
              <button
                className={`${styles.button} ${styles.ghost}`}
                onClick={handleRegisterClick}
              >
                Register
                <i className="lni lni-arrow-right register"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {openResetPass && (
        <ModalResetPassword
          open={openResetPass}
          handleClose={handleCloseForgot}
        />
      )}
    </div>
  );
}

export default LoginRegister;
