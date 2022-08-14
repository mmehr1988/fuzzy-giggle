import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  );
};

export default Loading;
