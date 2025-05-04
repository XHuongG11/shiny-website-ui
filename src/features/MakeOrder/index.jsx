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
import voucherApi from '../../api/voucherApi';
import customerAddressApi from '../../api/customerAddressApi';
import { Autocomplete } from '@mui/material';

function MakeOrder() {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('MOMO'); 
    const [momoQrUrl, setMomoQrUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [voucherOptions, setVoucherOptions] = useState([]);
    const [promotionInput, setPromotionInput] = useState('');
    const [freeshipInput, setFreeshipInput] = useState('');
    const [promotionDiscount, setPromotionDiscount] = useState(0); // %
    const [freeShipDiscount, setFreeShipDiscount] = useState(0);   // %
    const [finalTotal, setFinalTotal] = useState(0);
    const [discount, setDiscount] = useState(0);                   // số tiền giảm

    const handleVoucherFocus = async () => {
        try {
            const res = await voucherApi.getValidVouchers(1, 30); 
            const vouchers = res.data?.content || [];
            setVoucherOptions(vouchers);
        } catch (error) {
            console.error("❌ Lỗi khi lấy voucher:", error);
        }
    };

    const handlePromotionSelect = (event, newValue) => {
        if (newValue && newValue.code) {
            setPromotionInput(newValue.code);
            setPromotionDiscount(newValue.discountRate || 0);
        } else {
            setPromotionInput('');
            setPromotionDiscount(0);
        }
    };

    const handleFreeshipSelect = (event, newValue) => {
        if (newValue && newValue.code) {
            setFreeshipInput(newValue.code);
            setfreeShipDiscount(newValue.discountRate || 0);
        } else {
            setFreeshipInput('');
            setfreeShipDiscount(0);
        }
    };
    const subtotal = checkoutItems.reduce((total, item) => {
        const price = item.productSize?.price || item.product?.price || 0;
        return total + price * (item.quantity || 1);
    }, 0);

    const calculateShippingFee = (method) => {
        switch (method) {
            case 'express': return 40000;
            case 'standard':
            default: return 15000;
        }
    };
    const rawShippingFee = calculateShippingFee(deliveryMethod);
    const applyVoucher = async () => {
        try {
            const voucherCodes = [promotionInput, freeshipInput].filter(Boolean);
            if (voucherCodes.length === 0) {
                alert("Vui lòng nhập mã voucher!");
                return;
            }
    
            const cartItems = checkoutItems.map(item => ({
                product: { id: item.product?.id },
                productSize: { id: item.productSize?.id },
                quantity: item.quantity || 1
            }));
    
            const res = await voucherApi.validateVoucher({
                voucherCodes,
                totalProductPrice: subtotal,
                cartItems
            });
    
            if (res.code === '200') {
                console.log("✅ Voucher hợp lệ");
    
                const discountedSubtotal = subtotal * (1 - promotionDiscount / 100);
                const discountedShippingFee = rawShippingFee * (1 - freeShipDiscount / 100);
                const calculatedDiscount = subtotal * promotionDiscount / 100 + rawShippingFee * freeShipDiscount / 100;
                const total = discountedSubtotal + discountedShippingFee;
    
                setDiscount(calculatedDiscount);
                setFinalTotal(total);
            } else {
                console.log("❌ API trả về lỗi:", res.data?.message);
                setPromotionDiscount(0);
                setFreeShipDiscount(0);
                setDiscount(0);
                setFinalTotal(subtotal + rawShippingFee);
                alert('Voucher không hợp lệ hoặc đã hết hạn.');
            }
        } catch (error) {
            console.error("❌ Lỗi khi áp dụng voucher:", error);
            setPromotionDiscount(0);
            setFreeShipDiscount(0);
            setDiscount(0);
            setFinalTotal(subtotal + rawShippingFee);
            alert('Voucher không hợp lệ hoặc đã hết hạn.');
        }
    };

    
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
                setAddresses(res.data.content || []);
            } catch (e) {
                setAddresses([]);
            }
        }
        fetchAddresses();
    }, []);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setMomoQrUrl(null); 
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
            console.log("🛒 Bắt đầu xử lý đặt hàng...");
            if (!validateCheckoutItems(checkoutItems)) {
                console.error("❌ Giỏ hàng không hợp lệ");
                alert('Giỏ hàng không hợp lệ');
                setIsProcessing(false);
                return;
            }

            console.log("🏠 Đang xử lý địa chỉ giao hàng...");
            const shippingAddress = await resolveShippingAddress(value);
            console.log("✅ Địa chỉ giao hàng:", shippingAddress);

            const orderRequest = {
                shippingAddress: { id: shippingAddress.id },
                shippingMethod: deliveryMethod.toUpperCase(),
                paymentMethod,
                cartItems: prepareCartItems(checkoutItems),
                totalProductPrice: subtotal,
                shippingFee,
                totalPrice: total,
                voucherCodes: [promotionInput, freeshipInput].filter(Boolean),
                freeShipDiscount: 0,
                promotionDiscount: discount,
                note: value.note || "",
            };
            console.log("📦 Thông tin đơn hàng gửi lên:", orderRequest);

            console.log("🔄 Đang gửi yêu cầu đặt hàng...");
            const orderResponse = await orderApi.placeOrder(orderRequest);
            console.log("✅ Kết quả đặt hàng:", orderResponse);

            const newOrderId = orderResponse?.data?.id;
            console.log("🆔 ID đơn hàng mới:", newOrderId);

            if (!newOrderId) {
                console.error("❌ Không nhận được ID đơn hàng");
                throw new Error('Không nhận được ID đơn hàng');
            }
            setOrderId(newOrderId);

            if (paymentMethod === 'MOMO') {
                try {
                    console.log("💳 Đang tạo thanh toán MoMo cho đơn hàng:", newOrderId);
                    const { data } = await paymentApi.createMomoPayment(newOrderId);
                    console.log('📦 Kết quả API thanh toán MoMo:', JSON.stringify(data, null, 2));
                    console.log('🔗 URL thanh toán MoMo:', data);

                    if (!data || typeof data !== 'string' || !data.startsWith('http')) {
                        console.error("❌ URL thanh toán MoMo không hợp lệ:", data);
                        throw new Error("Không nhận được liên kết thanh toán hợp lệ");
                    }
                    console.log("🔄 Chuyển hướng đến trang thanh toán MoMo:", data);
                    window.location.href = data;
                } catch (error) {
                    console.error("❌ Lỗi thanh toán MoMo:", error);
                    console.error("❌ Chi tiết lỗi:", error.response?.data || error.message);
                    alert("Lỗi thanh toán: " + error.message);
                }
            } else if (paymentMethod === 'VN_PAY') {
                try {
                    console.log("💳 Đang tạo thanh toán VN_PAY cho đơn hàng:", newOrderId);
                    const { data } = await paymentApi.createVNpayPayment(newOrderId);
                    console.log('📦 Kết quả API thanh toán VN_PAY:', JSON.stringify(data, null, 2));
                    console.log('🔗 URL thanh toán VN_PAY:', data);

                    if (!data || typeof data !== 'string' || !data.startsWith('http')) {
                        console.error("❌ URL thanh toán VN_PAY không hợp lệ:", data);
                        throw new Error("Không nhận được liên kết thanh toán hợp lệ");
                    }
                    console.log("🔄 Chuyển hướng đến trang thanh toán VN_PAY:", data);
                    window.location.href = data;
                } catch (error) {
                    console.error("❌ Lỗi thanh toán VN_PAY:", error);
                    console.error("❌ Chi tiết lỗi:", error.response?.data || error.message);
                    alert("Lỗi thanh toán: " + error.message);
                }
            } else {
                console.log("✅ Đặt hàng thành công với phương thức thanh toán:", paymentMethod);
                console.log("🔄 Chuẩn bị chuyển hướng đến trang cảm ơn...");
                setShouldRedirect(true);
            }
        } catch (error) {
            console.error("❌ Lỗi khi đặt hàng:", error);
            console.error("❌ Chi tiết lỗi:", error.response?.data || error.message);
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
                    <DeliveryMethod onChange={(method) => setDeliveryMethod(method)} />
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
                        <FormControl sx={{ flex: 1, marginRight: 1 }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                <Autocomplete
                                    freeSolo
                                    options={voucherOptions.filter(v => v.type === 'PROMOTION')}
                                    getOptionLabel={(option) => option.code || ''}
                                    onFocus={handleVoucherFocus}
                                    value={voucherOptions.find(v => v.code === promotionInput) || null}
                                    inputValue={promotionInput}
                                    onInputChange={(event, newInputValue) => setPromotionInput(newInputValue)}
                                    onChange={(event, newValue) => {
                                    if (newValue && newValue.code) {
                                        setPromotionInput(newValue.code);
                                        setPromotionDiscount(newValue.discountRate || 0);
                                    } else {
                                        setPromotionInput('');
                                        setPromotionDiscount(0);
                                    }
                                    }}
                                    renderOption={(props, option, { index }) => (
                                    <li {...props} key={option.id || `promotion-${index}`}>
                                        <div>
                                        <strong>{option.code}</strong>
                                        <div style={{ fontSize: 12, color: '#888' }}>
                                            {option.discountRate ? `${option.discountRate}% khuyến mãi` : ''}
                                        </div>
                                        </div>
                                    </li>
                                    )}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Mã khuyến mãi"
                                        sx={{
                                        '& .MuiInputBase-root': {
                                            height: 47,
                                        },
                                        }}
                                    />
                                    )}
                                />
                                </div>
                            <div style={{ flex: 1 }}>
                                <Autocomplete
                                    freeSolo
                                    options={voucherOptions.filter(v => v.type === 'FREESHIP')}
                                    getOptionLabel={(option) => option.code || ''}
                                    onFocus={handleVoucherFocus}
                                    value={voucherOptions.find(v => v.code === freeshipInput) || null}
                                    inputValue={freeshipInput}
                                    onInputChange={(event, newInputValue) => setFreeshipInput(newInputValue)}
                                    onChange={(event, newValue) => {
                                    if (newValue && newValue.code) {
                                        setFreeshipInput(newValue.code);
                                        setFreeShipDiscount(newValue.discountRate || 0);
                                    } else {
                                        setFreeshipInput('');
                                        setFreeShipDiscount(0);
                                    }
                                    }}
                                    renderOption={(props, option, { index }) => (
                                    <li {...props} key={option.id || `freeship-${index}`}>
                                        <div>
                                        <strong>{option.code}</strong>
                                        <div style={{ fontSize: 12, color: '#888' }}>
                                            Miễn phí vận chuyển
                                        </div>
                                        </div>
                                    </li>
                                    )}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Mã freeship"
                                        sx={{
                                        '& .MuiInputBase-root': {
                                            height: 47,
                                        },
                                        }}
                                    />
                                    )}
                                />
                                </div>
                            </div>
                            </FormControl>
                            <Button
                                title="Sử dụng"
                                onClick={applyVoucher}
                                variant="contained"
                                sx={{ height: 47, minWidth: 100 }}
                            >
                                SỬ DỤNG
                            </Button>
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
                            <span className="value">{rawShippingFee.toLocaleString()}đ</span>
                        </div>
                        <div className="line"></div>
                        <div className="overall">
                            <span className="text total">Tổng cộng</span>
                            <span className="value total">{finalTotal.toLocaleString()}đ</span>
                        </div>
                    </div>
                </div>
            </Grid2>
        </Grid2>
    );
}

export default MakeOrder;
