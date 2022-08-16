// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import Header from './components/Header/Header';
import Clients from './components/Clients/Clients';
import AddClientModal from './components/Modal/AddClientModal';

const App = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <AddClientModal />
        <Clients />
      </div>
    </>
  );
};

export default App;
