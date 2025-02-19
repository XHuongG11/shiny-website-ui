import styles from './Banner.module.css';
const Banner = () => {
    return (

      <div className={styles.banner}>
        <span className={styles.menu}>Home</span> &gt; <span>Thông tin tài khoản</span>
        <div className={styles.nen}>
            <div className={styles.imgContainer}>
              <img src='./image/infocustomer/info.png'></img>
            </div>
            <div className={styles.textOverlay}>
                <h2>Chào mừng, Nguyễn Lê Mỹ Hoàng</h2>
                <p>Như những ngôi sao trên bầu trời đêm<br/> <br /> 
                trang sức làm bạn tỏa sáng giữa đám đông</p>

            </div>
        </div>
    </div>
    );
  };
export default Banner;  