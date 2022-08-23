// ======================================
// EXTERNAL
// ======================================
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// ======================================
// INTERNAL
// ======================================

import FormikControl from '../Formik/FormikControl';

const EditProjectForm = ({ project, clients, onSubmit }) => {
  // ======================================
  // STATE
  // ======================================
  const [name] = useState(project.name);
  const [description] = useState(project.description);
  const [clientId] = useState(project.client.id);
  const [status] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  // ======================================
  // INITIAL VALUES
  // ======================================

  const projectStatusOptions = [
    { key: 'Not Started', value: 'new' },
    { key: 'In Progress', value: 'progress' },
    { key: 'Completed', value: 'completed' },
  ];

  const initialValues = {
    name,
    description,
    status,
    clientId,
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
      validateOnChange={false}
      validateOnMount
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

            {/* CLIENT SELECT */}
            <FormikControl
              control='select'
              label='Client'
              name='clientId'
              options={clients}
            />

            {/* SUBMIT BUTTON */}
            <Button
              variant='primary'
              type='submit'
              disabled={
                !(
                  name ||
                  description ||
                  status ||
                  clientId ||
                  formik.isValid
                ) || formik.isSubmitting
              }
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProjectForm;
