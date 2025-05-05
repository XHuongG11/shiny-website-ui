import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CompleteOrder.module.css';
import { Box, Typography, Button, Container, Paper, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useParams, useNavigate } from 'react-router-dom';
import orderApi from '../../api/orderApi';

CompleteOrder.propTypes = {
  orderNumber: PropTypes.string,
};

function CompleteOrder() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkOrderExistence = async () => {
      try {
        await orderApi.getOrder(orderId);
      } catch (error) {
        console.error("Không thể tải thông tin đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    const animTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);

    if (orderId) {
      checkOrderExistence();
    } else {
      setLoading(false);
      navigate('/error/404');
    }

    return () => clearTimeout(animTimer);
  }, [orderId, navigate]);

  // Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className={styles.completeOrderPage}>
        <Container className={styles.mainContainer}>
          <Box className={styles.loadingContainer}>
            <CircularProgress className={styles.loadingSpinner} />
            <Typography>Đang xác nhận thông tin đơn hàng...</Typography>
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.completeOrderPage}>
      <Container className={styles.mainContainer}>
        <Paper elevation={3} className={styles.orderCompleteCard}>
          <Box className={`${styles.checkIconContainer} ${animationComplete ? styles.animated : ''}`}>
            <CheckCircleOutlineIcon className={styles.checkIcon} />
          </Box>

          <Typography variant="h4" component="h1" className={styles.thankYouTitle}>
            Cảm ơn bạn đã đặt hàng!
          </Typography>

          <Typography variant="body1" className={styles.orderMessage}>
            Đơn hàng <strong>#{orderId}</strong> đã được xác nhận thành công
          </Typography>

          <Box className={styles.orderDetailBox}>
            <Typography variant="body1" className={styles.orderDetail}>
              Chúng tôi đã gửi email xác nhận đơn hàng cùng thông tin chi tiết tới địa chỉ email của bạn.
            </Typography>

            <Typography variant="body1" className={styles.shippingInfo}>
              Sản phẩm sẽ được đóng gói cẩn thận và giao tới bạn trong thời gian sớm nhất.
            </Typography>
          </Box>

          <Box className={styles.buttonContainer}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Button variant="contained" className={styles.continueShoppingBtn}>
                Tiếp tục mua sắm
              </Button>
            </Link>
            <Link to={`/myorder/orderdetail/${orderId}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" className={styles.trackOrderBtn}>
                Xem chi tiết đơn hàng
              </Button>
            </Link>
          </Box>

          <Box className={styles.additionalInfo}>
            <Typography variant="body2">
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với dịch vụ khách hàng của chúng tôi
            </Typography>
            <Typography variant="body2" className={styles.contactInfo}>
              Email: support@shiny.com | Hotline: 1800-888-999
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default CompleteOrder;