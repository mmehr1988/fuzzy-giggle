// ======================================
// EXTERNAL
// ======================================
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// Icon
import { FaList } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================

import { GET_PROJECTS, GET_CLIENTS, ADD_PROJECT } from '../../graphql';

import ModalForm from './ModalForm';
import { AddProjectForm } from '../Forms';
import { debounceCustom } from '../../lib';
import { ToastAlert } from '../Toast';

const AddProjectModal = () => {
  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [clients, setClients] = useState(null);
  // ======================================
  // GRAPHQL
  // ======================================
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    // Update cache so you do not have to reload the page to see the new client.
    update(cache, { data: { addProject } }) {
      // Read the cache
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      // Write the cache
      cache.writeQuery({
        query: GET_PROJECTS,
        // Set the new data
        data: { projects: [...projects, addProject] },
      });
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      let clientArray = [{ key: 'Select Client', value: '' }];

      data.clients.forEach((element) => {
        clientArray.push({
          key: element.firstName + ' ' + element.lastName,
          value: element.id,
        });
      });

      setClients(clientArray);
    }
  }, [loading, error, data]);

  // ======================================
  // HANDLE | MODAL OPEN AND CLOSE
  // ======================================
  const handleClose = () => setShow(false);
  const handleShow = () =>
    data.clients.length > 0 ? setShow(true) : setShowToast(true);

  // =============================================
  // HANDLE | FORM SUBMIT
  // =============================================

  const onSubmit = (values, onSubmitProps) => {
    // Add project to the database
    addProject({ variables: values });

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
          <FaList />
          <div>New Project</div>
        </Stack>
      </Button>

      {/* Only show the model when the client data is loaded with no error and the form structure has been updated with the client options */}
      {!loading && !error && clients !== null && (
        <ModalForm show={show} onHide={handleClose} modalTitle='Add Project'>
          <AddProjectForm onSubmit={onSubmit} clients={clients} />
        </ModalForm>
      )}

      <ToastAlert
        onClose={() => setShowToast(false)}
        show={showToast}
        variant='danger'
        delay={2000}
      >
        Add client first before adding a project.
      </ToastAlert>
    </>
  );
};

export default AddProjectModal;
