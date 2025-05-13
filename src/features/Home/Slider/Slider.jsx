import { useState, useEffect } from 'react';
import bannerApi from '../../../api/bannerApi';
import styles from './Slider.module.css';

const DEFAULT_SLIDES = [
    { img: 'img/sliderImg/imga.png', title: 'Discover the World', desc: 'Explore amazing destinations around the globe' },
    { img: 'img/sliderImg/imgb.png', title: 'Adventure Awaits', desc: 'Experience the thrill of the great outdoors' },
    { img: 'img/sliderImg/imgc.png', title: 'Relax and Enjoy', desc: 'Find peace and tranquility in breathtaking locations' },
    { img: 'img/sliderImg/imgd.png', title: 'Unforgettable Journeys', desc: 'Make memories that last a lifetime' }
];

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

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await bannerApi.getBannersByPosition('home');
                const banners = Array.isArray(response.data) ? response.data : [];

                if (banners.length === 0) {
                    setSlides(DEFAULT_SLIDES);
                } else {
                    const formatted = banners.map((banner, index) => ({
                        img: "https://api.shinyjewelry.shop" + banner.url || 'https://via.placeholder.com/1200x600?text=No+Image',
                        title: titles[index % titles.length],
                        desc: 'Explore our exclusive collection',
                    }));
                    setSlides(formatted);
                }
            } catch (err) {
                console.error('Error fetching banners:', err);
                setSlides(DEFAULT_SLIDES); // fallback nếu lỗi
                setError('Không thể tải banner. Đang dùng dữ liệu mặc định.');
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const autoSlide = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(autoSlide);
    }, [slides]);

    const showSlide = (index) => {
        if (index >= slides.length) setSlideIndex(0);
        else if (index < 0) setSlideIndex(slides.length - 1);
        else setSlideIndex(index);
    };

    if (loading) return <div>Loading banners...</div>;

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
