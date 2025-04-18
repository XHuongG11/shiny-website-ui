import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

function PaymentMethod({ onChange }) {
    const [paymentOption, setPaymentOption] = useState('MOMO');
    
    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
        if (onChange) onChange(event.target.value);
    }

    return (
        <div className="payment-method">
            <FormControl>
                <FormLabel 
                    sx={{ 
                        fontSize: '18.5px', 
                        fontWeight: 'bold', 
                        color: (theme) => theme.palette.primary.main 
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
                    <FormControlLabel 
                        className={`form-control-label payment ${paymentOption === 'VNPAY' ? 'active' : ''}`}
                        sx={{ margin: '0px', borderRadius: '5px 5px 0 0' }}
                        control={
                            <Radio sx={{
                                color: '',
                                '&.Mui-checked': { color: '#f5918a' },
                            }} />
                        }
                        value='VNPAY' 
                        label={
                            <div className="payment-option">
                                <img 
                                    src="https://vnpay.vn/wp-content/uploads/2021/07/logo-vnpay-vector-1.svg" 
                                    alt="VNPAY" 
                                    className="payment-icon" 
                                />
                                <span>Thanh toán online qua VNPAY</span>
                            </div>
                        } 
                    />

                    <FormControlLabel 
                        className={`form-control-label payment ${paymentOption === 'MOMO' ? 'active' : ''}`}
                        sx={{ margin: '0px' }}
                        control={
                            <Radio sx={{
                                color: '',
                                '&.Mui-checked': { color: '#f5918a' },
                            }} />
                        }
                        value='MOMO' 
                        label={
                            <div className="payment-option">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" 
                                    alt="MoMo" 
                                    className="payment-icon" 
                                />
                                <span>Ví điện tử MoMo</span>
                            </div>
                        } 
                    />

                    <FormControlLabel 
                        className={`form-control-label payment ${paymentOption === 'COD' ? 'active' : ''}`}
                        sx={{ margin: '0px', borderRadius: '0 0 5px 5px' }}
                        control={
                            <Radio sx={{
                                color: '',
                                '&.Mui-checked': { color: '#f5918a' },
                            }} />
                        }
                        value='COD' 
                        label={
                            <div className="payment-option">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png" 
                                    alt="COD" 
                                    className="payment-icon" 
                                />
                                <span>Thanh toán khi nhận hàng (COD)</span>
                            </div>
                        } 
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default PaymentMethod;