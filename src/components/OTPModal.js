import React, { useState } from 'react';
import Modal from 'react-modal';

const OTPModal = ({ show, onVerify, onClose }) => {
  const [otp, setOTP] = useState('');

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleVerify = () => {
    onVerify(otp);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="OTP Verification"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={handleOTPChange}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerify}>Verify</button>
    </Modal>
  );
};

export default OTPModal;