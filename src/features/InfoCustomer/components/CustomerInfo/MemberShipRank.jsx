import propTypes from "prop-types";
import { GiQueenCrown } from "react-icons/gi";
import styles from "./CustomerInfo.module.css";

const MemberShipRank = ({ infoCus }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>
          {" "}
          <GiQueenCrown /> CHƯƠNG TRÌNH THÀNH VIÊN
        </h2>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.inputBox} style={{ marginLeft: "0px" }}>
          <input
            style={{ fontWeight: "bold", marginLeft: "10px", color: "black" }}
            type="text"
            disabled
            value={`${"Hạng thành viên: " + infoCus?.membershipRank}`}
          />
        </div>
        <div className={styles.inputBox} style={{ marginLeft: "0px" }}>
          <input
            style={{ fontWeight: "bold", marginLeft: "10px", color: "black" }}
            type="text"
            disabled
            value={`${"Tổng chi tiêu: " + infoCus?.totalSpent}`}
          />
        </div>
      </div>
    </div>
  );
};
MemberShipRank.propTypes = {
  infoCus: propTypes.object,
};
export default MemberShipRank;
