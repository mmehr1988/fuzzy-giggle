// ======================================
// EXTERNAL
// ======================================

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

// ======================================
// LODASH
// ======================================
import {
  camelLodash,
  inverseCamelLodash,
  isEmptyLodash,
} from '../../../lib/lodash';

const AddClientForm = (props) => {
  const { formStructure, className, formik } = props;

  // if form has been touched & no errors then submit button is enabled, otherwise disabled.
  const isDisabled =
    !isEmptyLodash(formik.touched) && isEmptyLodash(formik.errors)
      ? false
      : true;

  return (
    <Form className={className} onSubmit={formik.handleSubmit} noValidate>
      {formStructure?.map(({ id, type, name, placeholder, ...item }) => (
        <Form.Group key={id} className='mb-3' controlId={id}>
          <Form.Label>{inverseCamelLodash(name)}</Form.Label>
          <Form.Control
            type={type}
            name={camelLodash(name)}
            placeholder={placeholder || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            {...item}
          />
          <Form.Text className='text-danger'>
            {formik.touched[name] && formik.errors[name] ? (
              <div className='text-danger'>{formik.errors[name]}</div>
            ) : null}
          </Form.Text>
        </Form.Group>
      ))}

      <Stack className='justify-content-end' direction='horizontal' gap={2}>
        <Button
          className={`${isDisabled ? 'disabled' : ''}`}
          type='submit'
          variant='primary'
          size='md'
          disabled={isDisabled}
        >
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

AddClientForm.propTypes = {
  formStructure: PropTypes.arrayOf(PropTypes.object),
  formik: PropTypes.object.isRequired,
};

export default AddClientForm;
