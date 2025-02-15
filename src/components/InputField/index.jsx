import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

function InputField({ control, name, label, disabled, height, width }) {
    return (
        <div style={{ width: '100%' }}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <TextField error={!!fieldState?.error} variant="outlined"
                        {...field} disabled={disabled}
                        label={label} helperText={fieldState?.error?.message}
                        sx={{ '& .MuiInputBase-root': { height: height, width: width }, width: '100%' }} />
                )}
            />
        </div>
    );
}

InputField.propTypes = {
    control: PropTypes.object,  
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
  };
export default InputField;