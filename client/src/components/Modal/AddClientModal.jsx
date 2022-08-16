// ======================================
// EXTERNAL
// ======================================
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FaUser } from 'react-icons/fa';
// Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// lodash
import _ from 'lodash';

// ======================================
// INTERNAL
// ======================================
import AddClientForm from './AddClientForm';
import { ADD_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQueries';

// =============================================
// LODASH DEBOUNCE
// =============================================
const debounceCustom = _.debounce((callback) => {
  callback();
}, 300);

// =============================================
// INITIAL VALUES
// =============================================

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email('Invalid email address').required(),
  phone: yup.string().required(),
});

// IMPORTANT For both Reducer and Form Validation
const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

// ======================================
// FORM DATA
// ======================================
const formStructure = [
  {
    id: 'app__addClientForm-firstName',
    type: 'text',
    name: 'firstName',
    placeholder: 'John',
  },
  {
    id: 'app__addClientForm-lastName',
    type: 'text',
    name: 'lastName',
    placeholder: 'Doe',
  },
  {
    id: 'app__addClientForm-email',
    type: 'email',
    name: 'email',
    placeholder: 'email@example.com',
  },
  {
    id: 'app__addClientForm-phone',
    type: 'text',
    name: 'phone',
    placeholder: 'xxx-xxx-xxxx',
  },
];

const AddClientModal = () => {
  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);

  const [addClient] = useMutation(ADD_CLIENT, {
    // Update cache so you do not have to reload the page to see the new client.
    update(cache, { data: { addClient } }) {
      // Read the cache
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      // Write the cache
      cache.writeQuery({
        query: GET_CLIENTS,
        // Set the new data
        data: { clients: [...clients, addClient] },
      });
    },
  });

  // ======================================
  // HANDLE | MODAL OPEN AND CLOSE
  // ======================================
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // =============================================
  // HANDLE | CHANGE CALLBACK
  // =============================================

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: (values) => {
      addClient({ variables: values });

      debounceCustom(() => {
        formik.handleReset();
        handleClose();
      });
    },
  });

  return (
    <>
      <Button variant='secondary' onClick={handleShow} className='mt-3'>
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </Button>

      <Modal
        show={show}
        onHide={() => {
          formik.handleReset();
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddClientForm
            formStructure={formStructure}
            formik={formik}
            className='app__addClientForm'
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddClientModal;
