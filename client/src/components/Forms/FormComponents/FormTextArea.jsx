// ======================================
// EXTERNAL
// ======================================
import { Field } from 'formik';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

// ======================================
// INTERNAL
// ======================================

import FormLabel from '../FormItems/FormLabel';
import FormControl from '../FormItems/FormControl';
import FormError from './FormError';

const FormTextArea = (props) => {
  const { label, name, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <Form.Group className='mb-3' controlId={name}>
            <FormLabel label={label} />
            <FormControl
              as='textarea'
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

FormTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormTextArea;
