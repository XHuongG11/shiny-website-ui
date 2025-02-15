import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E1E1E', // Màu chính
            light: '#0d0d0d', // Màu nhạt hơn
            dark: '#2b2b2b', // Màu đậm hơn
            contrastText: '#FFFFFF', // Màu chữ tương phản
        },
        secondary: {
            main: '#E0C2FF',
            light: '#F5EBFF',
            dark: '#B490CC',
            contrastText: '#47008F',
        },
        // Tạo thêm màu sắc khác
        error: {
            main: '#FF1744', // Màu thông báo lỗi
            light: '#FF4569',
            dark: '#B2102F',
        },
        warning: {
            main: '#FFA000', // Màu cảnh báo
            light: '#FFC046',
            dark: '#C67100',
        },
        success: {
            main: '#4CAF50', // Màu thành công
            light: '#80E27E',
            dark: '#087F23',
        },
        info: {
            main: '#2196F3', // Màu thông tin
            light: '#64B5F6',
            dark: '#0B79D0',
        },
        // Màu nền và màu chữ mặc định
        background: {
            default: '#F5F5F5', // Màu nền tổng thể
            paper: '#FFFFFF', // Màu nền của các thành phần như Card
        },
        text: {
            primary: '#333333', // Màu chữ chính
            secondary: '#777777', // Màu chữ phụ
        },
    },
});

export default theme;
