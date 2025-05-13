import { useEffect, useState } from 'react';
import styles from './Banner.module.css';
import propTypes from 'prop-types';

import bannerApi from '../../../../api/bannerApi';

const Banner = ({ fullName = "" }) => {
  const [bannerUrl, setBannerUrl] = useState('/image/infocustomer/banner.jpg'); // mặc định

  useEffect(() => {
      const fetchBanner = async () => {
          try {
              const response = await bannerApi.getBannersByPosition('product');
              const data = response.data;
              if (Array.isArray(data) && data.length > 0 && data[0].url) {
                  setBannerUrl('https://api.shinyjewelry.shop' + data[0].url);
              }
          } catch (error) {
              console.error('Failed to load banner:', error);
          }
      };
      fetchBanner();
  }, []);

  return (

    <div className={styles.banner}>
      {/* <span className={styles.menu}>Home</span> &gt; <span>Thông tin tài khoản</span> */}
      <div className={styles.nen}>
        <div className={styles.imgContainer}>
          <img src={bannerUrl}></img>
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