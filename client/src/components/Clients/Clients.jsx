// ======================================
// EXTERNAL
// ======================================
import { useQuery } from '@apollo/client';
import Table from 'react-bootstrap/Table';

// ======================================
// INTERNAL
// ======================================
import { GET_CLIENTS } from '../../queries/clientQueries';
import Loading from '../Loading/Loading';
import ClientRow from './ClientRow/ClientRow';

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Loading />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <Table striped bordered hover size='sm' className='mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Clients;
