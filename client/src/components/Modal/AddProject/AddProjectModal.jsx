// ======================================
// EXTERNAL
// ======================================
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FaList } from 'react-icons/fa';
// Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// lodash
import _ from 'lodash';

// ======================================
// INTERNAL
// ======================================

import AddProjectForm from './AddProjectForm';
import { ADD_PROJECT } from '../../../mutations/projectMutations';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import { GET_CLIENTS } from '../../../queries/clientQueries';

// =============================================
// LODASH DEBOUNCE
// =============================================
const debounceCustom = _.debounce((callback) => {
  callback();
}, 300);

const lodashPick = (array, keys) => _.pick(array, keys);

const lodashMergeFilterArray = (array, keys) => {
  let newArray = [];

  array.forEach((item) => {
    const newObj = lodashPick(item, keys);

    newArray.push({
      id: newObj.id,
      text: `${newObj.firstName} ${newObj.lastName}`,
    });
  });

  return newArray;
};

// =============================================
// INITIAL VALUES
// =============================================

const schema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  status: yup.string(),
  description: yup.string(),
  clientId: yup.string().required('Client is required'),
});

// IMPORTANT For both Reducer and Form Validation
// Setting default value for status
const initialFormValues = {
  name: '',
  status: 'new',
  description: '',
  clientId: '',
};

// ======================================
// FORM DATA
// ======================================
const formStructure = [
  {
    id: 'app__addProjectForm-name',
    type: 'text',
    name: 'name',
    as: 'input',
  },
  {
    id: 'app__addProjectForm-description',
    type: 'text',
    name: 'description',
    as: 'input',
  },
  {
    id: 'app__addProjectForm-status',
    name: 'status',
    as: 'select',
    options: [
      { value: 'new', text: 'Not Started' },
      { value: 'progress', text: 'In Progress' },
      { value: 'completed', text: 'Completed' },
    ],
  },
  {
    id: 'app__addProjectForm-client',
    label: 'Client',
    name: 'clientId',
    as: 'select',
    options: [{ text: 'Please select a client' }],
  },
];

const AddProjectModal = () => {
  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);
  const [clients, setClients] = useState([]);
  const [structure, setStructure] = useState([]);

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
  // FORMIK
  // =============================================

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
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
      debounceCustom(() => {
        formik.handleReset();
        handleClose();
      });
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
      const clients = lodashMergeFilterArray(data.clients, [
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
      const structureArray = formStructure;

      //  Add the new client array to the structure array
      structureArray.map((field) =>
        field.name === 'clientId' ? field.options.push(...clients) : field
      );

      //  setStructure Array to the new structure array
      setStructure(structureArray);
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
      {!loading && !error && structure.length !== 0 && (
        <Modal
          show={show}
          onHide={() => {
            formik.handleReset();
            handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProjectForm
              formStructure={formStructure}
              formik={formik}
              className='app__addProjectForm'
              handleClose={handleClose}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddProjectModal;
