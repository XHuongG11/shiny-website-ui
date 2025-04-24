import propsType from "prop-types";
import { useEffect, useState } from "react";
import authApi from "../../api/authApi";
import ModalVerifyCode from "./ModalVerifyCode";
import { useDispatch } from "react-redux";
import { sendEmailRegister } from "./store/emailSlice";
Register.propTypes = {};

function Register({ customer }) {
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const [openVerifyModal, setOpenVerifyModal] = useState(true);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [expireAt, setExpireAt] = useState(0);

  const sendEmail = async () => {
    const resultAction = await dispatch(sendEmailRegister(customer.email));
    if (sendEmailRegister.rejected.match(resultAction)) {
      setMessage("Gửi mã xác thực thất bại.");
      setSeverity("error");
    }
    if (sendEmailRegister.fulfilled.match(resultAction)) {
      setExpireAt(resultAction.payload?.expiredAt);
      setOpenModal(true);
    }
  };
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
    sendEmail();
  }, []);

  return (
    <>
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
    </>
  );
}
Register.propTypes = {
  customer: propsType.object.isRequired,
};
export default Register;
