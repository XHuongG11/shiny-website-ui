import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import "./styles.css";
import PropTypes from "prop-types";
import useAddress from "../../../../utils/hooks/address";
import customerAddressApi from "../../../../api/customerAddressApi"; // Đảm bảo đúng đường dẫn API


const UserInfoForm = forwardRef(({ onSubmit, onAddressChange }, ref) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await customerAddressApi.getCustomerAddresses();
        const fetchedAddresses = response.data.content || [];
        setAddresses(fetchedAddresses);

        // 🔍 Tìm địa chỉ mặc định
        const defaultAddress = fetchedAddresses.find((addr) => addr.default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
          setValue("addressId", defaultAddress.id);
          setIsFieldsDisabled(true); // Vô hiệu hóa các trường khi chọn địa chỉ mặc định

          // 🧠 Đặt các giá trị vào form
          setValue("userName", defaultAddress.recipientName || "");
          setValue("phoneNumber", defaultAddress.recipientPhone || "");
          setValue("houseNumber", defaultAddress.address || "");
          setValue("city", defaultAddress.province || "");
          await handleProvinceChange(defaultAddress.province);
          setValue("district", defaultAddress.district || "");
          await handleDistrictChange(defaultAddress.district);
          setValue("ward", defaultAddress.village || "");

          // Thông báo cho component cha về địa chỉ mặc định
          if (onAddressChange) {
            console.log("Gửi địa chỉ mặc định lên component cha:", defaultAddress);
            onAddressChange(defaultAddress);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const {
    provinces,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    fetchProvinces,
  } = useAddress();

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
    getValues,
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

  const handleChangeAddress = async (event) => {
    const addressId = event.target.value;

    if (!addressId) {
      // 👇 Nếu chọn "Thêm địa chỉ mới", clear form và cho phép chỉnh sửa
      setSelectedAddress("");
      setValue("userName", "");
      setValue("phoneNumber", "");
      setValue("houseNumber", "");
      setValue("city", "");
      setValue("district", "");
      setValue("ward", "");
      setIsFieldsDisabled(false); // Cho phép chỉnh sửa các trường
      setShowConfirmButton(true); // Hiển thị nút xác nhận

      // Thông báo cho component cha rằng không có địa chỉ được chọn
      if (onAddressChange) {
        onAddressChange(null);
      }
      return;
    }

    const id = Number(addressId);
    setSelectedAddress(id);
    setValue("addressId", id);
    setIsFieldsDisabled(true); // Vô hiệu hóa các trường khi chọn địa chỉ có sẵn

    const selectedAddr = addresses.find((addr) => addr.id === id);
    if (selectedAddr) {
      setValue("userName", selectedAddr.recipientName || "");
      setValue("phoneNumber", selectedAddr.recipientPhone || "");
      setValue("houseNumber", selectedAddr.address || "");
      setValue("city", selectedAddr.province || "");
      setValue("district", selectedAddr.district || "");
      setValue("ward", selectedAddr.village || "");

      await handleProvinceChange(selectedAddr.province);
      await handleDistrictChange(selectedAddr.district);
      setValue("ward", selectedAddr.village || "");

      // Thông báo cho component cha về địa chỉ đã chọn
      if (onAddressChange) {
        onAddressChange(selectedAddr);
      }
    }
  };

  // Hàm xác nhận địa chỉ mới
  // Hàm xác nhận địa chỉ mới
  const handleConfirmNewAddress = async () => {
    try {
      // Kiểm tra form hợp lệ trước khi submit
      const formValues = getValues();
      console.log("Giá trị form hiện tại:", formValues);

      // Kiểm tra thủ công các trường bắt buộc
      if (!formValues.userName || !formValues.phoneNumber || !formValues.houseNumber ||
        !formValues.city || !formValues.district || !formValues.ward) {
        alert("Vui lòng điền đầy đủ thông tin địa chỉ.");
        return;
      }

      // Tạo đối tượng địa chỉ mới từ form
      const newAddress = {
        recipientName: formValues.userName,
        recipientPhone: formValues.phoneNumber,
        address: formValues.houseNumber,
        province: formValues.city,
        district: formValues.district,
        village: formValues.ward,
        default: false // Mặc định không phải địa chỉ mặc định
      };

      console.log("Dữ liệu địa chỉ mới sẽ gửi lên:", newAddress);

      // Gọi API để lưu địa chỉ mới
      const response = await customerAddressApi.addAddress(newAddress);
      console.log("Kết quả từ API:", response);

      if (response && response.data) {
        console.log("Dữ liệu trả về từ API:", response.data);

        // Cập nhật danh sách địa chỉ
        const newAddressWithId = response.data;
        setAddresses(prev => [...prev, newAddressWithId]);

        // Chọn địa chỉ mới tạo
        setSelectedAddress(newAddressWithId.id);
        setValue("addressId", newAddressWithId.id);

        // Vô hiệu hóa các trường
        setIsFieldsDisabled(true);
        setShowConfirmButton(false);

        // Thông báo cho component cha về địa chỉ mới
        if (onAddressChange) {
          onAddressChange(newAddressWithId);
        }

        alert("Đã thêm địa chỉ mới thành công!");
      } else {
        throw new Error("API trả về dữ liệu không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ mới:", error);
      console.error("Chi tiết lỗi:", error.response?.data || error.message);

      // Hiển thị thông báo lỗi cụ thể hơn
      if (error.response?.data?.message) {
        alert(`Không thể thêm địa chỉ mới: ${error.response.data.message}`);
      } else {
        alert(`Không thể thêm địa chỉ mới: ${error.message}`);
      }
    }
  };

  // Xử lý khi form được submit
  const onSubmitHandler = (values) => {
    console.log("Form values:", selectedAddress);

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
          {addresses?.map((address) => (
            <MenuItem key={address.id} value={address.id}>
              {`${address.address || ""}, ${address.province || ""},  ${address.district || ""},${address.village || ""}`}
              {address.default ? " (Mặc định)" : ""}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
      {!isFieldsDisabled && (<InputField
        control={control}
        name="userName"
        label="Họ và tên *"
        height={47}
      />)}

      {!isFieldsDisabled && (<InputField
        control={control}
        name="phoneNumber"
        label="Số điện thoại *"
        height={47}
      />)}

      {!isFieldsDisabled && (<InputField
        control={control}
        name="houseNumber"
        label="Địa chỉ *"
        height={47}
        disabled={isFieldsDisabled}
      />)}

      {!isFieldsDisabled && (<div className="form-row">
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
                disabled={isFieldsDisabled}
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
                disabled={isFieldsDisabled}
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
                disabled={isFieldsDisabled}
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
      </div>)}

      {!isFieldsDisabled && (
        <Button
          className="add_address_button"
          variant="contained"
          color="primary"
          onClick={handleConfirmNewAddress}
          sx={{
            backgroundColor: '#000000',
            '&:hover': {
              backgroundColor: '#333333',
            }
          }}
        >
          Xác nhận địa chỉ mới
        </Button>
      )}
    </form>
  );
});

UserInfoForm.displayName = "UserInfoForm";
UserInfoForm.propTypes = {
  addresses: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddressChange: PropTypes.func, // Thêm prop type mới
};

export default UserInfoForm;
