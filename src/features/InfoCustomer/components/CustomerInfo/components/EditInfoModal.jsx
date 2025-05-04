//đây là cửa sổ nhỏ để người dùng sửa thông tin cá nhân
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { HiMiniXMark } from "react-icons/hi2";
import InputField from "../../../../../components/InputField";
import styles from "./EditInfoModal.module.css"; // Import CSS cho modal
import { useDispatch } from "react-redux";
import { update } from "../../../../LoginSignin/store/authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditInfoModal = ({ onClose, infoCus }) => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        /(84|0[2|3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại không hợp lệ"
      ),
    dob: yup.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: infoCus?.fullName,
      phone: infoCus?.phone,
      dob: infoCus?.dob,
      gender: infoCus?.gender,
    },
    resolver: yupResolver(schema),
  });

  const hanldeEditInfoSubmit = (values) => {
    console.log(values);
    const userRequest = {
      username: infoCus.username,
      email: infoCus.email,
      phone: values.phone || infoCus.phone,
      fullName: values.fullName || infoCus.fullName,
      dob: values.dob || infoCus.dob,
      gender: values.gender || infoCus.gender,
      status: infoCus.status,
    };
    dispatch(update(userRequest));
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>CHỈNH SỬA THÔNG TIN</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <HiMiniXMark />
          </button>
        </div>
        <hr />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(hanldeEditInfoSubmit)}>
            <div className={styles.inputGroup}>
              <InputField
                control={control}
                name="fullName"
                label="Họ và tên"
                height={53}
                variant="filled"
              />
              <InputField
                control={control}
                name="phone"
                label="Số điện thoại"
                height={53}
                variant="filled"
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Ngày sinh"
                    format="DD/MM/YYYY"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) =>
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      )
                    }
                  />
                )}
              />

              <FormControl error={!!errors?.gender}>
                {/* Address selection */}
                <InputLabel id="gender">Giới tính</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Giới tính"
                      labelId="gender"
                      sx={{ height: 53 }}
                      value={field.value || ""}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                    >
                      <MenuItem id={1} value="MALE">
                        Nam
                      </MenuItem>
                      <MenuItem id={2} value="FEMALE">
                        Nữ
                      </MenuItem>
                      <MenuItem id={2} value="OTHER">
                        Other
                      </MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            </div>

            <button className={styles.submitBtn}>Lưu</button>
          </form>
        </LocalizationProvider>
      </div>
    </div>
  );
};

EditInfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  infoCus: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    dob: PropTypes.string,
    status: PropTypes.string,
    gender: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default EditInfoModal;
