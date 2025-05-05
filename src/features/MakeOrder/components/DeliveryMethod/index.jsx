import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

DeliveryMethod.propTypes = {
    onChange: PropTypes.func, // nhận hàm callback từ cha
};

function DeliveryMethod({ onChange }) {
    const [deliveryOption, setDeliveryOption] = useState('STANDARD');

    const handleDeliveryOptionChange = (event) => {
        const value = event.target.value;
        setDeliveryOption(value);
        if (onChange) {
            onChange(value); // gọi callback để báo cho cha biết
        }
    };

    useEffect(() => {
        if (onChange) {
            onChange(deliveryOption); // khi mount lần đầu cũng báo lên cha
        }
    }, []);

    return (
        <div className="delivery-method">
            <FormControl>
                <FormLabel
                    sx={{
                        fontSize: '18.5px',
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.primary.main,
                    }}
                    id='delivery-option-label'
                >
                    Phương thức vận chuyển
                </FormLabel>
                <RadioGroup
                    aria-labelledby='delivery-option-label'
                    name='delivery-radio-group'
                    value={deliveryOption}
                    onChange={handleDeliveryOptionChange}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        border: '1px solid black',
                    }}
                >
                    <FormControlLabel
                        sx={{ margin: '0px' }}
                        control={
                            <Radio
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#f5918a',
                                    },
                                }}
                            />
                        }
                        value='STANDARD'
                        label='Giao hàng tiêu chuẩn (7-10 ngày)'
                    />
                    <FormControlLabel
                        sx={{ margin: '0px' }}
                        control={
                            <Radio
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#f5918a',
                                    },
                                }}
                            />
                        }
                        value='EXPRESS'
                        label='Giao hàng hỏa tốc (1-2 ngày)'
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default DeliveryMethod;
