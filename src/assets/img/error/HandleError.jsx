import PropTypes from "prop-types";
import Error404 from "../error/404.png";
import Error500 from "../error/500.png";
import Error403 from "../error/403.png";
import { useParams } from "react-router-dom";

function HandleError() {
  let params = useParams();
  let statusCode = params.statusCode;
  let url = "";
  switch (statusCode) {
    case "404":
      url = Error404;
      break;
    case "500":
      url = Error500;
      break;
    case "403":
      url = Error403;
      break;
    default:
      url = Error404;
      break;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <img src={url} alt="Error" />
    </div>
  );
}

HandleError.propTypes = {
  statusCode: PropTypes.string,
};
export default HandleError;
