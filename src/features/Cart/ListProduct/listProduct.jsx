import { useState } from "react";
import styles from "./listProduct.module.css"; // Import CSS Module
import { Grid2 } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb/breadcrum";

const ListProduct = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Charm Bạc Hình Mũi Tên Chéo Với Ngọc Trai Trắng",
            size: "Bạc / One size",
            oldPrice: 2120000,
            price: 1790000,
            quantity: 2,
            favorite: false,
        },
        {
            id: 2,
            name: "Charm Bạc Hình Mũi Tên Chéo Với Ngọc Trai Trắng",
            size: "Bạc / One size",
            oldPrice: 2120000,
            price: 1790000,
            quantity: 2,
            favorite: false,
        },
        {
            id: 3,
            name: "Charm Bạc Hình Mũi Tên Chéo Với Ngọc Trai Trắng",
            size: "Bạc / One size",
            oldPrice: 2120000,
            price: 1790000,
            quantity: 2,
            favorite: false,
        },
    ]);

    // Tăng số lượng
    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Giảm số lượng (tối thiểu 1)
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
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
    // Tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb currentPage="Cart" />
            <div className={styles.cartContainer}>
                {/* Tiêu đề */}
                <h2 className={styles.line}>GIỎ HÀNG ({cartItems.length} SẢN PHẨM)</h2>

                {/* Danh sách sản phẩm */}
                {cartItems.map((item) => (
                    <Grid2 className={styles.cartItem} key={item.id} container direction="row" spacing={2}
                        sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Grid2 container direction="row" spacing={2} sx={{ alignItems: "center" }}>
                            <input type="checkbox" className={styles.checkbox} />
                            <img src="/imgCart/charm.png" alt="Charm" />
                            <div className={styles.itemDetails}>
                                <p className={styles.nameItem}>{item.name}</p>
                                <p className={styles.size}>{item.size}</p>
                                <span className={styles.oldPrice}>{item.oldPrice.toLocaleString()}đ</span>
                                <span className={styles.price}>{item.price.toLocaleString()}đ</span>
                            </div>
                        </Grid2>

                        <Grid2 container direction="row" spacing={0} sx={{ alignItems: "center" }}>
                            <div className={styles.quantity}>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value, 10); // Chuyển đổi giá trị nhập vào thành số
                                        if (!isNaN(newQuantity) && newQuantity >= 0) { // Đảm bảo giá trị là số và >= 1
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

                        <p className={styles.totalPrice}>{(item.price * item.quantity).toLocaleString()}đ</p>
                    </Grid2>
                ))}

                {/* Tổng đơn hàng */}
                <div className={styles.cartTotal}>
                    <p>
                        Tổng: <span>{totalPrice.toLocaleString()}đ</span>
                    </p>
                    <button>Thanh Toán</button>
                </div>

                {/* Tiếp tục mua hàng */}
                <div className={styles.continueShopping}>
                    <a href="/shop">&lt; Tiếp Tục Mua Hàng</a>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;