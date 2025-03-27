import PropTypes from "prop-types";
import styles from './ProductImages.module.css';
function ProductImages({ images }) {
    if (!images || images.length === 0) {
      return <p>Không có hình ảnh sản phẩm</p>;
    }
    // tai vi database kieu no vay nen t sua vay nhin cho no dep hon
    const orderedImages = [];
    if (images.length > 0) orderedImages.push(images[0]); // Ảnh 0
    if (images.length > 2) orderedImages.push(images[2]); // Ảnh 2
    if (images.length > 1) orderedImages.push(images[3]); // Ảnh 1
    if (images.length > 3) orderedImages.push(images[1]); // Ảnh 3
    return (
      <div className={styles.displayImageProduct}>
        <div className={styles.imageProductContainer}>
            {orderedImages.map((image, index) => (
              <div key={index} className={styles.imageProduct}>
                <img src={image.url} alt={`Ảnh ${index}`} />
              </div>
            ))}
        </div>
      </div>
    );
  }
ProductImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ),
};
export default ProductImages;