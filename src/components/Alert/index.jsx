import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";

function Notification({
  severity,
  message,
  open,
  setOpen,
  variant = "outlined",
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          sx={{ width: "100%" , color: "white !important"}}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
Notification.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  variant: PropTypes.string,
};
export default Notification;
