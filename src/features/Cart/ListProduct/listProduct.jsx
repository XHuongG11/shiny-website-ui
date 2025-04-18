import { useState, useEffect } from "react";
import styles from "./listProduct.module.css"; // Import CSS Module
import { Grid2 } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb/breadcrum";
import cartApi from "../../../api/cartApi"; // Import API for fetching products
import { useNavigate } from 'react-router-dom';
import orderApi from "../../../api/orderApi";


const CartItemlist = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await cartApi.getMyCart({
                    params: {
                        _page: 1,
                        _limit: 10,
                        _t: new Date().getTime() // Thêm timestamp để tránh cache
                    }
                });
                console.log("Toàn bộ response:", response);

                // Log chi tiết hơn về cấu trúc dữ liệu
                if (response && response.cartItems) {
                    console.log("Chi tiết từng cartItem:");
                    response.cartItems.forEach((item, index) => {
                        console.log(`Item ${index + 1}:`, JSON.stringify(item, null, 2));
                        console.log(`ID: ${item.id}, Product ID: ${item.product?.id}, Product Title: ${item.product?.title}`);
                    });
                }

                // Phần code xử lý dữ liệu giữ nguyên
                if (response) {
                    if (response.cartItems && Array.isArray(response.cartItems)) {
                        setCartItems(response.cartItems);
                    }
                    else if (response.id && response.cartItems) {
                        setCartItems(response.cartItems);
                    }
                    else if (Array.isArray(response)) {
                        setCartItems(response);
                    }
                    else {
                        console.log("Không tìm thấy mảng cartItems, thử truy cập trực tiếp response");
                        setCartItems([]);
                    }
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Tăng số lượng
    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
    };

    // Giảm số lượng (tối thiểu 1)
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && (item.quantity || 1) > 1
                    ? { ...item, quantity: (item.quantity || 1) - 1 }
                    : item
            )
        );
    };

    // Xóa sản phẩm
    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Tính tổng tiền - đảm bảo quantity và price tồn tại
    // Add this function to toggle item selection
    const toggleSelectItem = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id) // Unselect
                : [...prevSelected, id] // Select
        );
    };

    // Update the totalPrice calculation to only include selected items
    const totalPrice = selectedItems.length === 0
    ? 0
    : cartItems
        .filter((item) => selectedItems.includes(item.id)) // Chỉ cộng những item đã được chọn
        .reduce((total, item) => {
            const price = item.productSize?.price || item.product?.price || 0;
            return total + price * (item.quantity || 1);
        }, 0);


    // Add a function to select/deselect all items
    const toggleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            // If all are selected, unselect all
            setSelectedItems([]);
        } else {
            // Otherwise select all
            setSelectedItems(cartItems.map(item => item.id));
        }
    };

    // Thêm log này ngay trước return để kiểm tra dữ liệu trước khi render
    console.log("CartItems trước khi render:", cartItems);
    console.log("Số lượng sản phẩm:", cartItems.length);
    // Update the handleCheckout function to pass selected items data
    const handleCheckout = () => {
        // Filter only the selected items
        const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
    
        if (selectedProducts.length === 0) return;
    
        // Save selected products to localStorage
        localStorage.setItem('checkoutItems', JSON.stringify(selectedProducts));
    
        // Navigate to checkout page
        navigate('/checkouts');
    };
    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb currentPage="Cart" />
            <div className={styles.cartContainer}>
                {/* Tiêu đề */}
                <h2 className={styles.line}>GIỎ HÀNG ({cartItems.length} SẢN PHẨM)</h2>

                {loading ? (
                    <p>Đang tải...</p>
                ) : cartItems.length === 0 ? (
                    <p>Không có sản phẩm nào trong giỏ hàng</p>
                ) : (
                    /* Danh sách sản phẩm */
                    // Update the checkbox in the item mapping
                    cartItems.map((item) => (
                        <Grid2 className={styles.cartItem} key={item.id} container direction="row" spacing={2}
                            sx={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Grid2 container direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                <input 
                                    type="checkbox" 
                                    className={styles.checkbox} 
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleSelectItem(item.id)}
                                />
                                <img
                                    src={item.product?.images && item.product.images.length > 0
                                        ? item.product.images[0]?.url
                                        : "/imgCart/charm.png"}
                                    alt={item.product?.title || "Sản phẩm"}
                                />
                                <div className={styles.itemDetails}>
                                    <p className={styles.nameItem}>{item.product?.title || "Sản phẩm không tên"}</p>
                                    <p className={styles.size}>{item.productSize?.size || "No size"}</p>
                                    {item.product?.discountPrice && (
                                        <span className={styles.oldPrice}>
                                            {(item.product.price).toLocaleString()}đ
                                        </span>
                                    )}
                                    <span className={styles.price}>
                                        {(item.productSize?.price || item.product?.price || 0).toLocaleString()}đ
                                    </span>
                                </div>
                            </Grid2>

                            <Grid2 container direction="row" spacing={0} sx={{ alignItems: "center" }}>
                                <div className={styles.quantity}>
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <input
                                        type="text"
                                        value={item.quantity || 1}
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value, 10);
                                            if (!isNaN(newQuantity) && newQuantity >= 0) {
                                                handleQuantityChange(item.id, newQuantity);
                                            }
                                        }}
                                    />
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>
                                <div className={styles.icons}>
                                    <img src="/imgCart/heart.png" alt="Heart" className={styles.icon} />
                                    <img
                                        src="/imgCart/trash.png"
                                        alt="Delete"
                                        className={styles.icon}
                                        onClick={() => removeItem(item.id)}
                                    />
                                    <img src="/imgCart/edit.png" alt="Edit" className={styles.icon} />
                                </div>
                            </Grid2>

                            <p className={styles.totalPrice}>
                                {((item.productSize?.price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}đ
                            </p>
                        </Grid2>
                    ))
                )}

                {/* Tổng đơn hàng */}
                <div className={styles.cartTotal}>
                    <p>
                        Tổng: <span>{totalPrice.toLocaleString()}đ</span>
                    </p>
                    <button 
                        onClick={handleCheckout}
                        disabled={selectedItems.length === 0}
                        className={selectedItems.length === 0 ? styles.disabledButton : ''}
                    >
                        Thanh Toán
                    </button>
                </div>

                {/* Tiếp tục mua hàng */}
                <div className={styles.continueShopping}>
                    <a href="/allproduct">&lt; Tiếp Tục Mua Hàng</a>
                </div>
            </div>
        </div>
    );
};

export default CartItemlist;