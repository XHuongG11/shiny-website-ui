import { useState } from 'react';
import PropTypes from 'prop-types';
import paymentApi from '../../api/paymentApi';
import { Button, Modal, CircularProgress } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const MomoPaymentButton = ({ orderId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await paymentApi.createMomoPayment(orderId);
      
      if (response.data?.data) {
        setPaymentUrl(response.data.data);
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<QrCode2Icon />}
        onClick={handlePayment}
        disabled={loading}
        sx={{ mt: 2, width: '100%' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Thanh toán bằng Momo QR'}
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="momo-qr-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          width: '350px'
        }}>
          <h2 id="momo-qr-modal">Quét mã QR để thanh toán</h2>
          {paymentUrl ? (
            <>
              <iframe 
                src={paymentUrl}
                style={{
                  width: '300px',
                  height: '400px',
                  border: 'none',
                  marginBottom: '20px'
                }}
                title="Momo Payment"
              />
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  window.open(paymentUrl, '_blank');
                  onSuccess?.();
                }}
                fullWidth
              >
                Mở ứng dụng Momo
              </Button>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Modal>
    </>
  );
};

MomoPaymentButton.propTypes = {
  orderId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onSuccess: PropTypes.func
};

MomoPaymentButton.defaultProps = {
  onSuccess: () => {}
};

export default MomoPaymentButton;