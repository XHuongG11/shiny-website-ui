import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

function PaymentMethod({ onChange }) {
    // Danh sách các phương thức thanh toán
    const paymentMethods = [
        {
            value: 'VN_PAY',
            label: 'Thanh toán online qua VNPAY',
            icon: 'https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg',
        },
        {
            value: 'MOMO',
            label: 'Ví điện tử MoMo',
            icon: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
        },
        {
            value: 'COD',
            label: 'Thanh toán khi nhận hàng (COD)',
            icon: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png',
        }
    ];

    // State lưu trữ phương thức thanh toán được chọn
    const [paymentOption, setPaymentOption] = useState(paymentMethods[2].value);

    // Hàm xử lý khi người dùng thay đổi phương thức thanh toán
    const handlePaymentOptionChange = (event) => {
        const selectedOption = event.target.value;
        setPaymentOption(selectedOption);  // Cập nhật trạng thái với phương thức thanh toán mới
        if (onChange) {
            onChange(selectedOption);  // Truyền dữ liệu lên parent component
        }
    };

    return (
        <div className="payment-method">
            <FormControl>
                <FormLabel
                    sx={{
                        fontSize: '18.5px',
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.primary.main,
                    }}
                    id='payment-option-label'
                >
                    Phương thức thanh toán
                </FormLabel>
                <RadioGroup
                    aria-labelledby='payment-option-label'
                    name='payment-radio-group'
                    value={paymentOption}
                    onChange={handlePaymentOptionChange}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        border: '1px solid black',
                    }}
                >
                    {paymentMethods.map((method) => (
                        <FormControlLabel
                            key={method.value}  // Đảm bảo mỗi tùy chọn có một key duy nhất
                            className={`form-control-label payment ${paymentOption === method.value ? 'active' : ''}`}
                            sx={{ margin: '0px' }}
                            control={
                                <Radio sx={{
                                    color: '',
                                    '&.Mui-checked': { color: '#f5918a' },
                                }} />
                            }
                            value={method.value}
                            label={
                                <div className="payment-option">
                                    <img
                                        src={method.icon}
                                        alt={method.label}
                                        className="payment-icon"
                                    />
                                    <span>{method.label}</span>
                                </div>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default PaymentMethod;
