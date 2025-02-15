import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { forwardRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/InputField';
import './styles.css';
import PropTypes from "prop-types";

const UserInfoForm = forwardRef(({ addresses, onSubmit }, ref) => {

    const [selectedAddress, setSelectedAddress] = useState(""); // Lưu địa chỉ được chọn
    // các event cho các Select Option
    const handleChangeAddress = (event) => {
        setSelectedAddress(event.target.value); // Cập nhật giá trị địa chỉ được chọn
    };
    // use form cho các input
    const schema = yup.object().shape({
        userName: yup.string().required("Please enter value."),
        discount: yup.string(),
        phoneNumber: yup.string().required("Please enter value."),
        houseNumber: yup.string().required("Please enter value."),
        city: yup.string().required("Please select a city."),
        district: yup.string().required("Please select a district."),
        ward: yup.string().required("Please select a ward."),
    });
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            discount: '',
            houseNumber: '',
            phoneNumber: '',
            city: '',
            district: '',
            ward: '',
        },
        resolver: yupResolver(schema),
    });


    const onSubmitHandler = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    };

    return (
        <form ref={ref} className="user-form" onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl >
                {/* Address selection */}
                <InputLabel id="address-label">Chọn địa chỉ</InputLabel>
                <Select value={selectedAddress} id='address'
                    label="Thêm địa chỉ mới" onChange={handleChangeAddress}
                    labelId="address-label"
                    sx={{ height: 47 }}>
                    {addresses.map(address => (
                        <MenuItem key={address.id} value={address.id}>
                            {`${address.houseNumber}, ${address.ward}, ${address.district}, ${address.city}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <InputField
                control={control}
                name="userName"
                label="Họ và tên *"
                height={47}
            />

            <InputField
                control={control}
                name="phoneNumber"
                label="Số điện thoại *"
                height={47}
            />

            <InputField
                control={control}
                name="houseNumber"
                label="Địa chỉ *"
                height={47}
            />

            <div className="form-row">
                <FormControl error={!!errors?.city}>
                    {/* Address selection */}
                    <InputLabel id="tinh-thanh">Tỉnh / thành *</InputLabel>
                    <Controller name='city' control={control}
                        render={({ field }) => (
                            <Select {...field}
                                label="Tỉnh / thành *"
                                labelId="tinh-thanh"
                                sx={{ height: 47 }}>
                                <MenuItem key='1' value='1'>Quảng Ngãi</MenuItem>
                                <MenuItem key='2' value='2'>Hồ Chí Minh</MenuItem>
                                <MenuItem key='3' value='3'>Đà Nẵng</MenuItem>
                            </Select>
                        )} />
                    <FormHelperText>{errors.city?.message}</FormHelperText>

                </FormControl>

                <FormControl error={!!errors?.district}>
                    {/* Address selection */}
                    <InputLabel id="quan-huyen">Quận / huyện *</InputLabel>
                    <Controller name='district' control={control}
                        render={({ field }) => (
                            <Select {...field}
                                label="Quận / huyện *"
                                labelId="quan-huyen"
                                sx={{ height: 47 }}>
                                <MenuItem key='1' value='1'>Quảng Ngãi</MenuItem>
                                <MenuItem key='2' value='2'>Hồ Chí Minh</MenuItem>
                                <MenuItem key='3' value='3'>Đà Nẵng</MenuItem>
                            </Select>
                        )} />
                    <FormHelperText>{errors.district?.message}</FormHelperText>
                </FormControl>

                <FormControl error={!!errors?.ward}>
                    {/* Address selection */}
                    <InputLabel id="phuong-xa">Phường / xã *</InputLabel>
                    <Controller name='ward' control={control}
                        render={({ field }) => (
                            <Select {...field}
                                label="Phường / xã *"
                                labelId="phuong-xa"
                                sx={{ height: 47 }}>
                                <MenuItem key='1' value='1'>Quảng Ngãi</MenuItem>
                                <MenuItem key='2' value='2'>Hồ Chí Minh</MenuItem>
                                <MenuItem key='3' value='3'>Đà Nẵng</MenuItem>
                            </Select>
                        )} />
                    <FormHelperText>{errors.ward?.message}</FormHelperText>
                </FormControl>
            </div>
        </form >
    );
});

UserInfoForm.displayName = "UserInfoForm";
UserInfoForm.propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default UserInfoForm;