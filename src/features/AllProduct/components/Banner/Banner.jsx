import { useEffect, useState } from 'react';
import styles from './Banner.module.css';
import bannerApi from '../../../../api/bannerApi';

const Banner = () => {
    const [bannerUrl, setBannerUrl] = useState('/image/allproduct/banner.jpg'); // mặc định

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await bannerApi.getBannersByPosition('product');
                const data = response.data;
                if (Array.isArray(data) && data.length > 0 && data[0].url) {
                    setBannerUrl("https://api.shinyjewelry.shop" + data[0].url);
                }
            } catch (error) {
                console.error('Failed to load banner:', error);
            }
        };
        fetchBanner();
    }, []);

    return (
        <div className={styles.banner}>
            <img src={bannerUrl} alt="Product Banner" />
        </div>
    );
};

export default Banner;
