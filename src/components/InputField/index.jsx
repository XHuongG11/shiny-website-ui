import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

function InputField({
  control,
  name,
  label,
  disabled,
  height,
  width,
  variant = "outlined",
  type = "text",
  InputProps,
}) {
  return (
    <div style={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            type={type}
            error={!!fieldState?.error}
            variant={variant}
            {...field}
            disabled={disabled}
            label={label}
            helperText={fieldState?.error?.message}
            InputProps={InputProps} // Pass InputProps to TextField
            sx={{
              "& .MuiInputBase-root": { height: height, width: width },
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
}

InputField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  InputProps: PropTypes.object,
};
export default InputField;
