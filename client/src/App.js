// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import Header from './components/Header/Header';
import Clients from './components/Clients/Clients';
import Projects from './components/Projects/Projects';
import AddClientModal from './components/Modal/AddClientModal';

const App = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <AddClientModal />
        <Projects />
        <Clients />
      </div>
    </>
  );
};

export default App;
