import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid2, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import authApi from "../../api/authApi";
import Notification from "../../components/Alert";
import InputField from "../../components/InputField";
import ModalVerifyCode from "./ModalVerifyCode";
import { sendEmailRegister } from "./store/emailSlice";
import styles from "./styles.module.css"; // Importing the CSS module

Register.propTypes = {};

function Register() {
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [openVerifyModal, setOpenVerifyModal] = useState(true);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [expireAt, setExpireAt] = useState(0);
  const [customer, setCustomer] = useState(null);
  const loading = useSelector((state) => state.email.loading);
  const location = useLocation();
  const state = location.state;
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const sendEmail = async () => {
    const resultAction = await dispatch(sendEmailRegister(customer.email));
    if (sendEmailRegister.rejected.match(resultAction)) {
      console.log("aaaa");
      setMessage("Gửi mã xác thực thất bại.");
      setSeverity("error");
    }
    if (sendEmailRegister.fulfilled.match(resultAction)) {
      setExpireAt(resultAction.payload?.expiredAt);
      setOpenModal(true);
    }
  };
  const handleFormRegisterSubmit = async (value) => {
    console.log("value", value);
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
      setCustomer(data);
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
      email: state?.email,
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const verifyCode = async (code) => {
    try {
      const responseVerify = await authApi.verifyEmail({
        email: customer.email,
        code: code.join(""),
      });
      console.log(responseVerify.data);
      if (responseVerify.code === "200") {
        // đăng ký tài khoản dưới database
        const responseRegister = await authApi.createUser(customer);
        console.log(responseRegister.data);
        // notify register successfully
        setMessage("Đăng ký thành công.");
        setSeverity("success");
        setOpenNotification(true);
        setOpenVerifyModal(false);
        // đợi 2s, chuyển về login
        setTimeout(() => {
          navigate(from);
        }, 2000);
      } else {
        // notify verify failed
        setMessage("Xác thực thất bại.");
        setSeverity("error");
        setOpenNotification(true);
      }
    } catch (error) {
      console.log(error);
      setMessage("Đăng ký thất bại");
      setSeverity("error");
      setOpenNotification(true);
      setOpenVerifyModal(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (customer != null) {
        await sendEmail(customer.email);
        setOpenModal(true);
      }
    };
    fetchData();
  }, [customer]);
  useEffect(() => {
    if (state?.email) {
      setMessage(state?.message);
      setSeverity("error");
      setOpenNotification(true);
    }
  }, []);
  return (
    <>
      {openNotification && (
        <Notification
          message={message}
          open={openNotification}
          severity={severity}
          setOpen={setOpenNotification}
          variant="filled"
        />
      )}
      {openModal && (
        <ModalVerifyCode
          expireAt={expireAt}
          verifyCode={verifyCode}
          sendEmail={sendEmail}
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
          messageNotification={message}
          typeNotification={severity}
          openVerifyModal={openVerifyModal}
          typeModal="REGISTER"
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: "auto",
          },
          padding: 3,
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleFormRegisterSubmit)}
          >
            <h1>Register here</h1>
            <Grid2 container spacing={2} justifyContent={"center"}>
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
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#002b6b",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  textTransform: "none",
                  px: 5,
                  py: 1.2,
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
            </Grid2>
          </form>
        </Paper>
      </Box>

      {/* {openModal && dataRegister && dataRegister?.email && (
        <Register customer={dataRegister} />
      )} */}
    </>
  );
}
// Register.propTypes = {
//   customer: propsType.object.isRequired,
// };
export default Register;
