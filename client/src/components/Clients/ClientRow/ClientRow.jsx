// ======================================
// EXTERNAL
// ======================================
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';

// ======================================
// INTERNAL
// ======================================
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';

const ClientRow = ({ client }) => {
  const { id, name, email, phone } = client;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td className='align-middle'>{name}</td>
      <td className='align-middle'>{email}</td>
      <td className='align-middle'>{phone}</td>
      <td className='d-flex align-middle justify-content-center '>
        <Button variant='danger' size='sm' onClick={deleteClient}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

export default ClientRow;
