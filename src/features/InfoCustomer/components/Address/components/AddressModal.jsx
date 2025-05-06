//đây là cửa sổ nhỏ để người dùng điền thông tin thêm địa chỉ

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiMiniXMark } from "react-icons/hi2";
import * as yup from "yup";
import useAddress from "../../../../../utils/hooks/address";
import InputField from "../../../../../components/InputField";
import styles from "./AddressModal.module.css"; // Import CSS cho modal
import userApi from "../../../../../api/userApi";

const AddressModal = ({ onClose = () => { }, action, address, onUpdate }) => {
  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    loadAddress,
    fetchProvinces,
  } = useAddress();

  const schema = yup.object().shape({
    receiver: yup.string().required("Please enter value."),
    phonenumber: yup
      .string()
      .required("Please enter value.")
      .matches(
        /(84|0[2|3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại không hợp lệ"
      ),
    houseNumber: yup.string().required("Please enter value."),
    city: yup.string().required("Please select value."),
    district: yup.string().required("Please select value."),
    ward: yup.string().required("Please select value."),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      receiver: address?.recipientName || "",
      phonenumber: address?.recipientPhone || "",
      houseNumber: address?.address || "",
      city: "",
      district: "",
      ward: "",
      isDefault: address?.default,
    },
    resolver: yupResolver(schema),
  });

  // hàm này để load dữ liệu địa chỉ khi mở form
  useEffect(() => {
    if (action === "EDIT") {
      const fetchAddress = async (address) => {
        await loadAddress(address);
        setValue("city", address?.province || "");
        setValue("district", address?.district || "");
        setValue("ward", address?.village || "");
      };
      fetchAddress(address);
    } else {
      fetchProvinces();
    }
  }, []);

  const handleAddressSubmit = (values) => {
    const request = {
      recipientName: values.receiver,
      recipientPhone: values.phonenumber,
      province: values.city,
      district: values.district,
      village: values.ward,
      address: values.houseNumber,
    };
    if (action === "ADD") {
      userApi
        .addAddress(request)
        .then((response) => {
          onUpdate(response.data, false);
          const newAddress = response.data;
          if (values.isDefault === true) {
            userApi
              .setDefaultAddress(response.data?.id)
              .then(() => {
                newAddress.default = true;
                onUpdate(newAddress, false);
                onClose();
              })
              .catch((error) => {
                console.log(error);
              });
          }
          onClose();
        })
        .catch((error) => console.error("Them that bai:", error));
    } else {
      userApi
        .updateAddress(address.id, request)
        .then((response) => {
          onUpdate(response.data, false);
          const newAddress = response.data;
          if (values.isDefault === true) {
            userApi
              .setDefaultAddress(response.data?.id)
              .then(() => {
                newAddress.default = true;
                onUpdate(newAddress, false);
                onClose();
              })
              .catch((error) => {
                console.log(error);
              });
          }
          onClose();
        })
        .catch((error) => console.error("Sua that bai:", error));
    }
  };
  return (
    <form
      className={styles.modalOverlay}
      onSubmit={handleSubmit(handleAddressSubmit)}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {action === "ADD" ? (
            <h2>THÊM ĐỊA CHỈ</h2>
          ) : (
            <h2>CHỈNH SỬA ĐỊA CHỈ</h2>
          )}
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            <HiMiniXMark />
          </button>
        </div>
        <hr />
        <h3 style={{ fontWeight: "bold" }}>Thông tin người nhận</h3>
        <Grid2 container spacing={2}>
          <InputField
            control={control}
            name="receiver"
            label="Tên người nhận *"
            height={53}
            variant="filled"
          />
          <InputField
            control={control}
            name="phonenumber"
            label="Số điện thoại *"
            height={53}
            variant="filled"
          />
        </Grid2>

        <h3 style={{ fontWeight: "bold" }}>Địa chỉ</h3>
        <div className={styles.inputGroup}>
          <FormControl error={!!errors?.city}>
            {/* Address selection */}
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
                  sx={{ height: 53 }}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    handleProvinceChange(event.target.value);
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

          <FormControl error={!!errors?.district}>
            {/* Address selection */}
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
                  }}
                  sx={{ height: 53 }}
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

          <FormControl error={!!errors?.ward}>
            {/* Address selection */}
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
                  sx={{ height: 53 }}
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
          <InputField
            control={control}
            name="houseNumber"
            label="Nhập số nhà, địa chỉ *"
            height={53}
            variant="filled"
          />
          <FormControlLabel
            control={
              <Controller
                name="isDefault"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                )}
              />
            }
            label="Đặt làm địa chỉ mặc định."
          />
        </div>
        <button className={styles.submitBtn}>Hoàn thành</button>
      </div>
    </form>
  );
};

AddressModal.propTypes = {
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  address: PropTypes.object,
  onUpdate: PropTypes.func,
};
export default AddressModal;
