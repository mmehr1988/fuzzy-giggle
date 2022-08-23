// ======================================
// EXTERNAL
// ======================================
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';

// ======================================
// INTERNAL
// ======================================
import { logo } from '../assets';

const Header = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          <Stack direction='horizontal' gap={0}>
            <img src={logo} alt='logo' />
            <div>ProjectMgmt</div>
          </Stack>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
