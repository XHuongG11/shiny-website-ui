import { Box, Button, Grid2, Modal, TextField } from "@mui/material";
import propsType from "prop-types";
import { useEffect, useRef, useState } from "react";
import authApi from "../../api/authApi";
import Notification from "../../components/Alert";
ModalVerifyCode.propTypes = {};

function ModalVerifyCode({ customer }) {
  const [open, setOpen] = useState(true);
  const [expiresAt, setExpireAt] = useState();
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState();
  const [severity, setSeverity] = useState();
  const inputRefs = useRef([]);
  const [code, setCode] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (expiresAt) {
      const interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((expiresAt - Date.now()) / 1000)
        );
        setTimeLeft(remaining);
        if (remaining === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
    inputRefs.current[0]?.focus();
  }, [expiresAt]);

  function handleCodeChange(event, index) {
    const value = event.target.value;
    if (value.length > 1) {
      inputRefs.current[index].value = code[index];
      return;
    }

    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 1 && index === 3) {
      console.log(code.join(""));
    }
  }
  function handleKeyDown(event, index) {
    if (event.key === "Backspace") {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[index] = "";
        return newCode;
      });
      inputRefs.current[index].value = "";
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      event.preventDefault();
    }
  }
  const sendEmail = async () => {
    try {
      const response = await authApi.sendEmail({ email: customer.email });
      setExpireAt(response.data.expiresAt);
    } catch (error) {
      console.log(error);
      setMessage("Gửi mã xác thực thất bại.");
      setSeverity("error");
      setOpenNotification(true);
    }
  };
  const verifyCode = async () => {
    try {
      console.log("CODE: " + code.join(""));
      console.log("CUSTOMER:", JSON.stringify(customer));
      console.log("CUSTOMER:", customer.email);
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
        setOpen(false);
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
      setOpen(false);
    }
  };
  useEffect(() => {
    sendEmail();
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
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            paddingTop: "0px",
            paddingBottom: "20px",
          }}
        >
          <h2>Nhập code</h2>
          <Grid2
            container
            spacing={2}
            justifyContent="center"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              marginBottom: "20px",
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid2 item key={index}>
                <TextField
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  variant="outlined"
                  onChange={(event) => handleCodeChange(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  inputProps={{
                    style: { textAlign: "center" }, // Center the text inside the input
                  }}
                  sx={{
                    textAlign: "center",
                    width: "80px",
                    height: "60px",
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
          <Grid2
            container
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {timeLeft > 0 ? (
              <Button variant="outlined" color="success" disabled>
                Gửi lại ({timeLeft})
              </Button>
            ) : (
              <Button variant="outlined" color="success" onClick={sendEmail}>
                Gửi lại ({timeLeft})
              </Button>
            )}

            <Button
              type="button"
              variant="contained"
              color="success"
              sx={{ color: "white" }}
              onClick={verifyCode}
            >
              Xác nhận
            </Button>
          </Grid2>
        </Box>
      </Modal>
    </>
  );
}
ModalVerifyCode.propTypes = {
  customer: propsType.object.isRequired,
};
export default ModalVerifyCode;
