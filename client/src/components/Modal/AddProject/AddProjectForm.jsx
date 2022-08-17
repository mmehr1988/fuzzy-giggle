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

// ======================================
// FORM OPTION
// ======================================

const FormOption = ({ options }) => {
  return options.map((option, i) => {
    return option.value === '' ? (
      <option key={i}>{option.text}</option>
    ) : (
      <option key={i} value={option.value}>
        {option.text}
      </option>
    );
  });
};

const AddProjectForm = (props) => {
  const { formStructure, className, formik } = props;

  // if form has been touched & no errors then submit button is enabled, otherwise disabled.
  const isDisabled =
    !isEmptyLodash(formik.touched) && isEmptyLodash(formik.errors)
      ? false
      : true;

  return (
    <Form className={className} onSubmit={formik.handleSubmit} noValidate>
      {formStructure?.map((item) => (
        <Form.Group key={item.id} className='mb-3' controlId={item.id}>
          <Form.Label>
            {item.label ? item.label : inverseCamelLodash(item.name)}
          </Form.Label>
          {item.as !== 'select' ? (
            <Form.Control
              type={item.type}
              name={camelLodash(item.name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[item.name]}
            />
          ) : (
            <Form.Select
              aria-label='Select project status'
              name={camelLodash(item.name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[item.name]}
            >
              <FormOption options={item.options} />
            </Form.Select>
          )}

          <Form.Text className='text-danger'>
            {formik.touched[item.name] && formik.errors[item.name] ? (
              <div className='text-danger'>{formik.errors[item.name]}</div>
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

AddProjectForm.propTypes = {
  formStructure: PropTypes.arrayOf(PropTypes.object),
  formik: PropTypes.object.isRequired,
};

export default AddProjectForm;
