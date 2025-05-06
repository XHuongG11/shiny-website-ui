import { useEffect, useState } from "react";
import privacyAndTermApi from "../../api/privacyAndTermApi";
import styles from "./styles.module.css";

function PriavcyAndTerm() {
  const [privacy, setPrivacy] = useState("");
  const getPrivacyAndTerm = async () => {

    const resp = await privacyAndTermApi.getPrivacyAndTerm();
    setPrivacy(resp.data.content.replace(/\\n/g, "\n"));
  };
  useEffect(() => {
    getPrivacyAndTerm();
  }, []);
  return (
    <>
      <h1 style={{ margin: "30px", textAlign: "center" }}>
        Chính sách cửa hàng
      </h1>
      <div className={styles.policyContainer}>
        <div
          style={{
            marginLeft: "70px",
            marginRight: "70px",
          }}
          dangerouslySetInnerHTML={{ __html: privacy }}
        />
      </div>
    </>
  );
}

export default PriavcyAndTerm;
