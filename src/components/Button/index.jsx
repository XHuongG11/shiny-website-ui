import ButtonMaterial from '@mui/material/Button';
import PropTypes from 'prop-types';

function MyButton({ title = 'Button',
    variant = "contained", color = 'primary',
    height = '36.5px', onClick = null, type = 'button' }) {

    const handleOnClick = () => {
        if (!onClick) return;
        onClick();
    }

    return (
        <ButtonMaterial variant={variant} color={color}
            height={height} type={type}
            onClick={handleOnClick}
        >{title}</ButtonMaterial>
    );
}

MyButton.propTypes = {
    title: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};

export default MyButton;