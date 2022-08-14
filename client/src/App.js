// ======================================
// EXTERNAL
// ======================================
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// ======================================
// INTERNAL
// ======================================
import './scss/app.scss';
import Header from './components/Header/Header';
import Clients from './components/Clients/Clients';

// ======================================
// APOLLO CLIENT
// ======================================

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className='container'>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
};

export default App;
