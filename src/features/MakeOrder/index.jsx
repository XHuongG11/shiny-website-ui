import { FormControl, Grid2, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DeliveryMethod from './components/DeliveryMethod';
import PaymentMethod from './components/PaymentMethod';
import ProductItem from './components/ProductItem';
import UserInfoForm from './components/UserInfoForm';
import './styles.css';
import paymentApi from '../../api/paymentApi';
import orderApi from '../../api/orderApi';
import customerAddressApi from '../../api/customerAddressApi';

function MakeOrder() {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');  // State lưu phương thức thanh toán
    const [momoQrUrl, setMomoQrUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        const storedItems = localStorage.getItem('checkoutItems');
        if (storedItems) {
            setCheckoutItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        if (shouldRedirect) {
            navigate(`/checkouts/thank-you?id=${orderId}`);
        }
    }, [shouldRedirect, navigate, orderId]);

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

    const subtotal = checkoutItems.reduce((total, item) => {
        const price = item.productSize?.price || item.product?.price || 0;
        return total + price * (item.quantity || 1);
    }, 0);

    const discount = 1000000;
    const shippingFee = 40000;
    const total = subtotal - discount + shippingFee;

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);  // Cập nhật phương thức thanh toán khi người dùng chọn
        setMomoQrUrl(null);  // Reset URL QR MOMO nếu đổi phương thức
    };

    function validateCheckoutItems(items) {
        if (!items || items.length === 0) return false;
        return items.every(item => item.productSize?.id && item.quantity > 0);
    }

    function prepareCartItems(items) {
        return items.map(item => ({
            productSize: { id: item.productSize.id },
            quantity: item.quantity || 1
        }));
    }

    async function resolveShippingAddress(value) {
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
    }

    async function handleFormSubmit(value) {
        setIsProcessing(true);
        try {
            if (!validateCheckoutItems(checkoutItems)) {
                alert('Giỏ hàng không hợp lệ');
                setIsProcessing(false);
                return;
            }

            const shippingAddress = await resolveShippingAddress(value);

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
                note: value.note || "",
            };

            const orderResponse = await orderApi.placeOrder(orderRequest);
            console.log(">> orderResponse full:", orderResponse);

            const newOrderId = orderResponse?.data?.id;
            console.log(">> newOrderId:", newOrderId);

            if (!newOrderId) throw new Error('Không nhận được ID đơn hàng');
            setOrderId(newOrderId);

            if (paymentMethod === 'MOMO') {
                try {
                  const orderId = typeof newOrderId === 'object' ? newOrderId.id : Number(newOrderId);
                  console.log('OrderID (fixed):', orderId, 'Type:', typeof orderId);
              
                  const { data } = await paymentApi.createMomoPayment(orderId);
              
                  console.log('📦 Full API Response:', JSON.stringify(data, null, 2));
                  console.log('🔗 Payment URL:', data);
                  console.log('📏 Type of data:', typeof data);
              
                  if (!data || typeof data !== 'string' || !data.startsWith('http')) {
                    throw new Error("Không nhận được liên kết thanh toán hợp lệ");
                  }
              
                  window.location.href = data;
                } catch (error) {
                  console.error("Lỗi thanh toán MoMo:", error);
                  alert("Lỗi thanh toán: " + error.message);
                }
              }
              
               else if (paymentMethod === 'COD') {
                try {
                    console.log("Updating order status:", { orderId: newOrderId, status: 'SHIPPING' });
                    await orderApi.updateOrderStatus(newOrderId, 'SHIPPING');
                } catch (statusErr) {
                    console.warn("⚠️ Không thể cập nhật trạng thái đơn hàng:", statusErr);
                }
                navigate(`/orders/${newOrderId}/status`);
            } else {
                setShouldRedirect(true);
            }
        } catch (error) {
            alert(`Đã xảy ra lỗi: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Grid2 container spacing={3} sx={{ justifyContent: "center", backgroundColor: '#f9f9f9', mt: 4, mb: 4 }}>
            <Grid2 xs={11} sm={5}>
                <div className="payment-info">
                    <div className="user-header">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png" alt="User Avatar" className="user-avatar" />
                        <div className="user-details">
                            <p className="user-name">Xuan Huong (22110156@student.hcmute.edu.vn)</p>
                            <Link href="#" className="logout">Đăng xuất</Link>
                        </div>
                    </div>
                    <UserInfoForm addresses={addresses} onSubmit={handleFormSubmit} ref={formRef} />
                    <DeliveryMethod />
                    <PaymentMethod onChange={handlePaymentMethodChange} />
                    {momoQrUrl && (
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <h3>Quét mã QR MoMo để thanh toán</h3>
                            <img src={momoQrUrl} alt="Momo QR" style={{ maxWidth: 250 }} />
                        </div>
                    )}
                    <div className="payment-button">
                        <Link href="/cart" className="back-to-cart"> &lt; Giỏ Hàng</Link>
                        {!momoQrUrl && (
                            <Button title='Hoàn Tất Đơn Hàng' disabled={isProcessing} onClick={() => {
                                if (formRef.current) {
                                    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                                }
                            }} />
                        )}
                    </div>
                </div>
            </Grid2>

            <Grid2 xs={11} sm={4}>
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
                            <FormControl>
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
            </Grid2>
        </Grid2>
    );
}

export default MakeOrder;
