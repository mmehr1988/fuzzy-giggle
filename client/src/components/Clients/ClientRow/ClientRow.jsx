// ======================================
// EXTERNAL
// ======================================
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

// ======================================
// INTERNAL
// ======================================
import { DELETE_CLIENT } from '../../../mutations/clientMutations';
import { GET_CLIENTS } from '../../../queries/clientQueries';
import { GET_PROJECTS } from '../../../queries/projectQueries';
import DeleteClientButton from '../../Button/DeleteClientButton';

const ClientRow = ({ client }) => {
  const { id, firstName, lastName, email, phone } = client;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    // Refetch so you dont have to write two update caches
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
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
        <DeleteClientButton onClick={deleteClient} />
      </td>
    </tr>
  );
};

ClientRow.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientRow;
