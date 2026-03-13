import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Flash = ({ message, type = 'success', onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const truncateMessage = (msg, maxLength = 50) => {
    if (!msg) return '';
    if (msg.length <= maxLength) return msg;
    return msg.substring(0, maxLength) + '...';
  };

  if (!show || !message) return null;

  return (
    <div className="flash-container">
      <Alert 
        variant={type} 
        dismissible 
        onClose={() => {
          setShow(false);
          if (onClose) onClose();
        }}
        className="flash-alert"
      >
        <strong>{type === 'success' ? '✓' : '✗'}</strong>{' '}
        <span className="flash-message" title={message}>
          {truncateMessage(message, 50)}
        </span>
      </Alert>
    </div>
  );
};

export default Flash;
