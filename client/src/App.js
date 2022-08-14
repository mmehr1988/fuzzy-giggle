// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import Header from './components/Header/Header';
import Clients from './components/Clients/Clients';

const App = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Clients />
      </div>
    </>
  );
};

export default App;
