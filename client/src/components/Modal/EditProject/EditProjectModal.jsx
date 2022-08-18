// ======================================
// EXTERNAL
// ======================================
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaExchangeAlt } from 'react-icons/fa';
import { isEqual, uniq } from 'lodash';

// ======================================
// INTERNAL
// ======================================
import ModalForm from '../ModalForm';
import EditProjectForm from './EditProjectForm';
import { UPDATE_PROJECT } from '../../../mutations/projectMutations';
import { GET_PROJECT } from '../../../queries/projectQueries';
import { GET_CLIENTS } from '../../../queries/clientQueries';

import { lodashFilterArray } from '../../../lib/lodash';
import {
  ProjectFormSchema,
  ProjectFormStructure,
  FormStatusOptionsArray,
} from '../AddProject/ProjectFormStructure';

const statusOptions = (current) => {
  const findStatus = FormStatusOptionsArray.find(
    (option) => option.text === current
  );

  return findStatus?.id;
};

const getUpdatedKeys = (oldData, newData) => {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
  const keys = [];
  for (const key of data) {
    if (!isEqual(oldData[key], newData[key])) {
      keys.push(key);
    }
  }

  return keys;
};

const EditProjectModal = (props) => {
  const { id: projectId, name, status, description, client } = props.project;

  const { id: formClientId } = client;

  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState([]);
  const [formStructure, setFormStructure] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({
    name: name,
    status: statusOptions(status),
    description: description,
    clientId: formClientId,
  });

  // ======================================
  // GRAPHQL
  // ======================================
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }],
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
    initialValues: formInitialValues,
    validationSchema: ProjectFormSchema,
    onSubmit: (values) => {
      setFormInitialValues(values);
      // Copy the values to the new object
      const formValues = values;

      // Check if Form has been updated
      const isFormUpdated = getUpdatedKeys(formValues, formInitialValues);

      if (isFormUpdated.length !== 0) {
        formValues.id = projectId;

        // Add the new updated project to the database
        updateProject({
          variables: formValues,
        });

        // Close the modal
        handleClose();
      } else {
        // If form was not updated, close modal
        handleClose();
      }
    },
  });

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

      {/* Only show the model when the client data is loaded with no error and the form structure has been updated with the client options */}
      {!loading && !error && formStructure.length !== 0 && (
        <ModalForm show={show} onHide={handleClose} modalTitle='Update Project'>
          <EditProjectForm
            formStructure={formStructure}
            formik={formik}
            className='app__updateProjectForm'
            handleClose={handleClose}
          />
        </ModalForm>
      )}
    </>
  );
};

export default EditProjectModal;
