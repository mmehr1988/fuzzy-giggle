// ======================================
// EXTERNAL
// ======================================
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

// ======================================
// INTERNAL
// ======================================
import { GET_PROJECT } from '../queries/projectQueries';
import Loading from '../components/Loading/Loading';
import ClientInfo from '../components/Clients/ClientInfo/ClientInfo';

const Project = () => {
  // Using the useParams hook to get the id from the url
  const { id } = useParams();
  const navigate = useNavigate();

  // useQuery hook to get the project data from the server
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <Card className='mt-4'>
          <Card.Body>
            <Stack direction='vertical' gap={3}>
              {/* HEADER */}
              <Stack
                className='justify-content-between align-items-center flex-wrap'
                direction='horizontal'
                gap={2}
              >
                <Card.Text as='h1' className='mb-0'>
                  {data.project.name}
                </Card.Text>
                <Button onClick={() => navigate(-1)} variant='light'>
                  Go Back
                </Button>
              </Stack>

              {/* DESCRIPTION */}
              <Card.Text className='mb-0'>{data.project.description}</Card.Text>

              {/* STATUS */}
              <Stack
                className='align-items-center flex-wrap'
                direction='horizontal'
                gap={3}
              >
                <Card.Text as='h5' className='mb-0'>
                  Project Status
                </Card.Text>
                <Card.Text className='mb-0'>{data.project.status}</Card.Text>
              </Stack>
              <ClientInfo client={data.project.client} />
            </Stack>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Project;
