// ======================================
// EXTERNAL
// ======================================

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

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
