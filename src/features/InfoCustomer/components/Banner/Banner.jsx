import styles from './Banner.module.css';
import propTypes from 'prop-types';

const Banner = ({ fullName = "" }) => {
  return (

    <div className={styles.banner}>
      {/* <span className={styles.menu}>Home</span> &gt; <span>Thông tin tài khoản</span> */}
      <div className={styles.nen}>
        <div className={styles.imgContainer}>
          <img src='./image/infocustomer/info.png'></img>
        </div>
        <div className={styles.textOverlay}>
          <h2>Chào mừng, {fullName}</h2>
          <p>Như những ngôi sao trên bầu trời đêm<br /> <br />
            trang sức làm bạn tỏa sáng giữa đám đông</p>
        </div>
      </div>
    </div >
  );
};
Banner.propTypes = {
  fullName: propTypes.string,
}
export default Banner;  