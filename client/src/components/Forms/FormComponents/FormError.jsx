import { connect, getIn } from 'formik';
import Form from 'react-bootstrap/Form';

// This component renders an error message if a field has
// an error and it's already been touched.
const FormError = (props) => {
  const { name, ...rest } = props;
  // All FormikProps available on props.formik!
  const error = getIn(props.formik.errors, name);
  const touch = getIn(props.formik.touched, name);

  return touch && error ? (
    <Form.Control.Feedback type='invalid' {...rest}>
      {error}
    </Form.Control.Feedback>
  ) : null;
};

export default connect(FormError);
