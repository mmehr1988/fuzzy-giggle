// ======================================
// EXTERNAL
// ======================================

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import PropTypes from 'prop-types';

// ======================================
// LODASH
// ======================================
const camelLodash = (text) => _.camelCase(text);

const inverseCamelLodash = (text) =>
  _.startCase(text.replace(/([A-Z])/g, ' $1'));

const AddClientForm = (props) => {
  const { formStructure, className, formik, handleClose } = props;

  const isDisabled =
    _.isEmpty(formik.touched) === false && _.isEmpty(formik.errors) === true
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
        <Button variant='secondary' size='md' onClick={handleClose}>
          Close
        </Button>
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
