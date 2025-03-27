//đây là cửa sổ nhỏ để người dùng điền thông tin thêm địa chỉ

import styles from "./AddressModal.module.css"; // Import CSS cho modal
import { HiMiniXMark } from "react-icons/hi2";
import PropTypes from 'prop-types';
import useAddress from '../../../../../assets/hook/address'
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../../../components/InputField";
import { FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const AddressModal = ({ isOpen = false, onClose = () => { } }) => {
  const { provinces, districts, wards, handleProvinceChange, handleDistrictChange } = useAddress();

  const schema = yup.object().shape({
    receiver: yup.string().required("VPlease enter value."),
    phonenumber: yup.string().required("Please enter value."),
    houseNumber: yup.string().required("Please enter value."),
    city: yup.string().required("Please select value."),
    district: yup.string().required("Please select value."),
    ward: yup.string().required("Please select value."),
  });
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {

    },
    resolver: yupResolver(schema),
  });

  const handleAddAddressSubmit = (values) => {
    console.log(values);
  }
  if (!isOpen) return null; // Nếu không mở thì ẩn modal
  return (
    <form className={styles.modalOverlay} onSubmit={handleSubmit(handleAddAddressSubmit)}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>THÊM ĐỊA CHỈ</h2>
          <button className={styles.closeBtn} onClick={onClose}><HiMiniXMark /></button>
        </div>
        <hr />
        <h3 style={{ fontWeight: "bold" }}>Thông tin người nhận</h3>
        <Grid2 container spacing={2}>
          {/* <input className={styles.text} type="text" placeholder="Tên người nhận" /> */}
          <InputField control={control} name="receiver" label="Tên người nhận *" height={53} variant="filled" />
          <InputField control={control} name="phonenumber" label="Số điện thoại *" height={53} variant="filled" />
        </Grid2>

        <h3 style={{ fontWeight: "bold" }}>Địa chỉ</h3>
        <div className={styles.inputGroup}>
          <FormControl error={!!errors?.city}>
            {/* Address selection */}
            <InputLabel id="tinh-thanh">Tỉnh / thành *</InputLabel>
            <Controller name='city' control={control}
              render={({ field }) => (
                <Select {...field}
                  label="Tỉnh / thành *"
                  labelId="tinh-thanh"
                  value={provinces.some(d => d.name === field.value) ? field.value : ""}
                  sx={{ height: 53 }}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    handleProvinceChange(event);
                  }}>
                  {provinces.map(province => (
                    <MenuItem key={province.code} value={province.name}>{province.name}</MenuItem>
                  ))}

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
                  value={districts.some(d => d.name === field.value) ? field.value : ""}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    handleDistrictChange(event);
                  }}
                  sx={{ height: 53 }}>
                  {districts.map(district => (
                    <MenuItem key={district.code} value={district.name}>{district.name}</MenuItem>
                  ))}
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
                  value={wards.some(d => d.name === field.value) ? field.value : ""}
                  onChange={(event) => field.onChange(event.target.value)}
                  sx={{ height: 53 }}>
                  {wards.map(ward => (
                    <MenuItem key={ward.code} value={ward.name}>{ward.name}</MenuItem>
                  ))}
                </Select>
              )} />
            <FormHelperText>{errors.ward?.message}</FormHelperText>
          </FormControl>
          <InputField control={control} name="houseNumber" label="Nhập số nhà, địa chỉ *" height={53} variant="filled" />
        </div>
        <button className={styles.submitBtn}>Hoàn thành</button>
      </div >
    </form >
  );
};

AddressModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};
export default AddressModal;
