// ======================================
// EXTERNAL
// ======================================
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormControl = (props) => {
  const { name, ...rest } = props;
  return <Form.Control name={name} {...rest} />;
};

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormControl;
