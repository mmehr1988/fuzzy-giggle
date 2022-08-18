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

const FormOption = ({ options, currentValue }) => {
  return options.map((option, i) =>
    option.id === 'default' ? (
      // if option is a default, hide it after selection.
      <option key={i} value={''} disabled hidden>
        {option.text}
      </option>
    ) : (
      <option key={i} value={option.id}>
        {option.text}
      </option>
    )
  );
};

const EditProjectForm = (props) => {
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
              as={item.as}
              rows={item.as === 'textarea' ? 4 : undefined}
            />
          ) : (
            <Form.Select
              aria-label={`'Select project ${
                item.label
                  ? item.label.toLowerCase()
                  : inverseCamelLodash(item.name).toLowerCase()
              }'`}
              name={camelLodash(item.name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[item.name]}
              as={item.as}
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
        <Button type='submit' variant='primary' size='md' disabled={isDisabled}>
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

EditProjectForm.propTypes = {
  formStructure: PropTypes.arrayOf(PropTypes.object),
  formik: PropTypes.object.isRequired,
};

export default EditProjectForm;
