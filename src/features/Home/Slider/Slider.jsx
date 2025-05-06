import { useState, useEffect } from 'react';
import bannerApi from '../../../api/bannerApi';
import styles from './Slider.module.css'; // Import CSS Module

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const titles = [
        'Discover the World',
        'Adventure Awaits',
        'Relax and Enjoy',
        'Unforgettable Journeys'
    ];

    // Gọi API để lấy banners với position = 'home'
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const response = await bannerApi.getBannersByPosition('home');
                const banners = Array.isArray(response.data) ? response.data : [];
                console.log('Banners:', banners); // Debug dữ liệu

                // Chuyển đổi dữ liệu banners thành định dạng slides
                const formattedSlides = banners.map((banner, index) => ({
                    img: banner.url || 'https://via.placeholder.com/1200x600?text=No+Image',
                    title: titles[index % titles.length], // Gán title từ danh sách titles, lặp lại nếu cần
                    desc: 'Explore our exclusive collection', // Giá trị mặc định
                }));

                setSlides(formattedSlides);
            } catch (err) {
                setError('Failed to load banners');
                console.error('Error fetching banners:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    // Tự động chuyển slide
    useEffect(() => {
        if (slides.length === 0) return;

        const autoSlide = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [slides.length]);

    const showSlide = (index) => {
        if (index >= slides.length) {
            setSlideIndex(0);
        } else if (index < 0) {
            setSlideIndex(slides.length - 1);
        } else {
            setSlideIndex(index);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (slides.length === 0) {
        return <div>No banners available</div>;
    }

    return (
        <div className={styles.slider}>
            <div className={styles.slides} style={{ transform: `translateX(${-slideIndex * 25}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className={`${styles.slide} ${index === slideIndex ? styles.active : ''}`}>
                        <img src={slide.img} alt={`Slide ${index + 1}`} />
                        <div className={styles.slideContent}>
                            <h2>{slide.title}</h2>
                            <p>{slide.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className={`${styles.arrow} ${styles.prev}`} onClick={() => showSlide(slideIndex - 1)}>❮</button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={() => showSlide(slideIndex + 1)}>❯</button>
            <div className={styles.dotsContainer}>
                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === slideIndex ? styles.active : ''}`}
                            onClick={() => showSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;