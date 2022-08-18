// ======================================
// EXTERNAL
// ======================================
import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaUser } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================
import ModalForm from '../ModalForm';
import AddClientForm from './AddClientForm';
import { ADD_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';
import { debounceCustom } from '../../../lib/lodash';
import {
  ClientFormInitialValues,
  ClientFormSchema,
  ClientFormStructure,
} from './ClientFormStructure';

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
  // HANDLE FORM SUBMIT | FORMIK
  // =============================================

  const formik = useFormik({
    initialValues: ClientFormInitialValues,
    validationSchema: ClientFormSchema,
    onSubmit: (values) => {
      addClient({ variables: values });

      // Close the modal
      debounceCustom(() => handleHide());
    },
  });

  const handleHide = useCallback(() => {
    formik.handleReset();
    handleClose();
  }, [formik]);

  return (
    <>
      <Button variant='secondary' onClick={handleShow} className='mt-3'>
        <Stack
          className='justify-content-start align-items-center'
          direction='horizontal'
          gap={2}
        >
          <FaUser />
          <div>Add Client</div>
        </Stack>
      </Button>

      <ModalForm show={show} onHide={handleHide} modalTitle='Add Client'>
        <AddClientForm
          formStructure={ClientFormStructure}
          formik={formik}
          className='app__addClientForm'
          handleClose={handleClose}
        />
      </ModalForm>
    </>
  );
};

export default AddClientModal;
