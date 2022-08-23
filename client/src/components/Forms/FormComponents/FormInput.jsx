// ======================================
// EXTERNAL
// ======================================
import { Field } from 'formik';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

// ======================================
// INTERNAL
// ======================================
import { FormLabel, FormControl } from '../FormItems';
import FormError from './FormError';

const FormInput = (props) => {
  const { label, type, name, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <Form.Group className='mb-3' controlId={name}>
            <FormLabel label={label} />
            <FormControl
              type={type}
              isInvalid={meta.touched && meta.error}
              {...field}
              {...rest}
            />
            <FormError name={name} />
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
};

export default FormInput;
