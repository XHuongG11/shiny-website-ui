import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import "./styles.css";
import PropTypes from "prop-types";
import useAddress from "../../../../utils/hooks/address";

const UserInfoForm = forwardRef(({ addresses, onSubmit }, ref) => {
  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    fetchProvinces,
  } = useAddress();

  const [selectedAddress, setSelectedAddress] = useState("");

  // Khai báo schema validation cho form
  const schema = yup.object().shape({
    userName: yup.string().required("Vui lòng nhập họ và tên."),
    discount: yup.string(),
    phoneNumber: yup
      .string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    houseNumber: yup.string().required("Vui lòng nhập địa chỉ."),
    city: yup.string().required("Vui lòng chọn tỉnh/thành."),
    district: yup.string().required("Vui lòng chọn quận/huyện."),
    ward: yup.string().required("Vui lòng chọn phường/xã."),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      discount: "",
      houseNumber: "",
      phoneNumber: "",
      city: "",
      district: "",
      ward: "",
    },
    resolver: yupResolver(schema),
  });

  // Xử lý khi chọn địa chỉ từ dropdown
  const handleChangeAddress = (event) => {
    const addressId = event.target.value;
    setSelectedAddress(addressId);

    if (addressId) {
      // Tìm địa chỉ đã chọn trong danh sách
      const selectedAddr = addresses.find((addr) => addr.id === addressId);
      if (selectedAddr) {
        // Cập nhật các trường form với thông tin từ địa chỉ đã chọn
        setValue("userName", selectedAddr.recipient_name || "");
        setValue("phoneNumber", selectedAddr.recipient_phone || "");
        setValue("houseNumber", selectedAddr.address || "");
        setValue("city", selectedAddr.province || "");
        setValue("district", selectedAddr.district || "");
        setValue("ward", selectedAddr.village || "");

        // Cập nhật danh sách quận/huyện và phường/xã
        if (selectedAddr.province) {
          handleProvinceChange(selectedAddr.province);
        }
        if (selectedAddr.district) {
          handleDistrictChange(selectedAddr.district);
        }
      }
    }
  };

  // Xử lý khi form được submit
  const onSubmitHandler = (values) => {
    if (onSubmit) {
      // Thêm addressId vào dữ liệu form nếu người dùng đã chọn địa chỉ có sẵn
      onSubmit({
        ...values,
        addressId: selectedAddress || "",
      });
    }
  };

  // Fetch danh sách tỉnh/thành khi component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <form
      ref={ref}
      className="user-form"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormControl fullWidth>
        {/* Dropdown chọn địa chỉ có sẵn */}
        <InputLabel id="address-label">Chọn địa chỉ</InputLabel>
        <Select
          value={selectedAddress}
          id="address"
          label="Chọn địa chỉ"
          onChange={handleChangeAddress}
          labelId="address-label"
          sx={{ height: 47 }}
        >
          <MenuItem value="">
            <em>Thêm địa chỉ mới</em>
          </MenuItem>
          {addresses &&
            addresses.length > 0 &&
            addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {`${address.address || ""}, ${address.village || ""}, ${
                  address.district || ""
                }, ${address.province || ""}`}
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
        <FormControl error={!!errors?.city} fullWidth>
          <InputLabel id="tinh-thanh">Tỉnh / thành *</InputLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Tỉnh / thành *"
                labelId="tinh-thanh"
                value={
                  provinces.some((d) => d.name === field.value)
                    ? field.value
                    : ""
                }
                sx={{ height: 47 }}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  handleProvinceChange(event.target.value);
                  // Reset district and ward when province changes
                  setValue("district", "");
                  setValue("ward", "");
                }}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.code} value={province.name}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.city?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors?.district} fullWidth>
          <InputLabel id="quan-huyen">Quận / huyện *</InputLabel>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Quận / huyện *"
                labelId="quan-huyen"
                value={
                  districts.some((d) => d.name === field.value)
                    ? field.value
                    : ""
                }
                onChange={(event) => {
                  field.onChange(event.target.value);
                  handleDistrictChange(event.target.value);
                  // Reset ward when district changes
                  setValue("ward", "");
                }}
                sx={{ height: 47 }}
              >
                {districts.map((district) => (
                  <MenuItem key={district.code} value={district.name}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.district?.message}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors?.ward} fullWidth>
          <InputLabel id="phuong-xa">Phường / xã *</InputLabel>
          <Controller
            name="ward"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Phường / xã *"
                labelId="phuong-xa"
                value={
                  wards.some((d) => d.name === field.value) ? field.value : ""
                }
                onChange={(event) => field.onChange(event.target.value)}
                sx={{ height: 47 }}
              >
                {wards.map((ward) => (
                  <MenuItem key={ward.code} value={ward.name}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.ward?.message}</FormHelperText>
        </FormControl>
      </div>
    </form>
  );
});

UserInfoForm.displayName = "UserInfoForm";
UserInfoForm.propTypes = {
  addresses: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserInfoForm;
