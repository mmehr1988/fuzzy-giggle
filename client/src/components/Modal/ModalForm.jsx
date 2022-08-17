import Modal from 'react-bootstrap/Modal';

const ModalForm = (props) => {
  const { show, onHide, modalTitle, children } = props;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalForm;
