import { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Importing the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Notification from "../../components/Alert";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { Button, Grid2 } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalResetPassword from "./ModalResetPassword";
import Register from "./Register";
LoginRegister.propTypes = {};

function LoginRegister() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [emailLogin, setEmailLogin] = useState();
  const [dataRegister, setDataRegister] = useState();
  const [passwordLogin, setPasswordLogin] = useState();
  const [openResetPass, setOpenResetPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = useSelector((state) => state.email.loading);

  const handleRegisterClick = () => setIsRightPanelActive(true);
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
  const handleFormRegisterSubmit = async (value) => {
    try {
      console.log(value);
      const data = {
        username: value.username,
        password: value.password,
        email: value.email,
        phone: value.phone,
        fullName: value.fullName,
        dob: "",
        gender: "OTHER",
      };
      setDataRegister(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter your password"),
    phone: yup.string().required("Please enter your phonenumber"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
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
        {/* Register Form */}
        <div
          className={`${styles["form-container"]} ${styles["register-container"]}`}
        >
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormRegisterSubmit)}
          >
            <h1>Register here.</h1>
            <Grid2 container spacing={1.5}>
              <InputField control={control} name="fullName" label="Name" />
              <InputField control={control} name="username" label="Username" />
              <InputField control={control} name="email" label="Email" />
              <InputField control={control} name="phone" label="Phone" />
              <InputField control={control} name="password" label="Password" />
              <InputField
                control={control}
                name="confirmPassword"
                label="Confirm password"
              />
            </Grid2>
            {/* <button className={styles.button}>Register</button> */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#002b6b",
                color: "white",
                fontWeight: "bold",
                borderRadius: "999px",
                textTransform: "none",
                paddingX: 9,
                paddingY: 1.2,
                "&:hover": {
                  backgroundColor: "#001f4d",
                },
              }}
              type="submit"
              loading={loading}
              loadingPosition="start"
            >
              Register
            </Button>
          </form>
          {openModal && dataRegister && dataRegister?.email && (
            <Register customer={dataRegister} />
          )}
        </div>
        {/* Login Form */}
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
