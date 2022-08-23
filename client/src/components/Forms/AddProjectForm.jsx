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

const AddProjectForm = (props) => {
  const { clients, onSubmit } = props;

  const projectStatusOptions = [
    { key: 'Select project status', value: '' },
    { key: 'Not Started', value: 'new' },
    { key: 'In Progress', value: 'progress' },
    { key: 'Completed', value: 'completed' },
  ];

  const initialValues = {
    name: '',
    description: '',
    status: '',
    clientId: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    clientId: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // IMPORTANT: For Loading Saved Data: Decides whether form can change initial values after the form as been initialized once
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form
            noValidate
            className='app__forms border border-warning rounded-4 p-4'
            onSubmit={formik.handleSubmit}
          >
            {/* NAME */}
            <FormikControl
              control='input'
              label='Name'
              type='text'
              name='name'
            />

            {/* DESCRIPTION */}
            <FormikControl
              control='textarea'
              label='Description'
              name='description'
            />
            {/* PROJECT STATUS SELECT */}
            <FormikControl
              control='select'
              label='Status'
              name='status'
              options={projectStatusOptions}
            />
            <FormikControl
              control='select'
              label='Client'
              name='clientId'
              options={clients}
            />

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

export default AddProjectForm;
