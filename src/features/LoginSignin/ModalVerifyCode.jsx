import { Box, Button, Grid2, Modal, TextField } from "@mui/material";
import propsType from "prop-types";
import { useEffect, useRef, useState } from "react";
import Notification from "../../components/Alert";

function ModalVerifyCode({
  expireAt,
  verifyCode,
  sendEmail,
  openNotification,
  setOpenNotification,
  messageNotification,
  typeNotification,
  openVerifyModal,
  typeModal,
}) {
  const inputRefs = useRef([]);
  const [code, setCode] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    console.log("expiresAt ", expireAt);
    if (expireAt) {
      const interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((expireAt - Date.now()) / 1000)
        );
        setTimeLeft(remaining);
        if (remaining === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
    inputRefs.current[0]?.focus();
  }, [expireAt]);

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
  return (
    <>
      {openNotification && (
        <Notification
          message={messageNotification}
          open={openNotification}
          severity={typeNotification}
          setOpen={setOpenNotification}
          variant="filled"
        />
      )}
      <Modal
        open={openVerifyModal}
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
            {timeLeft > 0 && typeModal === "REGISTER" ? (
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
              onClick={() => verifyCode(code)}
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
  expireAt: propsType.number.isRequired,
  verifyCode: propsType.func.isRequired,
  sendEmail: propsType.func.isRequired,
  setOpenNotification: propsType.func.isRequired,
  openNotification: propsType.bool.isRequired,
  messageNotification: propsType.func.isRequired,
  typeNotification: propsType.string.isRequired,
  openVerifyModal: propsType.bool.isRequired,
  typeModal: propsType.string.isRequired,
};
export default ModalVerifyCode;
