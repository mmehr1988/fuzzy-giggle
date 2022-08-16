// ======================================
// EXTERNAL
// ======================================
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      className='justify-content-center align-items-center mt-5'
      direction='vertical'
      gap={3}
    >
      <FaExclamationTriangle className='text-danger' size={100} />
      <h1>404</h1>
      <p className='lead'>Sorry, this page does not exist</p>

      <Stack className='justify-content-center' direction='horizontal' gap={2}>
        <Button href='/' variant='primary'>
          Home Page
        </Button>
        <Button onClick={() => navigate(-1)} variant='secondary'>
          Prev Page
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotFound;
