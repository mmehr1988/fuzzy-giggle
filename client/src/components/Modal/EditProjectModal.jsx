// ======================================
// EXTERNAL
// ======================================
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaExchangeAlt } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================
import { GET_PROJECT, GET_CLIENTS, UPDATE_PROJECT } from '../../graphql';
import ModalForm from './ModalForm';
import { EditProjectForm } from '../Forms';
import { debounceCustom } from '../../lib';

const EditProjectModal = ({ project }) => {
  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState(null);

  // ======================================
  // GRAPHQL
  // ======================================
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  useEffect(() => {
    if (!loading && !error) {
      let clientArray = [];

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
  const handleShow = () => setShow(true);

  // =============================================
  // HANDLE FORM SUBMIT | FORMIK
  // =============================================

  const onSubmit = (values, onSubmitProps) => {
    // update project in database
    updateProject({
      variables: {
        id: project.id,
        ...values,
      },
    });

    // Set Formik submit to false so it does not submit again.
    onSubmitProps.setSubmitting(false);

    // close the modal with a little delay
    debounceCustom(() => handleClose());
  };

  return (
    <>
      <Button variant='secondary' onClick={handleShow}>
        <Stack
          className='justify-content-start align-items-center'
          direction='horizontal'
          gap={2}
        >
          <FaExchangeAlt />
          <div>Update</div>
        </Stack>
      </Button>

      {!loading && !error && clients !== null && (
        <ModalForm show={show} onHide={handleClose} modalTitle='Update Project'>
          <EditProjectForm
            project={project}
            clients={clients}
            onSubmit={onSubmit}
          />
        </ModalForm>
      )}
    </>
  );
};

export default EditProjectModal;
