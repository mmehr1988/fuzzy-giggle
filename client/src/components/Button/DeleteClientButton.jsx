// ======================================
// EXTERNAL
// ======================================
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';

const DeleteClientButton = (props) => {
  const { onClick } = props;
  return (
    <Button variant='danger' size='sm' onClick={onClick}>
      <FaTrash />
    </Button>
  );
};

export default DeleteClientButton;
