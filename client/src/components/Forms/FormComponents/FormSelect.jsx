// ======================================
// EXTERNAL
// ======================================
import { Field } from 'formik';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

// ======================================
// INTERNAL
// ======================================

import { FormLabel } from '../FormItems';
import FormError from './FormError';

const FormSelect = (props) => {
  const { label, name, options, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <Form.Group className='mb-3'>
            <FormLabel label={label} />
            <Form.Select
              aria-label={`Form ${label} select`}
              isInvalid={meta.touched && meta.error}
              {...rest}
              {...field}
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </Form.Select>
            <FormError name={name} />
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormSelect.propTypes = {
  // label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormSelect;
