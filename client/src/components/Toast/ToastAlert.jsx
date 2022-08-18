import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

const ToastAlert = (props) => {
  const {
    onClose,
    show,
    delay,
    variant,
    textColor,
    textWeight,
    children,
    ...rest
  } = props;

  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={delay || 3000}
      bg={variant || 'warning'}
      className='position-fixed top-0 end-0 m-2'
      autohide
      {...rest}
    >
      <Toast.Body
        className={`${textColor || 'text-white'}  ${textWeight || 'fw-bold'}`}
      >
        {children}
      </Toast.Body>
    </Toast>
  );
};

ToastAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
};

export default ToastAlert;
