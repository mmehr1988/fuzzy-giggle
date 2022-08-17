// ======================================
// EXTERNAL
// ======================================
import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';

import { FaList } from 'react-icons/fa';
// Bootstrap
import Button from 'react-bootstrap/Button';

// ======================================
// INTERNAL
// ======================================
import ModalForm from '../ModalForm';
import AddProjectForm from './AddProjectForm';
import { ADD_PROJECT } from '../../../mutations/projectMutations';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import { GET_CLIENTS } from '../../../queries/clientQueries';

import { debounceCustom, lodashFilterArray } from '../../../lib/lodash';
import {
  ProjectFormInitialValues,
  ProjectFormSchema,
  ProjectFormStructure,
} from './ProjectFormStructure';

const AddProjectModal = () => {
  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState([]);
  const [formStructure, setFormStructure] = useState([]);

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

  // ======================================
  // HANDLE | MODAL OPEN AND CLOSE
  // ======================================
  const handleClose = () => setShow(false);
  const handleShow = () =>
    data.clients.length > 0
      ? setShow(true)
      : alert('You must add a client first');

  // =============================================
  // HANDLE FORM SUBMIT | FORMIK
  // =============================================

  const formik = useFormik({
    initialValues: ProjectFormInitialValues,
    validationSchema: ProjectFormSchema,
    onSubmit: (values) => {
      // Copy the values to the new object
      const formValues = values;

      // Find the client id of the selected client name from state
      const findClientId = clients.find(
        (client) => client.text === formValues.clientId
      );

      // update formValues with client id
      formValues.clientId = findClientId.id;

      // Add the new project to the database
      addProject({ variables: formValues });

      // Close the modal
      debounceCustom(() => handleHide());
    },
  });

  const handleHide = useCallback(() => {
    formik.handleReset();
    handleClose();
  }, [formik]);

  // =============================================
  // USEFFECT
  // =============================================

  // [1] - SET CLIENTS STATE
  useEffect(() => {
    // Check if data is loaded
    if (data && data.clients.length > 0) {
      // When data is loaded, using lodash to filter the data for the specific fields we want.
      const clients = lodashFilterArray(data.clients, [
        'id',
        'firstName',
        'lastName',
      ]);
      // Set the clients to the state
      setClients(clients);
    }
  }, [data]);

  // [2] - UPDATE FORM STRUCTURE
  useEffect(() => {
    // Check if client state is updated
    if (clients.length > 0) {
      // Copy the structure array
      const structureArray = ProjectFormStructure;

      // Add the new client array to the structure array
      structureArray.map((field) =>
        field.name === 'clientId' ? field.options.push(...clients) : field
      );

      // setStructure Array to the new structure array
      setFormStructure(structureArray);
    }
  }, [clients]);

  return (
    <>
      <Button variant='secondary' onClick={handleShow} className='mt-3'>
        <div className='d-flex align-items-center'>
          {/* <FaUser className='icon' /> */}
          <div>Add Project</div>
        </div>
      </Button>

      {/* Only show the model when the client data is loaded with no error and the form structure has been updated with the client options */}
      {!loading && !error && formStructure.length !== 0 && (
        <ModalForm show={show} onHide={handleHide} modalTitle='Add Project'>
          <AddProjectForm
            formStructure={formStructure}
            formik={formik}
            className='app__addProjectForm'
            handleClose={handleClose}
          />
        </ModalForm>
      )}
    </>
  );
};

export default AddProjectModal;
