// ======================================
// EXTERNAL
// ======================================
import { useState } from 'react';
import { useMutation } from '@apollo/client';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaUser } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================
import ModalForm from './ModalForm';
import { GET_CLIENTS, ADD_CLIENT } from '../../graphql';
import { AddClientForm } from '../Forms';
import { debounceCustom } from '../../lib';

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
  // HANDLE | FORM SUBMIT
  // =============================================

  const onSubmit = (values, onSubmitProps) => {
    // Add client to the database
    addClient({ variables: values });

    // Set Formik submit to false so it does not submit again.
    onSubmitProps.setSubmitting(false);

    // close the modal with a little delay
    debounceCustom(() => handleClose());
  };

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

      <ModalForm show={show} onHide={handleClose} modalTitle='Add Client'>
        <AddClientForm onSubmit={onSubmit} />
      </ModalForm>
    </>
  );
};

export default AddClientModal;
