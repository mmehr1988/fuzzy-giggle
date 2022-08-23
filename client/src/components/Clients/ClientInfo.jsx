// ======================================
// EXTERNAL
// ======================================
import ListGroup from 'react-bootstrap/ListGroup';
import { FaIdBadge, FaEnvelope, FaPhone } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================

const ListGroupItem = ({ children }) => {
  return (
    <ListGroup.Item
      as='li'
      action
      variant='light'
      className='d-flex justify-content-start align-items-center gap-3'
    >
      {children}
    </ListGroup.Item>
  );
};

const ClientInfo = ({ client }) => {
  const { firstName, lastName, email, phone } = client;

  return (
    <>
      <h5 className='mt-5 mb-0'>Client Information</h5>
      <ListGroup>
        <ListGroupItem>
          <FaIdBadge />
          {firstName} {lastName}
        </ListGroupItem>
        <ListGroupItem>
          <FaEnvelope />
          {email}
        </ListGroupItem>
        <ListGroupItem>
          <FaPhone />
          {phone}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default ClientInfo;
