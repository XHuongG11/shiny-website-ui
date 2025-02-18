import { useState } from 'react';
import styles from './AlbumSlider.module.css';

const AlbumSlider = () => {
    const [albumIndex, setAlbumIndex] = useState(0);
    const albumSlides = [
        { img: 'img/albumImg/album3.png', title: 'Comfort', desc: "ANITA’S Best Collections", text: 'Lorem ipsum dolor sit amet consectetur. Sed commodo pellentesque arcu tristique et morbi.' },
        { img: 'img/albumImg/album2.png', title: 'Timeless Classics', desc: 'Jewelry that never goes out of style.' },
        { img: 'img/albumImg/album1.png', title: 'Modern Elegance', desc: 'For those who love contemporary fashion.' }
    ];

    const moveAlbumSlide = (step) => {
        setAlbumIndex((prevIndex) => (prevIndex + step + albumSlides.length) % albumSlides.length);
    };

    return (
        <div className={styles.albumSlider}>
            <div className={styles.albumSlides} style={{ transform: `translateX(${-albumIndex * 100}%)` }}>
                {albumSlides.map((slide, index) => (
                    <div key={index} className={styles.albumSlide}>
                        <img className={styles.img} src={slide.img} alt={`Album ${index + 1}`} />
                        <div className={styles.text}>
                            <h2>{slide.title}</h2>
                            <h1>{slide.desc}</h1>
                            <p>{slide.text}</p>
                            <button className={styles.btn}>Discover the Collection</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.albumPrev} onClick={() => moveAlbumSlide(-1)}>&#10094;</button>
            <button className={styles.albumNext} onClick={() => moveAlbumSlide(1)}>&#10095;</button>
        </div>
    );
};

export default AlbumSlider;