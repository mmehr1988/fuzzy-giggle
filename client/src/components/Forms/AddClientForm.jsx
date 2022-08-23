// ======================================
// EXTERNAL
// ======================================
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// ======================================
// INTERNAL
// ======================================

import FormikControl from '../Formik/FormikControl';

const AddClientForm = (props) => {
  const { onSubmit } = props;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    phone: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form
            noValidate
            className='app__forms border border-warning rounded-4 p-4'
            onSubmit={formik.handleSubmit}
          >
            {/* FIRST NAME */}
            <FormikControl
              control='input'
              label='First Name'
              type='text'
              name='firstName'
            />
            {/* FIRST NAME */}
            <FormikControl
              control='input'
              label='Last Name'
              type='text'
              name='lastName'
            />
            {/* EMAIL */}
            <FormikControl
              control='input'
              label='Email'
              type='email'
              name='email'
            />
            {/* PHONE */}
            <FormikControl
              control='input'
              label='Phone'
              type='text'
              name='phone'
            />

            {/* SUBMIT BUTTON */}
            <Button
              variant='primary'
              type='submit'
              // isValid = true when all fields are valid
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddClientForm;
