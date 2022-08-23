// ======================================
// EXTERNAL
// ======================================
import Stack from 'react-bootstrap/Stack';

// ======================================
// INTERNAL
// ======================================
import {
  Clients,
  Projects,
  AddClientModal,
  AddProjectModal,
} from '../components';

const Home = () => {
  return (
    <>
      <Stack className='justify-content-start' direction='horizontal' gap={2}>
        <AddClientModal />
        <AddProjectModal />
      </Stack>
      <hr />
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
