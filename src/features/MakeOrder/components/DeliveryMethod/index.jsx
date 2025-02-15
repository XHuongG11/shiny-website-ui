import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

DeliveryMethod.propTypes = {

};

function DeliveryMethod() {
    const [deliveryOption, setDeliveryOption] = useState('standard');

    const handleDeliveryOptionChange = (event) => {
        setDeliveryOption(event.target.value);
    }
    return (
        <div className="delivery-method">
            <FormControl >
                <FormLabel sx={{ fontSize: '18.5px', fontWeight: 'bold', color: (theme) => theme.palette.primary.main, }}
                    id='delivery-option-label'> Phương thức vẩn chuyển</FormLabel>
                <RadioGroup
                    aria-labelledby='delivery-option-label'
                    name='delivery-radio-group'
                    value={deliveryOption}
                    onChange={handleDeliveryOptionChange}
                    sx={{
                        display: 'flex', flexDirection: 'column',
                        borderRadius: '5px', border: '1px solid black',
                    }}
                >
                    <FormControlLabel
                        sx={{ margin: '0px' }}
                        control={<Radio sx={{
                            color: '',
                            '&.Mui-checked': {
                                color: '#f5918a',
                            },

                        }} />}
                        value='standard' label='Giao hàng tiêu chuẩn (7-10 ngày) 15,000đ' />
                    <FormControlLabel
                        sx={{ margin: '0px' }}
                        control={<Radio sx={{
                            color: '',
                            '&.Mui-checked': {
                                color: '#f5918a',
                            },

                        }} />}
                        value='express' label='Giao hàng hỏa tốc (1-2 ngày) 40,000đ' />

                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default DeliveryMethod;