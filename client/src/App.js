// ======================================
// EXTERNAL
// ======================================

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import { Header } from './components';
import { Home, Project, NotFound } from './pages';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/project/:id' element={<Project />} />
          {/* REDIRECT & PAGE NOT FOUND */}
          <Route path='/home' element={<Navigate to='/' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
