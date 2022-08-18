// ======================================
// EXTERNAL
// ======================================
import Stack from 'react-bootstrap/Stack';

// ======================================
// INTERNAL
// ======================================
import Clients from '../components/Clients/Clients';
import Projects from '../components/Projects/Projects';
import AddClientModal from '../components/Modal/AddClient/AddClientModal';
import AddProjectModal from '../components/Modal/AddProject/AddProjectModal';

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
