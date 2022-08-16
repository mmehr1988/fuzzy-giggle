// ======================================
// EXTERNAL
// ======================================
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

// ======================================
// INTERNAL
// ======================================
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';

const ClientRow = ({ client }) => {
  const { id, firstName, lastName, email, phone } = client;

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
      <td className='align-middle'>
        <span>{firstName}</span>
      </td>
      <td className='align-middle'>
        <span>{lastName}</span>
      </td>
      <td className='align-middle'>
        <span>{email}</span>
      </td>
      <td className='align-middle'>
        <span>{phone}</span>
      </td>
      <td className='align-middle app__formColumns delete'>
        <Button variant='danger' size='sm' onClick={deleteClient}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

ClientRow.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientRow;
