// ======================================
// EXTERNAL
// ======================================
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormLabel = (props) => {
  const { label, ...rest } = props;
  return <Form.Label {...rest}>{label}</Form.Label>;
};

FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormLabel;
