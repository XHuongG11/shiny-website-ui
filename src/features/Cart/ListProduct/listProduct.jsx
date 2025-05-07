import { useState, useEffect } from "react";
import styles from "./listProduct.module.css"; // Import CSS Module
import { Grid2, Button, MenuItem, Select, FormControl } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb/breadcrum";
import cartApi from "../../../api/cartApi"; // Import API for fetching products
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FavoriteBorder, Delete, Edit } from '@mui/icons-material';


const CartItemlist = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const loadCartData = async () => {
        setLoading(true);
        try {
            const response = await cartApi.getMyCart({
                params: {
                    _page: 1,
                    _limit: 10,
                    _t: new Date().getTime() // Thêm timestamp để tránh cache
                }
            });

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
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        } catch (error) {
            setCartItems([]);
            toast.error("Không thể tải thông tin giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCartData();
    }, []);
    
    // Hàm xử lý đổi size sản phẩm
    const handleSizeChange = async (cartItemId, oldSizeId, newSizeId) => {
        if (oldSizeId === newSizeId) return;
        
        try {
            await cartApi.changeSize(oldSizeId, newSizeId);
            toast.success("Đổi kích thước thành công ✅");
            // Tải lại dữ liệu giỏ hàng sau khi đổi size
            loadCartData();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Lỗi khi đổi kích thước ❌");
        }
    };
    
    // Hàm xóa tất cả sản phẩm trong giỏ hàng
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const clearCart = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmClearCart = async () => {
        try {
            await cartApi.clearMyCart();
            toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng ✅");
            loadCartData();
            setSelectedItems([]);
        } catch (error) {
            toast.error("Lỗi khi xóa giỏ hàng ❌");
        } finally {
            setShowConfirmModal(false);
        }
    };

    const handleCancelClearCart = () => {
        setShowConfirmModal(false);
    };

    // Modal component for confirmation
    const ConfirmModal = () => (
        <div className={showConfirmModal ? styles.modalOverlay : styles.hideModal}>
            <div className={styles.confirmModal}>
                <h3>Xác nhận xóa giỏ hàng</h3>
                <p>Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?</p>
                <div className={styles.modalButtons}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleConfirmClearCart}
                    >
                        Xóa tất cả
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={handleCancelClearCart}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    );

    // Tăng số lượng
    const increaseQuantity = async (id) => {
        const item = cartItems.find(item => item.id === id);
        if (!item) return;

        const newQuantity = (item.quantity || 1) + 1;

        try {
            await cartApi.updateItemQuantity(item.productSize?.id, newQuantity);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
            setErrorMessage(""); // Xóa lỗi nếu thành công
        } catch (error) {
            const message = error?.response?.data?.message || "Đã xảy ra lỗi khi cập nhật số lượng";
            setErrorMessage(message);
        }
    };


    const decreaseQuantity = async (id) => {
        const item = cartItems.find(item => item.id === id);
        if (!item) return;

        const currentQuantity = item.quantity || 1;
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;

        try {
            await cartApi.updateItemQuantity(item.productSize?.id, newQuantity);
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
            setErrorMessage(""); // Reset lỗi nếu có
        } catch (error) {
            const message = error?.response?.data?.message || "Đã xảy ra lỗi khi giảm số lượng";
            setErrorMessage(message);
        }
    };



    // Xóa sản phẩm
    const removeItem = async (id, productSizeId) => {
        try {
            await cartApi.removeItemFromCart(productSizeId);
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng ✅");
            loadCartData(); // Tải lại dữ liệu giỏ hàng
        } catch (error) {
            toast.error("Lỗi khi xóa sản phẩm ❌");
        }
    };

    const handleQuantityChange = async (id, newQuantity, productSizeId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            await cartApi.updateItemQuantity(productSizeId, newQuantity);
            toast.success("Cập nhật số lượng thành công ✅", { autoClose: 5000 });
        } catch (error) {
            const message = error?.response?.data?.message || "Lỗi khi cập nhật số lượng ❌";
            toast.error(message, { autoClose: 5000 });
        }
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
                {/* Tiêu đề và nút Clear Cart */}
                <div className={styles.cartHeader}>
                    <h2 className={styles.title}>GIỎ HÀNG ({cartItems.length} SẢN PHẨM)</h2>
                    {cartItems.length > 0 && (
                        <Button 
                            variant="contained" 
                            color="error" 
                            className={styles.clearCartBtn}
                            onClick={clearCart}
                        >
                            Xóa tất cả
                        </Button>
                    )}
                </div>
                <div className={styles.line}></div>

                {/* Modal xác nhận xóa giỏ hàng */}
                <ConfirmModal />

                {loading ? (
                    <p>Đang tải...</p>
                ) : cartItems.length === 0 ? (
                    <p>Không có sản phẩm nào trong giỏ hàng</p>
                ) : (

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
                                    
                                    {/* Size selector */}
                                    <div className={styles.sizeSelector}>
                                        <FormControl size="small" className={styles.sizeFormControl}>
                                            <Select
                                                value={item.productSize?.id || ""}
                                                onChange={(e) => handleSizeChange(item.id, item.productSize?.id, e.target.value)}
                                                displayEmpty
                                                className={styles.sizeSelect}
                                            >
                                                {item.product?.productSizes?.map((size) => (
                                                    <MenuItem key={size.id} value={size.id} disabled={size.stock <= 0}>
                                                        {size.size} {size.stock <= 0 ? "(Hết hàng)" : ""}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    
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
                                                handleQuantityChange(item.id, newQuantity, item.productSize?.id);
                                            }
                                        }}
                                    />
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>
                                <div className={styles.icons}>
                                    <FavoriteBorder className={styles.icon} />
                                    <Delete 
                                        className={styles.icon} 
                                        onClick={() => removeItem(item.id, item.productSize?.id)}
                                    />
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
            <ToastContainer position="top-right" />
        </div>
    );
};

export default CartItemlist;