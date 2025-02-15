import './styles.css';

ProductItem.propTypes = {
    // product: PropTypes.object.isRequired,
};
function ProductItem() {
    return (
        <div className="item">
            <div className="product-image">
                <img src="https://s3-alpha-sig.figma.com/img/fd97/199a/d37f7841443d920fb7eb44ccd749f19b?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KOEzWL9AXiTi26WJS8-1MbPqXccMiqJ5jT4z8h1DZn0uMaEiKyfaKaBxt8kPAMORsKCGs5lV8Og-s-Zpp2QJbdtuKLwFpQYo8DD2kFu7V3iouDS787t~LTNXWqtQPp5ZkRWcTstp8CfBkc2ZUDUDM6ilo20h7PGjESjSeC2a4HAAT5x-9o7LEtDSI3S6u2k8C5i5z4VBpwbRwiOP1-39Fv~m8raJDC1x1eqkfcoKi5ApMf05h8-r9SgxKBzIOE6WJtSZNrnsOV-1XPXkER-gfhxM~Y-HvS~VQ9k2T3ig8rpIPOWxX4RCks2NSHCDqHEY-ymtXI-TQ3NOaFFgsPVyGQ__" alt="Product Image" />
            </div>
            <div className="product-details">
                <div className="name-product">
                    <span>Charm bạc hình mũi tên chéo với ngọc trai tráng men trắng</span>
                </div>
                <div className="type-and-cost">
                    <div className="type-product">
                        <span>Bạc / One size</span>
                    </div>
                    <div className="cost">
                        <span className="old-cost">2.120.000đ</span>
                        <span className="current-cost">1.790.000đ</span>
                    </div>
                </div>
            </div>
            <div className="quantity">
                2
            </div>
            <div className="overall">
                <span>3,580,000đ</span>
            </div>
        </div>
    );
}

export default ProductItem;