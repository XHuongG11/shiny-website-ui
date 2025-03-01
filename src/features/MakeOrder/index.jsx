import { FormControl, Grid2, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import DeliveryMethod from './components/DeliveryMethod';
import PaymentMethod from './components/PaymentMethod';
import ProductItem from './components/ProductItem';
import UserInfoForm from './components/UserInfoForm';
import './styles.css';

MakeOrder.propTypes = {

};

function MakeOrder() {

    // danh sách địa chỉ của khách hàng
    const addresses = [
        { id: 1, houseNumber: "123", ward: "Phường Dịch Vọng Hậu", district: "Quận Cầu Giấy", city: "Hà Nội", },
        {
            id: 2,
            houseNumber: "456",
            ward: "Phường Hòa Cường Bắc",
            district: "Quận Hải Châu",
            city: "Đà Nẵng",
        },
        {
            id: 3,
            houseNumber: "789",
            ward: "Phường Bến Nghé",
            district: "Quận 1",
            city: "TP. Hồ Chí Minh",
        },
        {
            id: 4,
            houseNumber: "12",
            ward: "Phường Vĩnh Ninh",
            district: "TP. Huế",
            city: "Thừa Thiên Huế",
        },
        {
            id: 5,
            houseNumber: "34",
            ward: "Phường Tân Lập",
            district: "TP. Nha Trang",
            city: "Khánh Hòa",
        },
    ];

    // Các useState
    const [shouldRedirect, setShouldRedirect] = useState(false); // Điều kiện để chuyển hướng

    // navigate handle chuyển trang
    const navigate = useNavigate();
    useEffect(() => {
        if (shouldRedirect) {
            navigate("/checkouts/thank-you");
        }
    }, [shouldRedirect, navigate]);


    // function handle chuyển trang khi người dùng hoàn tất thanh toán
    function handleFormSubmit(value) {
        console.log(value);
        setShouldRedirect(true);
    }

    const formRef = useRef(null);

    return (
        <Grid2 container spacing={3} sx={{ justifyContent: "center", backgroundColor: ' #f9f9f9', marginTop: "30px", marginBottom: "30px" }} >
            <Grid2 size={{ sx: 11, sm: 5 }}>
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
                    <PaymentMethod />

                    <div className="payment-button">
                        <Link href="/cart" className="back-to-cart"> &lt; Giỏ Hàng</Link>
                        <Button title='Hoàn Tất Đơn Hàng' onClick={() => {
                            if (formRef.current) {
                                // trigger sự kiện submit
                                formRef.current.dispatchEvent(
                                    new Event('submit', { bubbles: true, cancelable: true })
                                );
                            }
                        }} />
                    </div>
                </div >
            </Grid2>

            <Grid2 size={{ xs: 11, sm: 4 }}>
                <div className="checkout-info">
                    <div className="list-checkout">
                        {/* Danh sách các sản phẩm */}
                        <ProductItem />
                        <ProductItem />
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
                        <div className="line">
                        </div>
                        <div className="estimate">
                            <span className="text">Tạm tính</span>
                            <span className="value">7,160,000đ</span>
                        </div>
                        <div className="reduce">
                            <span className="text">Giảm giá</span>
                            <span className="value">1,000,000đ</span>
                        </div>
                        <div className="delivery-cost">
                            <span className="text">Phí vận chuyển</span>
                            <span className="value">40,000đ</span>
                        </div>
                        <div className="line"></div>
                        <div className="overall">
                            <span className="text total">Tổng cộng</span>
                            <span className="value total">6,200,000đ</span>
                        </div>
                    </div>
                </div >
            </Grid2>

        </Grid2>
    );
}

export default MakeOrder;