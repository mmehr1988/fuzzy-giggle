// ======================================
// EXTERNAL
// ======================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaTrash } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================

import { GET_PROJECTS, DELETE_PROJECT } from '../../graphql';

const DeleteProjectButton = (props) => {
  const { projectId } = props;

  // ======================================
  // STATE
  // ======================================
  const [show, setShow] = useState(false);

  // ======================================
  // FOR REDIRECT TO HOME
  // ======================================
  const navigate = useNavigate();

  // ======================================
  // GRAPHQL
  // ======================================

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    // refetchQueries queries since the page is already being refreshed with page transition.
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  // ======================================
  // HANDLERS
  // ======================================

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='danger' onClick={handleShow}>
        <FaTrash />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Please confirm you want to delete project?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={deleteProject}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProjectButton;
