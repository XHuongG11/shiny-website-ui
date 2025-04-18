import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormControl, Grid, TextField } from '@mui/material';
import Button from '../../components/Button';
import DeliveryMethod from './components/DeliveryMethod';
import PaymentMethod from './components/PaymentMethod';
import ProductItem from './components/ProductItem';
import UserInfoForm from './components/UserInfoForm';
import paymentApi from '../../api/paymentApi';
import orderApi from '../../api/orderApi';
import customerAddressApi from '../../api/customerAddressApi';
import './styles.css';

const MakeOrder = () => {
    // State management
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [momoQrUrl, setMomoQrUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const navigate = useNavigate();
    const formRef = useRef(null);

    // Calculate order totals
    const subtotal = checkoutItems.reduce((total, item) => {
        const price = item.productSize?.price || item.product?.price || 0;
        return total + price * (item.quantity || 1);
    }, 0);

    const discount = 1000000;
    const shippingFee = 40000;
    const total = subtotal - discount + shippingFee;

    // Effects
    useEffect(() => {
        const storedItems = localStorage.getItem('checkoutItems');
        if (storedItems) {
            setCheckoutItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const res = await customerAddressApi.getCustomerAddresses();
                setAddresses(res.data.data.content || []);
            } catch (e) {
                setAddresses([]);
            }
        }
        fetchAddresses();
    }, []);

    // Helper functions
    const validateCheckoutItems = (items) => {
        if (!items || items.length === 0) return false;
        return items.every(item => item.productSize?.id && item.quantity > 0);
    };

    const prepareCartItems = (items) => {
        return items.map(item => ({
            productSize: { id: item.productSize.id },
            quantity: item.quantity || 1
        }));
    };

    const resolveShippingAddress = async (value) => {
        if (value.addressId) {
            const address = addresses.find(addr => String(addr.id) === String(value.addressId));
            if (address) return address;
            throw new Error('Địa chỉ đã chọn không tồn tại');
        }

        const addressData = {
            recipientName: value.userName,
            recipientPhone: value.phoneNumber,
            address: value.houseNumber,
            village: value.ward,
            district: value.district,
            province: value.city,
        };

        const res = await customerAddressApi.addAddress(addressData);
        let newAddress = res?.data?.data || res?.data;
        if (Array.isArray(newAddress)) newAddress = newAddress[0];
        if (newAddress?.content) newAddress = newAddress.content;
        if (!newAddress?.id) throw new Error('Không nhận được ID địa chỉ từ server');

        return newAddress;
    };

    // Payment handlers
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setMomoQrUrl(null);
    };

    const processMomoPayment = async (orderId, amount) => {
        const { data } = await paymentApi.createMomoPayment({
            orderId,
            amount,
            description: `Thanh toán đơn hàng #${orderId}`
        });
        if (!data?.data) throw new Error('Không nhận được liên kết thanh toán');
        setMomoQrUrl(data.data);
    };

    const processVNPayPayment = async (orderId, amount) => {
        const { data } = await paymentApi.createVNPayPayment({
            orderId,
            amount,
            description: `Thanh toán đơn hàng #${orderId}`
        });
        if (!data?.data) throw new Error('Không nhận được liên kết thanh toán VNPAY');
        window.location.href = data.data;
    };

    const processCODPayment = async (orderId) => {
        try {
            console.log("Updating order status:", { orderId, status: 'SHIPPING' });
            await orderApi.updateOrderStatus(orderId, 'SHIPPING');
        } catch (statusErr) {
            console.warn("⚠️ Không thể cập nhật trạng thái đơn hàng:", statusErr);
        }
        navigate(`/orders/${orderId}/status`);
    };

    // Form submission
    const handleFormSubmit = async (formData) => {
        setIsProcessing(true);

        try {
            if (!validateCheckoutItems(checkoutItems)) {
                alert('Giỏ hàng không hợp lệ');
                return;
            }

            const shippingAddress = await resolveShippingAddress(formData);

            const orderRequest = {
                shippingAddress: { id: shippingAddress.id },
                shippingMethod: "STANDARD",
                paymentMethod,
                cartItems: prepareCartItems(checkoutItems),
                totalProductPrice: subtotal,
                shippingFee,
                totalPrice: total,
                voucherCodes: [],
                freeShipDiscount: 0,
                promotionDiscount: discount,
                note: formData.note || "",
            };

            const orderResponse = await orderApi.placeOrder(orderRequest);
            const newOrderId = orderResponse?.data?.id;

            if (!newOrderId) throw new Error('Không nhận được ID đơn hàng');
            setOrderId(newOrderId);

            // Handle different payment methods
            switch (paymentMethod) {
                case 'MOMO':
                    await processMomoPayment(newOrderId, total);
                    break;
                case 'VNPAY':
                    await processVNPayPayment(newOrderId, total);
                    break;
                case 'COD':
                    await processCODPayment(newOrderId);
                    break;
                default:
                    navigate(`/checkouts/thank-you?id=${newOrderId}`);
            }
        } catch (error) {
            alert(`Đã xảy ra lỗi: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Grid container spacing={3} sx={{ justifyContent: "center", backgroundColor: '#f9f9f9', mt: 4, mb: 4 }}>
            {/* Left Column - User Info and Payment */}
            <Grid item xs={11} sm={5}>
                <div className="payment-info">
                    <div className="user-header">
                        <img
                            src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                            alt="User Avatar"
                            className="user-avatar"
                        />
                        <div className="user-details">
                            <p className="user-name">Xuan Huong (22110156@student.hcmute.edu.vn)</p>
                            <Link href="#" className="logout">Đăng xuất</Link>
                        </div>
                    </div>

                    <UserInfoForm
                        addresses={addresses}
                        onSubmit={handleFormSubmit}
                        ref={formRef}
                    />

                    <DeliveryMethod />

                    <PaymentMethod
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                    />

                    {momoQrUrl && (
                        <div className="momo-qr-container">
                            <h3>Quét mã QR MoMo để thanh toán</h3>
                            <img src={momoQrUrl} alt="Momo QR" className="momo-qr-code" />
                        </div>
                    )}

                    <div className="payment-button">
                        <Link href="/cart" className="back-to-cart">
                            &lt; Giỏ Hàng
                        </Link>

                        {!momoQrUrl && (
                            <Button
                                title='Hoàn Tất Đơn Hàng'
                                disabled={isProcessing}
                                onClick={() => {
                                    if (formRef.current) {
                                        formRef.current.dispatchEvent(
                                            new Event('submit', { bubbles: true, cancelable: true })
                                        );
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid item xs={11} sm={4}>
                <div className="checkout-info">
                    <div className="list-checkout">
                        {checkoutItems.length > 0 ? (
                            checkoutItems.map((item, index) => (
                                <ProductItem
                                    key={item.id || index}
                                    product={item.product}
                                    quantity={item.quantity || 1}
                                    productSize={item.productSize}
                                />
                            ))
                        ) : (
                            <>
                                <ProductItem />
                                <ProductItem />
                            </>
                        )}

                        <div className="discount-container">
                            <FormControl fullWidth>
                                <TextField
                                    id="discount"
                                    name="discount"
                                    label="Mã giảm giá"
                                    sx={{ '& .MuiInputBase-root': { height: 47 } }}
                                />
                            </FormControl>
                            <Button title='Sử dụng' />
                        </div>

                        <div className="line"></div>

                        <div className="estimate">
                            <span className="text">Tạm tính</span>
                            <span className="value">{subtotal.toLocaleString()}đ</span>
                        </div>

                        <div className="reduce">
                            <span className="text">Giảm giá</span>
                            <span className="value">{discount.toLocaleString()}đ</span>
                        </div>

                        <div className="delivery-cost">
                            <span className="text">Phí vận chuyển</span>
                            <span className="value">{shippingFee.toLocaleString()}đ</span>
                        </div>

                        <div className="line"></div>

                        <div className="overall">
                            <span className="text total">Tổng cộng</span>
                            <span className="value total">{total.toLocaleString()}đ</span>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default MakeOrder;